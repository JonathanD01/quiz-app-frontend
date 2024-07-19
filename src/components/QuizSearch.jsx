import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { getQuizzes } from "@/services/QuizService";
import { useContext, useState } from "react";
import { PageContext } from "./MyPage";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const QuizSearch = () => {
  const { token } = useContext(AuthContext);
  const { loadingStates, setLoadingState, setPageObject, setQuizzes, page } =
    useContext(PageContext);
  const [searchValue, setSearchValue] = useState("");
  const { showErrorToast } = useToastHandler();

  // TODO IF THEY ONLY USE BACKSPACE AND IT IS EMPTY AND SEARCH ALREADY PRESENT IT WONT REFETCH

  async function fetchQuizzes(resetSearchTitle = false) {
    setLoadingState("isQuizLoading", true);

    try {
      const response = await getQuizzes(
        token,
        page,
        resetSearchTitle ? null : searchValue
      );
      if (response.status === 204) {
        setQuizzes(null);
      } else if (response.status === 200) {
        setQuizzes(response.data.result.content);
        setPageObject(response.data.result.page);
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoadingState("isQuizLoading", false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (loadingStates["isQuizLoading"]) {
      return;
    }

    fetchQuizzes();
  }

  return (
    <div className="grid lg:grid-cols-3 gap-5 mb-5">
      <div className="col-span-2">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:flex-row justify-between col-span-2 lg:col-span-1 gap-5"
        >
          <Input
            id={"search-value"}
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={"Søk etter en quiz..."}
          />

          <Button
            type="submit"
            className="w-full lg:w-1/4 bg-indigo-600 hover:bg-indigo-800"
          >
            Søk
          </Button>
        </form>
      </div>
    </div>
  );
};

export default QuizSearch;
