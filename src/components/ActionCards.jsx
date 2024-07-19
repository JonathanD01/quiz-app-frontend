import { useState } from "react";
import QuizCreateSheet from "./QuizCreateSheet";

const ActionCards = () => {
  const [isQuizCreateSheetOpen, setQuizCreateSheetOpen] = useState(false);
  return (
    <div className="flex flex-col md:flex-row gap-10">
      <div>
        <QuizCreateSheet
          open={isQuizCreateSheetOpen}
          setOpen={setQuizCreateSheetOpen}
        />
        <button
          onClick={() => setQuizCreateSheetOpen(true)}
          className="rounded-md w-full md:min-w-[200px] min-h-[100px] bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
        >
          Ny quiz
        </button>
      </div>
      <div>
        <a
          href="/tips"
          className="flex flex-col justify-center text-center rounded-md min-w-[200px] min-h-[100px] bg-indigo-600 px-3 p-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Tips
        </a>
      </div>
    </div>
  );
};

export default ActionCards;
