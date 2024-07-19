import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { getQuizAttempts } from "@/services/QuizAttemptService";
import { getQuizzes } from "@/services/QuizService";
import { createContext, useContext, useEffect, useState } from "react";
import ActionCards from "./ActionCards";
import GetStartedTips from "./GetStartedTips";
import UserProfile from "./UserProfile";
import UserQuizAttempts from "./UserQuizAttempts";
import UserQuizzesCard from "./UserQuizzesCard";

export const PageContext = createContext(null);

const MyPage = () => {
  const [loadingStates, setLoadingStates] = useState({
    isQuizLoading: false,
    isAttemptsLoading: false,
  });
  const [quizzes, setQuizzes] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState(null);
  const { token } = useContext(AuthContext);
  const { showErrorToast } = useToastHandler();
  const [pageObject, setPageObject] = useState(null);
  const [page, setPage] = useState(0);
  const [initialFetchDone, setInitialFetchDone] = useState(false);

  function setLoadingState(loadingStateName, isLoading) {
    setLoadingStates((prevState) => ({
      ...prevState,
      [loadingStateName]: isLoading,
    }));
  }

  useEffect(() => {
    let ignore = false;
    setLoadingState("isQuizLoading", true);
    setLoadingState("isAttemptsLoading", true);

    async function fetchInitialData() {
      try {
        const [quizzesResponse, attemptsResponse] = await Promise.all([
          getQuizzes(token, page),
          getQuizAttempts(token, 0, 6),
        ]);

        if (
          quizzesResponse.status === 200 &&
          quizzesResponse.data.response === "SUCCESS"
        ) {
          setQuizzes(quizzesResponse.data.result.content);
          setPageObject(quizzesResponse.data.result.page);
        }

        if (
          attemptsResponse.status === 200 &&
          attemptsResponse.data.response === "SUCCESS"
        ) {
          setQuizAttempts(attemptsResponse.data.result.content);
        }
      } catch (error) {
        showErrorToast(error);
      } finally {
        if (!ignore) {
          setLoadingState("isQuizLoading", false);
          setLoadingState("isAttemptsLoading", false);
          setInitialFetchDone(true);
        }
      }
    }

    fetchInitialData();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (!initialFetchDone) return;

    let ignore = false;
    setLoadingState("isQuizLoading", true);

    async function fetchQuizzesByPage() {
      try {
        const quizzesResponse = await getQuizzes(token, page);

        if (
          quizzesResponse.status === 200 &&
          quizzesResponse.data.response === "SUCCESS"
        ) {
          setQuizzes(quizzesResponse.data.result.content);
          setPageObject(quizzesResponse.data.result.page);
        }
      } catch (error) {
        showErrorToast(error);
      } finally {
        if (!ignore) {
          setLoadingState("isQuizLoading", false);
        }
      }
    }

    fetchQuizzesByPage();

    return () => {
      ignore = true;
    };
  }, [page]);

  return (
    <PageContext.Provider
      value={{
        quizzes,
        setQuizzes,
        quizAttempts,
        loadingStates,
        setLoadingState,
        pageObject,
        setPageObject,
        setPage,
      }}
    >
      <div className="max-w-[95%] md:max-w-[90%] 2xl:max-w-[80%] mt-10 mx-auto">
        <div className="flex flex-col gap-8 xl:flex-row 2xl:gap-12">
          <div className="flex flex-col gap-16 w-full">
            <ActionCards />
            <UserProfile />
            <UserQuizzesCard />
          </div>
          <div className="flex flex-col gap-10 w-full xl:max-w-[450px]">
            <GetStartedTips />
            <UserQuizAttempts />
          </div>
        </div>
      </div>
    </PageContext.Provider>
  );
};

export default MyPage;
