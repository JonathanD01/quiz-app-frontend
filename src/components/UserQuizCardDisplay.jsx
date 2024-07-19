import { Skeleton } from "./ui/skeleton";

const UserQuizCardDisplay = ({ quizzes }) => {
  // TODO QUIZZES NEEDS SORTING ?!
  return (
    <>
      {quizzes.map((quiz) => {
        switch (quiz.status) {
          case "PENDING":
            return (
              <a href={`/quiz/${quiz.id}/rediger`}>
                <Skeleton className="h-[170px] rounded-2xl" />
              </a>
            );

          case "FAILED":
            return (
              <a key={quiz.id} href={`/quiz/${quiz.id}/rediger`}>
                <div className="p-5 bg-red-100 rounded-2xl hover:bg-red-300 min-h-[170px]">
                  <div>
                    <h3 className="font-bold text-md group-hover:text-white text-slate-800">
                      FEIL
                    </h3>
                    <p className="text-slate-600 group-hover:text-white">
                      Noe gikk galt! Slett denne quizen og prøv på nytt...
                    </p>
                  </div>
                </div>
              </a>
            );

          case "COMPLETED":
            return (
              <a key={quiz.id} href={`/quiz/${quiz.id}/rediger`}>
                <div className="p-5 bg-indigo-100 rounded-2xl hover:bg-indigo-300 min-h-[170px]">
                  <div>
                    <h3 className="font-bold text-md group-hover:text-white text-slate-800 max-lines-for-quiz max-lines-quiz-title">
                      {quiz.title}
                    </h3>
                    <p className="text-slate-600 group-hover:text-white max-lines-for-quiz max-lines-quiz-description">
                      {quiz.description}
                    </p>
                  </div>
                </div>
              </a>
            );

          default:
            return null; // Or some default rendering
        }
      })}
    </>
  );
};

export default UserQuizCardDisplay;
