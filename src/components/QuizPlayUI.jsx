import useToastHandler from "@/hooks/useToastHandler";
import { createQuizAttemptForUser } from "@/services/QuizAttemptService";
import { getQuizByLink } from "@/services/QuizService";
import {
  getQuestionBgBorderColorByIndex,
  getQuestionBgColorByIndex,
} from "@/utils/ColorUtil";
import { shuffle } from "@/utils/shuffle";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuizPlayReset } from "./QuizPlayReset";
import QuizPlaySkeletonUI from "./skeletons/QuizPlaySkeletonUI";
import { Spinner } from "./ui/spinner";

const QuizPlayUI = ({
  quizLink,
  token,
  startTime,
  setStartTime,
  isLoading,
  setLoading,
}) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState({});
  const [showResetQuizDialog, setShowResetQuizDialog] = useState(false);
  const { showErrorToast, showCustomErrorToast } = useToastHandler();
  const navigate = useNavigate();

  const getCurrentQuestion = useCallback(() => {
    return quiz ? quiz.questions[currentQuestionIndex] : null;
  }, [quiz, currentQuestionIndex]);

  function shuffleQuizQuestionAndAnswersOrder(quiz_) {
    shuffle(quiz_.questions);
    for (let i = 0; i < quiz_.questions.length; i++) {
      shuffle(quiz_.questions[i].quizAnswerOptions);
    }
  }

  const isAtFirstPage = () => {
    return currentQuestionIndex === 0;
  };

  const isAtLastPage = () => {
    return currentQuestionIndex === quiz.questions.length - 1;
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
  };

  const goToLastQuestion = () => {
    setCurrentQuestionIndex((prevQuestionIndex) => {
      if (prevQuestionIndex > 0) {
        return prevQuestionIndex - 1;
      }
      return prevQuestionIndex;
    });
  };

  const isAnswerSelected = (quizAnswerOptionId) => {
    const quizQuestionIndex = quiz.questions[currentQuestionIndex].id;
    return (
      selectedAnswerIndexes[quizQuestionIndex] &&
      selectedAnswerIndexes[quizQuestionIndex].indexOf(quizAnswerOptionId) !==
        -1
    );
  };

  const toggleAnswerSelection = (quizAnswerOptionId) => {
    setSelectedAnswerIndexes((prevSelectedIndexes) => {
      const quizQuestionIndex = quiz.questions[currentQuestionIndex].id;
      const updatedIndexes = { ...prevSelectedIndexes };
      const selectedForCurrent = updatedIndexes[quizQuestionIndex] || [];

      if (selectedForCurrent.indexOf(quizAnswerOptionId) === -1) {
        updatedIndexes[quizQuestionIndex] = [
          ...selectedForCurrent,
          quizAnswerOptionId,
        ];
      } else {
        updatedIndexes[quizQuestionIndex] = selectedForCurrent.filter(
          (index) => index !== quizAnswerOptionId
        );
      }
      return updatedIndexes;
    });
  };

  const removeCurrentAnswers = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndexes({});
    setStartTime(new Date());
  };

  const finishQuiz = () => {
    const selectedQuizQuestionIds = Object.keys(selectedAnswerIndexes);
    const allQuizQuestionIds = quiz.questions.map((question) => question.id);

    if (selectedQuizQuestionIds.length !== allQuizQuestionIds.length) {
      showCustomErrorToast(
        "Innsending feilet",
        "Du må svare på alle spørsmålene før du kan fullføre!"
      );
      return;
    }

    for (let i = 0; i < selectedQuizQuestionIds.length; i++) {
      const currentQuizQuestionId = selectedQuizQuestionIds[i];
      const selectedQuizAnswers = selectedAnswerIndexes[currentQuizQuestionId];

      if (
        !Array.isArray(selectedQuizAnswers) ||
        selectedQuizAnswers.length === 0
      ) {
        showCustomErrorToast(
          "Innsending feilet",
          "Du må svare på alle spørsmålene før du kan fullføre!"
        );
        return;
      }
    }
    createQuizAttempt();
  };

  async function createQuizAttempt() {
    setLoading(true);
    const data = {};
    data["quiz_link"] = quizLink;
    data["start_time"] = startTime;
    data["end_time"] = new Date();
    data["user_answers"] = selectedAnswerIndexes;

    try {
      const response = await createQuizAttemptForUser(token, data);
      navigate(`/quiz/forsok/${response.data.result.link}`);
    } catch (error) {
      showErrorToast(error);
      //navigate("/min-side");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    async function fetchQuizByLink() {
      try {
        const response = await getQuizByLink(token, quizLink);
        if (!ignore) {
          const fetchedQuiz = response.data.result;

          if (fetchedQuiz.status !== "COMPLETED") {
            navigate("/min-side");
            showCustomErrorToast(
              "Ugyldig quiz",
              "Denne quizen er ikke gyldig og må slettes!"
            );
            return;
          }

          shuffleQuizQuestionAndAnswersOrder(fetchedQuiz);
          setQuiz(fetchedQuiz);
          setStartTime(new Date());
        }
      } catch (error) {
        showErrorToast(error);
        navigate("/min-side");
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchQuizByLink();

    return () => {
      ignore = true;
    };
  }, [quizLink, token]);

  return (
    <>
      {isLoading && <QuizPlaySkeletonUI />}
      {quiz && !isLoading && (
        <div className="flex flex-col justify-center lg:text-[24px]">
          <div className="my-auto mb-12">
            <div className="my-auto text-center mx-auto w-full lg:w-[80%] md:min-h-[250px]">
              <h1 className="flex flex-col gap-3 items-center justify-center text-md sm:text-2xl md:text-4xl font-bold text-gray-900 max-w-[800px] mx-auto p-1">
                <span className="text-sm lg:text-xl text-slate-400">
                  {currentQuestionIndex + 1}/{quiz.questions.length}
                </span>
                {getCurrentQuestion().text}
              </h1>
            </div>
          </div>
          <div>
            <div className="grid lg:grid-cols-2 lg:auto-rows-min px-3 lg:px-7 gap-x-5 gap-y-5 max-w-[1200px] min-h-[230px] mx-auto">
              {getCurrentQuestion().quizAnswerOptions?.map(
                (quizAnswerOption, quizAnswerOptionIndex) => {
                  const bgColor = getQuestionBgColorByIndex(
                    quizAnswerOptionIndex
                  );
                  const borderColor = getQuestionBgBorderColorByIndex(
                    quizAnswerOptionIndex
                  );
                  const isSelected = isAnswerSelected(quizAnswerOption.id);
                  const borderStyle = isSelected
                    ? `8px solid ${borderColor}`
                    : "8px solid transparent";

                  return (
                    <button
                      id="quizAnswerOption"
                      key={quizAnswerOption.id}
                      onClick={() => toggleAnswerSelection(quizAnswerOption.id)}
                      className={`text-sm md:text-lg w-full justify-center items-center rounded-md p-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
                      style={{
                        backgroundColor: bgColor,
                        border: borderStyle,
                      }}
                    >
                      {quizAnswerOption.text}
                    </button>
                  );
                }
              )}
            </div>
          </div>
          <div className="w-full grid mt-14 lg:mt-0 lg:grid-cols-2 lg:auto-rows-min px-3 lg:px-7 gap-x-5 gap-y-3 max-w-[1200px] mx-auto">
            {isAtFirstPage() ? (
              <button
                type="button"
                disabled
                className="w-full my-3 justify-center items-center rounded-md bg-slate-400 p-3 font-semibold text-white shadow-sm"
              >
                Forrige
              </button>
            ) : (
              <button
                type="button"
                onClick={goToLastQuestion}
                className="w-full my-3 justify-center items-center rounded-md bg-slate-600 p-3 font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-600"
              >
                Forrige
              </button>
            )}
            {isAtLastPage() ? (
              <button
                type="button"
                onClick={finishQuiz}
                className="flex gap-3 w-full my-3 justify-center items-center rounded-md bg-green-600 p-3 font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-green-600"
              >
                Fullfør {isLoading && <Spinner size={"small"} />}
              </button>
            ) : (
              <button
                type="button"
                onClick={goToNextQuestion}
                className="w-full my-3 justify-center items-center rounded-md bg-slate-600 p-3 font-semibold text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-slate-600"
              >
                Neste
              </button>
            )}
            <button
              onClick={() => setShowResetQuizDialog(true)}
              className="w-full col-span-2 justify-center items-center rounded-md bg-indigo-600 p-3 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-indigo-600"
            >
              Start på nytt
            </button>
            <QuizPlayReset
              reset={removeCurrentAnswers}
              open={showResetQuizDialog}
              setOpen={setShowResetQuizDialog}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default QuizPlayUI;
