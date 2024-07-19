import { Skeleton } from "../ui/skeleton";

const QuizEditSkeleton = () => {
  return (
    <>
      <div className="flex flex-col xl:flex-row gap-12 mx-auto max-w-[95%] lg:max-w-[90%] text-[20px]">
        <div className="xl:w-[400px]">
          <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 h-[40px]" />
          <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[270px]" />
          <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[50px]" />
          <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[50px]" />
          <Skeleton className="mt-3 flex flex-col gap-3 bg-slate-300 rounded-xl h-[50px]" />
        </div>
        <div className="flex-1">
          <div>
            <Skeleton className="bg-slate-300 w-[600px] h-[50px]" />
            <Skeleton className="bg-slate-300 w-[700px] h-[60px] mt-5" />

            <div className="flex flex-col gap-5 mt-10 lg:mt-5">
              <Skeleton className="bg-slate-300  h-[400px]" />
              <Skeleton className="bg-slate-300  h-[400px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizEditSkeleton;
