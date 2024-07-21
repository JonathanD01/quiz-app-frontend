import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { Client } from "@stomp/stompjs";
import { useContext, useEffect, useRef, useState } from "react";
import { PageContext } from "./MyPage";
import PaginationComponent from "./PaginationComponent";
import QuizSearch from "./QuizSearch";
import { Skeleton } from "./ui/skeleton";
import UserNoQuestsDisplay from "./UserNoQuizDisplay";
import UserQuizCardDisplay from "./UserQuizCardDisplay";

const UserQuizzesCard = () => {
  const { token } = useContext(AuthContext);
  const [quizzesToBeCreated, setQuizzesToBeCreated] = useState([]);
  const { quizzes, setQuizzes, loadingStates, pageObject, setPage } =
    useContext(PageContext);
  const { showCustomErrorToast } = useToastHandler();
  const wsClientRef = useRef(null);

  const WEBSOCKET_URL =
    process.env.NODE_ENV === "production"
      ? window.location.protocol.includes("https")
        ? "wss://" +
          window.location.origin.replaceAll("https://", "") +
          "/quiz-websocket"
        : "ws://localhost:80/quiz-websocket"
      : "ws://localhost:8080/quiz-websocket";

  function popLoadingQuizSkeleton() {
    const newQuestsToBeCreated = quizzesToBeCreated.filter(
      (quizToBeCreated) => quizzesToBeCreated.indexOf(quizToBeCreated) === 0
    );
    setQuizzesToBeCreated(newQuestsToBeCreated);
  }

  function replaceQuizObjectWithNew(newQuiz) {
    setQuizzes((prevQuizzes) => {
      const index = prevQuizzes.findIndex((quiz) => quiz.id === newQuiz.id);

      if (index !== -1) {
        return [
          ...prevQuizzes.slice(0, index),
          newQuiz,
          ...prevQuizzes.slice(index + 1),
        ];
      } else {
        return [...prevQuizzes, newQuiz];
      }
    });
  }

  useEffect(() => {
    setUpClient();

    return () => {
      if (wsClientRef.current) {
        wsClientRef.current.deactivate();
        wsClientRef.current = null;
      }
    };
  }, []);

  async function setUpClient() {
    if (!wsClientRef.current) {
      const wsClient = new Client({
        brokerURL: WEBSOCKET_URL,
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      wsClient.onConnect = function (frame) {
        wsClient.subscribe("/user/topic/quiz", (message) => {
          const response = JSON.parse(message.body);
          if (typeof response === "number") {
            setQuizzesToBeCreated((prevValues) => [...prevValues, response]);
          } else if (typeof response === "object" && response.id) {
            popLoadingQuizSkeleton();
            replaceQuizObjectWithNew(response);
          } else if (typeof response == "object" && response.message) {
            if (response.type === "error") {
              showCustomErrorToast(response.type, response.message);
            }
          }
        });
      };

      wsClient.activate();
      wsClientRef.current = wsClient;
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-4xl text-gray-900 tracking-tight font-bold">
          Mine quizzer
        </h1>
        {loadingStates["isQuizLoading"] ? (
          <p className="mt-1 text-gray-500">...</p>
        ) : (
          <p className="mt-1 text-gray-500">
            {pageObject
              ? `Side ${pageObject?.number + 1} av ${pageObject?.totalPages}`
              : "..."}
          </p>
        )}
      </div>
      <QuizSearch />
      {loadingStates["isQuizLoading"] && (
        <div className="flex flex-row gap-5">
          {[0, 1, 2].map((number) => (
            <Skeleton key={number} className="h-[170px] flex-1 rounded-2xl" />
          ))}
        </div>
      )}
      {!loadingStates["isQuizLoading"] && quizzes && (
        <div className="flex flex-col gap-5">
          {quizzes && (
            <div className="grid lg:grid-cols-3 gap-5">
              {quizzesToBeCreated?.length >= 1 &&
                quizzesToBeCreated.map((pendingQuest) => (
                  <a key={pendingQuest} href={`/quiz/${pendingQuest}/rediger`}>
                    <Skeleton className="h-[170px] rounded-2xl" />
                  </a>
                ))}
              <UserQuizCardDisplay quizzes={quizzes} />
            </div>
          )}
        </div>
      )}
      {!loadingStates["isQuizLoading"] && <UserNoQuestsDisplay />}
      <PaginationComponent pageObject={pageObject} setPage={setPage} />
    </div>
  );
};

export default UserQuizzesCard;
