import { AuthContext } from "@/context/AuthProvider";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import TimeElapsed from "./TimeElapsed";

import QuizPlayUI from "./QuizPlayUI";

const QuizPlayPage = () => {
  const { quizLink } = useParams();
  const { token } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState(null);

  return (
    <>
      {quizLink && (
        <>
          <a href="/min-side" className="ml-2 lg:ml-12 text-slate-500">
            &larr; Tilbake
          </a>
          <TimeElapsed startTime={startTime} isLoading={isLoading} />
          <QuizPlayUI
            startTime={startTime}
            setStartTime={setStartTime}
            quizLink={quizLink}
            token={token}
            isLoading={isLoading}
            setLoading={setLoading}
          />
        </>
      )}
    </>
  );
};

export default QuizPlayPage;
