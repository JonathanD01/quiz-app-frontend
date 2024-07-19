import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { getQuizAttempts } from "@/services/QuizAttemptService";
import { LucideArrowRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import PaginationComponent from "./PaginationComponent";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";

const MyAttemptsPage = () => {
  const [isLoading, setLoading] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState(null);
  const [pageObject, setPageObject] = useState(null);
  const [page, setPage] = useState(0);
  const { token, user } = useContext(AuthContext);
  const { showErrorToast } = useToastHandler();

  async function fetchQuizAttempts_(title = null) {
    setLoading(true);
    try {
      const response = await getQuizAttempts(token, page, 9, title);

      if (response.status === 200 && response.data.response === "SUCCESS") {
        setQuizAttempts(response.data.result.content);
        setPageObject(response.data.result.page);
      }

      if (response.status === 200 && response.data.response === "SUCCESS") {
        setQuizAttempts(response.data.result.content);
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isLoading) {
      return;
    }

    const title = document.getElementById("title").value;

    fetchQuizAttempts_(title);
  }

  useEffect(() => {
    async function fetchQuizAttempts() {
      await fetchQuizAttempts_();
    }

    fetchQuizAttempts();
  }, [page]);

  return (
    <div className="max-w-[95%] md:max-w-[90%] 2xl:max-w-[80%] mt-5 mx-auto">
      <div className="flex flex-col gap-y-4">
        <h1 className="font-bold text-xl md:text-4xl leading-8">
          Nylige forsøk
        </h1>
        {isLoading ? (
          <p className="mt-1 text-gray-500">...</p>
        ) : (
          <p className="mt-1 text-gray-500">
            {pageObject
              ? `Side ${pageObject?.number + 1} av ${pageObject?.totalPages}`
              : "..."}
          </p>
        )}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10">
          <Input
            id="title"
            className="lg:col-span-2"
            placeholder="Skriv inn en quiz tittel"
            type="text"
          />
          <Button className="w-1/3" type="submit">
            Send
          </Button>
        </form>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 9 }).map((element) => (
              <Skeleton key={element} className="h-[155px] rounded-xl" />
            ))}
          {!quizAttempts && !isLoading && (
            <p className="text-gray-600">
              Du har ingen forsøk. Start med å spille en quiz
            </p>
          )}
          {quizAttempts &&
            !isLoading &&
            quizAttempts.map((quizAttempt) => (
              <a key={quizAttempt.id} href={`/quiz/forsok/${quizAttempt.link}`}>
                <div className="flex items-center bg-stone-100 hover:bg-stone-200 rounded-xl px-3 py-5 min-h-full">
                  <div className="flex flex-col">
                    <span className="font-semibold max-lines-for-quiz max-lines-style-quiz-title">
                      {quizAttempt.title}
                    </span>
                    <span className="text-sm max-lines-for-quiz max-lines-for-quiz max-lines-quiz-description">
                      {quizAttempt.description}
                    </span>
                  </div>
                  <div>
                    <LucideArrowRight />
                  </div>
                </div>
              </a>
            ))}
        </div>
        <PaginationComponent pageObject={pageObject} setPage={setPage} />
      </div>
    </div>
  );
};

export default MyAttemptsPage;
