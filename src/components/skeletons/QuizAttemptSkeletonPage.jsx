import { Skeleton } from "../ui/skeleton";

const QuizAttemptSkeletonPage = () => {
  return (
    <>
      <div className="max-w-[1000px] mx-auto">
        <Skeleton className="mt-6 flex flex-col gap-3 bg-slate-300 rounded-xl h-[50px]" />
        <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[315px]" />
        <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[375px]" />
        <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[375px]" />
        <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[375px]" />
        <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[375px]" />
      </div>
    </>
  );
};

export default QuizAttemptSkeletonPage;
