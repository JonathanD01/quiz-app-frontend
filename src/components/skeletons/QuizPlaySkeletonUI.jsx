import { Skeleton } from "../ui/skeleton";

const QuizPlaySkeletonUI = () => {
  return (
    <div className="flex flex-col justify-center text-[24px]">
      <div className="my-auto mb-12">
        <div className="my-auto text-center mx-auto w-full lg:w-[80%] min-h-[250px]">
          <Skeleton className="mt-3 mx-auto gap-3 bg-slate-300 max-w-[600px] h-[50px]" />
          <Skeleton className="mt-3 mx-auto gap-3 bg-slate-300 max-w-[300px] h-[50px]" />
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-2 lg:auto-rows-min px-3 lg:px-7 gap-x-5 gap-y-3 max-w-[1200px] min-h-[200px] mx-auto">
          <Skeleton className="mt-3 gap-3 bg-slate-300 rounded-xl h-[75px]" />
          <Skeleton className="mt-3 gap-3 bg-slate-300 rounded-xl h-[75px]" />
          <Skeleton className="mt-3 gap-3 bg-slate-300 rounded-xl h-[75px]" />
          <Skeleton className="mt-3 gap-3 bg-slate-300 rounded-xl h-[75px]" />
        </div>
      </div>
      <div className="w-full grid mt-14 lg:mt-0 lg:grid-cols-2 lg:auto-rows-min px-3 lg:px-7 gap-x-5 gap-y-3 max-w-[1200px] mx-auto">
        <Skeleton className="mt-8 gap-3 bg-slate-300 rounded-xl h-[50px]" />
        <Skeleton className="mt-8 gap-3 bg-slate-300 rounded-xl h-[50px]" />
        <Skeleton className="mt-3 col-span-2 gap-3 bg-slate-300 rounded-xl h-[50px]" />
      </div>
    </div>
  );
};

export default QuizPlaySkeletonUI;
