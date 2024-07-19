import { LucideArrowRight } from "lucide-react";
import { useContext } from "react";
import { PageContext } from "./MyPage";
import { Skeleton } from "./ui/skeleton";

const UserQuizAttempts = () => {
  const { loadingStates, quizAttempts } = useContext(PageContext);
  return (
    <div>
      <h3 className="text-lg font-bold mb-5">Nylige forsøk</h3>
      <div className="flex flex-col gap-2">
        {!loadingStates["isAttemptsLoading"] &&
          quizAttempts &&
          quizAttempts.map((quizAttempt) => (
            <a key={quizAttempt.id} href={`/quiz/forsok/${quizAttempt.link}`}>
              <div className="bg-stone-100 hover:bg-stone-200 rounded-xl px-3 py-5">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{quizAttempt.title}</span>
                  <LucideArrowRight />
                </div>
              </div>
            </a>
          ))}
      </div>
      {loadingStates["isAttemptsLoading"] && (
        <div className="flex flex-col gap-2">
          {[0, 1, 2].map((number) => (
            <Skeleton key={number} className="h-[80px] rounded-xl" />
          ))}
        </div>
      )}
      {!loadingStates["isAttemptsLoading"] && !quizAttempts && (
        <span>Prøv å ta en quiz og kom tilbake!</span>
      )}
    </div>
  );
};

export default UserQuizAttempts;
