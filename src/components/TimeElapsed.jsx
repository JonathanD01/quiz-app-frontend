import { LucideTimer } from "lucide-react";
import { useEffect, useState } from "react";

const TimeElapsed = ({ startTime, isLoading }) => {
  const [timeElapsed, setTimeElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  /**
   * Add a '0' prefix to number if its
   * less than 9
   * @param {int} number
   */
  const addPrefix = (number) => {
    return number <= 9 ? "0" + number : number;
  };

  function resetTime() {
    setTimeElapsed({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  }

  useEffect(() => {
    resetTime();
  }, [startTime, isLoading]);

  useEffect(() => {
    const updateElapsedTime = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      const totalSeconds = Math.floor(elapsedTime / 1000);
      const totalMinutes = Math.floor(totalSeconds / 60);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const seconds = totalSeconds % 60;

      setTimeElapsed({ hours, minutes, seconds });
    };

    const intervalId = setInterval(updateElapsedTime, 1000);
    return () => clearInterval(intervalId);
  }, [startTime, isLoading]);

  return (
    <div className="bg-gray-200 p-3 rounded-2xl mt-10 mb-12 lg:flex flex-row justify-between items-center max-w-[90%] md:max-w-[500px] mx-auto">
      <div className="w-full">
        <div className="flex flex-row gap-3 justify-center items-center">
          {!isLoading && (
            <>
              <div>
                <LucideTimer />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-700 min-w-[50px] text-[18px]">
                  {addPrefix(timeElapsed.hours)}:
                  {addPrefix(timeElapsed.minutes)}:
                  {addPrefix(timeElapsed.seconds)}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeElapsed;
