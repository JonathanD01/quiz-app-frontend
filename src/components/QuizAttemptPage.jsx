import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { getQuizAttempt } from "@/services/QuizAttemptService";
import { AlertCircle, LucideClock, LucideTrophy } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizAttemptSkeletonPage from "./skeletons/QuizAttemptSkeletonPage";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const QuizAttemptPage = () => {
  const { quizAttemptLink } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(null);
  const [userAnswerMap, setUserAnswerMap] = useState({});
  const { token, user } = useContext(AuthContext);
  const { showErrorToast } = useToastHandler();

  function initUserAnswersMap(userAnswers) {
    const newUserAnswerMap = {};
    const keys = Object.keys(userAnswers);
    for (let i = 0; i < keys.length; i++) {
      const userAnswer = userAnswers[keys[i]];
      const arr = newUserAnswerMap[userAnswer.quizQuestionId] || [];
      arr.push(...userAnswer.quizAnswerOptionIds);
      newUserAnswerMap[userAnswer.quizQuestionId] = arr;
    }
    setUserAnswerMap(newUserAnswerMap);
  }

  function didUserSelectAnswer(quizQuestionId, quizAnswerOptionId) {
    return (
      userAnswerMap[quizQuestionId] &&
      userAnswerMap[quizQuestionId].includes(quizAnswerOptionId)
    );
  }

  function wasUserGrantedAScore(correct, quizQuestionId, quizAnswerOptionId) {
    if (correct && didUserSelectAnswer(quizQuestionId, quizAnswerOptionId)) {
      return "+1";
    } else if (
      correct &&
      !didUserSelectAnswer(quizQuestionId, quizAnswerOptionId)
    ) {
      return "-1";
    } else if (
      !correct &&
      didUserSelectAnswer(quizQuestionId, quizAnswerOptionId)
    ) {
      return "x";
    }
    return "-";
  }

  function getColorForQuestion(correct, quizQuestionId, quizAnswerOptionId) {
    const result = wasUserGrantedAScore(
      correct,
      quizQuestionId,
      quizAnswerOptionId
    );
    if (result === "+1") {
      return "bg-green-300";
    } else if (result === "-1") {
      return "bg-red-300";
    } else if (result === "x") {
      return "bg-indigo-300";
    }
  }

  function returnTimeTakenAsString() {
    const startTime = new Date(quizAttempt.startTime).getTime();
    const endTime = new Date(quizAttempt.endTime).getTime();
    const elapsedTime = endTime - startTime;

    const totalSeconds = Math.floor(elapsedTime / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = totalSeconds % 60;

    const formatTimeUnit = (unit) => (unit < 10 ? `0${unit}` : `${unit}`);

    const formattedHours = formatTimeUnit(hours);
    const formattedMinutes = formatTimeUnit(minutes);
    const formattedSeconds = formatTimeUnit(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    async function fetchQuizAttempt() {
      setLoading(true);

      try {
        const response = await getQuizAttempt(token, quizAttemptLink);
        if (response.data.response === "SUCCESS") {
          setQuizAttempt(response.data.result);
          initUserAnswersMap(response.data.result.userAnswers);
        }
      } catch (error) {
        showErrorToast(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizAttempt();
  }, []);

  return (
    <>
      <div className="mt-10">
        {isLoading && <QuizAttemptSkeletonPage />}
        {quizAttempt && !isLoading && (
          <div className="p-3 lg:p-0 flex flex-col gap-10 max-w-[1000px] mx-auto *:w-full">
            {token ? (
              <a href="/min-side" className="text-slate-500">
                &larr; Tilbake
              </a>
            ) : (
              <a
                href={`/quiz/${quizAttempt.quizDto.link}/spill`}
                className="text-slate-500"
              >
                &larr; Ta på nytt
              </a>
            )}
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Obs</AlertTitle>
              <AlertDescription>
                Vær oppmerksom på at spørsmålene og/eller svar alternativene kan
                ha blitt endret etter ditt forsøk. Antall poeng og tid blir ikke
                endret.
              </AlertDescription>
            </Alert>

            <div className="text-sm md:text-lg">
              <h1 className="text-xl md:text-4xl font-bold">
                Quiz forsøk: {quizAttempt.quizDto.title}
              </h1>
              <p className="mt-2">{quizAttempt.quizDto.description}</p>
              <h2 className="flex gap-3 items-center font-bold underline decoration-indigo-600 mt-5">
                <LucideTrophy className="text-indigo-600" /> Din poengsum:{" "}
                {quizAttempt.score} / {quizAttempt.maxScore}
              </h2>
              <p className="flex gap-3 items-center font-bold underline decoration-indigo-600 mt-5">
                <LucideClock className="text-indigo-600" /> Tid{" "}
                {returnTimeTakenAsString()}
              </p>
              <p className="mt-4">
                Se nedenfor hvilke spørsmål du fikk rett eller galt. Du får{" "}
                <b>1 poeng</b> for hver riktig svar du oppgir. På den andre
                siden får du <b>-1 poeng</b> for hvert riktig svar som ikke er
                valgt. <b>Det er ikke mulig å få mindre enn 0 poeng!</b>
              </p>
            </div>
            {quizAttempt.quizDto.questions.map((quizQuestion) => (
              <div
                className="border-2 px-2 md:border-4 md:p-5 rounded-2xl md:border-dashed"
                key={quizQuestion.id}
              >
                <h3 className="text-lg font-bold text-indigo-600 max-w-[700px]">
                  {quizQuestion.text}
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto">Spørsmål</TableHead>
                      <TableHead className="w-[30px]">Riktig</TableHead>
                      <TableHead className="w-[100px]">Ditt svar</TableHead>
                      <TableHead className="w-[50px]">Poeng</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizQuestion.quizAnswerOptions.map((quizAnswerOption) => (
                      <TableRow
                        key={quizAnswerOption.id}
                        className={`${getColorForQuestion(
                          quizAnswerOption.correct,
                          quizQuestion.id,
                          quizAnswerOption.id
                        )}`}
                      >
                        <TableCell className="font-medium">
                          {quizAnswerOption.text}
                        </TableCell>
                        <TableCell>
                          {quizAnswerOption.correct ? (
                            <span>Ja</span>
                          ) : (
                            <span>Nei</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {didUserSelectAnswer(
                            quizQuestion.id,
                            quizAnswerOption.id
                          ) ? (
                            <span>Ja</span>
                          ) : (
                            <span>Nei</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <p>
                            {wasUserGrantedAScore(
                              quizAnswerOption.correct,
                              quizQuestion.id,
                              quizAnswerOption.id
                            )}
                          </p>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default QuizAttemptPage;
