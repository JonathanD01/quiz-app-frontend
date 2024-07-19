import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { getQuizById } from "@/services/QuizService";
import { Client } from "@stomp/stompjs";
import {
  LucideCheck,
  LucidePlay,
  LucidePlus,
  LucideSettings,
  LucideTrash2,
  LucideX,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import QuizAddQuestionDialog from "./QuizAddQuestionDialog";
import QuizCopySharedUrlDialog from "./QuizCopySharedUrlDialog";
import QuizCreateAnswerOptionDialog from "./QuizCreateAnswerOptionDialog";
import QuizDeleteAnswerOptionDialog from "./QuizDeleteAnswerOptionDialog";
import QuizDeleteDialog from "./QuizDeleteDialog";
import QuizDeleteQuestionDialog from "./QuizDeleteQuestionDialog";
import QuizEditAnswerOptionDialog from "./QuizEditAnswerOptionDialog";
import QuizEditQuestionDialog from "./QuizEditQuestionDialog";
import QuizEditTitleDescriptionDialog from "./QuizEditTitleDescriptionDialog";
import QuizEditSkeleton from "./skeletons/QuizEditSkeleton";
import { Spinner } from "./ui/spinner";

const QuizEditPage = () => {
  const { quizId } = useParams();
  const { token } = useContext(AuthContext);
  const { showErrorToast, showCustomErrorToast } = useToastHandler();
  const [isLoading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(null);
  const [currentQuizAnswer, setCurrentQuizAnswer] = useState(null);
  const [dialogStates, setDialogStates] = useState({
    isQuizEditTitleDescriptionDialogOpen: false,
    isQuizAddQuestionDialogOpen: false,
    isQuizDeleteDialogOpen: false,
    isDeleteQuizQuestionDialogOpen: false,
    isEditQuizQuestionDialogOpen: false,
    isEditQuizAnswerDialogOpen: false,
    isDeleteQuizAnswerDialogOpen: false,
    isCreateQuizAnswerDialogOpen: false,
  });
  const wsClientRef = useRef(null);

  const WEBSOCKET_URL =
    process.env.NODE_ENV === "production"
      ? "ws://localhost:80/quiz-websocket"
      : "ws://localhost:8080/quiz-websocket";

  const setDialogState = (dialogName, isOpen) => {
    setDialogStates((prevState) => ({
      ...prevState,
      [dialogName]: isOpen,
    }));
  };

  function showDialog(dialogName, quizQuestion = null, quizAnswer = null) {
    setCurrentQuizQuestion(quizQuestion);
    setCurrentQuizAnswer(quizAnswer);
    setDialogState(dialogName, true);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("no-nb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  function totalQuizAnswerOptions(quiz) {
    return quiz.questions.reduce((total, question) => {
      return total + question.quizAnswerOptions.length;
    }, 0);
  }

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    async function fetchQuizById() {
      try {
        const response = await getQuizById(token, quizId);
        setQuiz(response.data.result);
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizById();
    setUpClient();

    return () => {
      ignore = true;
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
          if (typeof response === "object" && response.id) {
            // Lazyyy
            window.location.reload();
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
    <>
      {isLoading && <QuizEditSkeleton />}
      {!isLoading && quiz && (
        <>
          <div className="flex flex-col xl:flex-row gap-12 mx-auto mt-10 max-w-[95%] lg:max-w-[90%] text-[20px]">
            <div className="xl:w-[400px]">
              <a href="/min-side" className="text-slate-500">
                &larr; Tilbake
              </a>
              <div className="mt-3 flex flex-col gap-3 bg-white p-5 rounded-xl shadow border">
                <div className="flex flex-row justify-between">
                  <p>Oprettet</p>
                  <p className="font-bold">{formatDate(quiz.createdAt)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Laget av</p>
                  <p className="font-bold">{quiz.creator.firstname}</p>
                </div>
                <div className="flex justify-between">
                  <p>Antall spørsmål</p>
                  <p className="font-bold">{quiz.questions.length}</p>
                </div>
                <div className="flex justify-between">
                  <p>Antall svar</p>
                  <p className="font-bold">{totalQuizAnswerOptions(quiz)}</p>
                </div>
              </div>
              <Button
                onClick={() =>
                  showDialog("isQuizEditTitleDescriptionDialogOpen")
                }
                className="flex w-full my-3 justify-center items-center gap-1 rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-600"
              >
                <LucideSettings />
                Rediger
              </Button>
              <Button
                onClick={() => showDialog("isQuizAddQuestionDialogOpen")}
                className="flex w-full my-3 justify-center items-center gap-1 rounded-md bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-emerald-600"
              >
                <LucidePlus /> Legg til spørsmål
              </Button>
              <Button
                onClick={() => showDialog("isQuizDeleteDialogOpen")}
                className="flex w-full my-3 justify-center items-center gap-1 rounded-md bg-red-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600"
              >
                <LucideTrash2 /> Slett
              </Button>

              {quiz.shared && <QuizCopySharedUrlDialog quizLink={quiz.link} />}
              {quiz.status === "COMPLETED" && (
                <a href={`/quiz/${quiz.link}/spill`} title="Spill quiz">
                  <Button className="mt-3 w-full" variant="outline">
                    <LucidePlay className="mr-1" />
                    Spill
                  </Button>
                </a>
              )}
            </div>
            {quiz.status === "COMPLETED" && (
              <div className="flex-1">
                <div>
                  <h1 className="text-3xl font-bold text-center lg:text-left">
                    {quiz.title}
                  </h1>
                  <p className="mt-3 lg:max-w-[95%] text-center mx-auto lg:mx-0 lg:text-left">
                    {quiz.description}
                  </p>

                  <div className="flex flex-col gap-5 mt-10 lg:mt-5">
                    {quiz.questions.map((quizQuestion, questionIndex) => (
                      <div
                        id={`edit-quiz-question-` + quizQuestion.id}
                        className="sm:bg-white p-1 pb-5 sm:p-3 lg:p-5 sm:rounded-xl sm:shadow-sm sm:border-4 sm:border-dashed "
                        key={questionIndex}
                      >
                        <div className="flex flex-col justify-center items-center gap-5 sm:p-3">
                          <span
                            id={
                              `edit-quiz-question-` + quizQuestion.id + "-title"
                            }
                            className="flex flex-1 gap-5 items-center font-bold text-center"
                          >
                            #{questionIndex + 1} {quizQuestion.text}
                          </span>

                          <div className="flex flex-col lg:flex-row gap-5 lg:gap-5 mt-3 lg:mt-0">
                            <div className="mx-auto w-auto">
                              <Button
                                onClick={() =>
                                  showDialog(
                                    "isCreateQuizAnswerDialogOpen",
                                    quizQuestion
                                  )
                                }
                                variant="outline"
                              >
                                <LucidePlus className="mr-1" /> Legg til svar
                                alternativ
                              </Button>
                            </div>
                            <div className="mx-auto w-auto">
                              <Button
                                onClick={() =>
                                  showDialog(
                                    "isEditQuizQuestionDialogOpen",
                                    quizQuestion
                                  )
                                }
                                variant="outline"
                              >
                                <LucideSettings className="mr-1" /> Rediger
                                spørsmål
                              </Button>
                            </div>
                            <div className="mx-auto w-auto">
                              <Button
                                onClick={() =>
                                  showDialog(
                                    "isDeleteQuizQuestionDialogOpen",
                                    quizQuestion
                                  )
                                }
                                variant="destructive"
                              >
                                <LucideTrash2 className="mr-1" /> Slett spørsmål
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-5 mt-5 ">
                          {quizQuestion.quizAnswerOptions.map(
                            (answerOption, answerIndex) => (
                              <div
                                className={`${
                                  answerOption.correct
                                    ? "bg-green-50"
                                    : "bg-red-50"
                                } sm:flex sm:items-center border shadow-sm p-3 rounded-xl`}
                                key={`${answerOption.id}-${answerIndex}`}
                              >
                                <p className="flex-1 text-center lg:mb-0 lg:text-left">
                                  Svar alternativ: <b>{answerOption.text}</b>
                                </p>
                                <div className="flex flex-col gap-5 md:flex-row items-center sm:*:py-0">
                                  <div>
                                    {answerOption.correct ? (
                                      <LucideCheck className="text-green-600" />
                                    ) : (
                                      <LucideX className="text-red-600" />
                                    )}
                                  </div>
                                  <div>
                                    <Button
                                      onClick={() =>
                                        showDialog(
                                          "isEditQuizAnswerDialogOpen",
                                          quizQuestion,
                                          answerOption
                                        )
                                      }
                                      variant="outline"
                                    >
                                      <LucideSettings /> Rediger svar alternativ
                                    </Button>
                                  </div>
                                  <div>
                                    <Button
                                      onClick={() =>
                                        showDialog(
                                          "isDeleteQuizAnswerDialogOpen",
                                          quizQuestion,
                                          answerOption
                                        )
                                      }
                                      variant="destructive"
                                    >
                                      <LucideTrash2 /> Slett svar alternativ
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {quiz.status === "PENDING" && (
              <div className="h-full w-full m-auto">
                <Spinner size={"large"} />
              </div>
            )}
            {quiz.status === "FAILED" && (
              <div>
                <h1 className="text-xl md:text-4xl">Quizen er ødelagt</h1>
                <p>Vennligst slett denne og prøv igjen</p>
              </div>
            )}
          </div>
        </>
      )}

      <QuizEditTitleDescriptionDialog
        token={token}
        quiz={quiz}
        setQuiz={setQuiz}
        setLoading={setLoading}
        name={"isQuizEditTitleDescriptionDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizAddQuestionDialog
        quizId={quizId}
        setQuiz={setQuiz}
        setLoading={setLoading}
        name={"isQuizAddQuestionDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizDeleteDialog
        token={token}
        quizTitle={quiz?.title}
        quizId={quizId}
        name={"isQuizDeleteDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizCreateAnswerOptionDialog
        setQuiz={setQuiz}
        quizQuestion={currentQuizQuestion}
        setLoading={setLoading}
        name={"isCreateQuizAnswerDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizDeleteQuestionDialog
        setQuiz={setQuiz}
        quizQuestion={currentQuizQuestion}
        setLoading={setLoading}
        name={"isDeleteQuizQuestionDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizEditQuestionDialog
        quizQuestion={currentQuizQuestion}
        setQuiz={setQuiz}
        setLoading={setLoading}
        name={"isEditQuizQuestionDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizEditAnswerOptionDialog
        setQuiz={setQuiz}
        quizQuestion={currentQuizQuestion}
        answerOption={currentQuizAnswer}
        setLoading={setLoading}
        name={"isEditQuizAnswerDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />

      <QuizDeleteAnswerOptionDialog
        setQuiz={setQuiz}
        quizQuestion={currentQuizQuestion}
        answerOption={currentQuizAnswer}
        setLoading={setLoading}
        name={"isDeleteQuizAnswerDialogOpen"}
        open={dialogStates}
        setOpen={setDialogState}
      />
    </>
  );
};

export default QuizEditPage;
