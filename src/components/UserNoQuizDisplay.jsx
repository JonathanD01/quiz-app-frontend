import { useContext } from "react";
import { PageContext } from "./MyPage";

const UserNoQuestsDisplay = () => {
  const { quizzes } = useContext(PageContext);
  return (
    <>
      {(quizzes?.length === 0 || quizzes === null) && (
        <>
          <div className="rounded-lg">
            <p className="text-gray-500">
              Ingen quizzer ble funnet. Trykk på "Ny quiz" for å lage en ny
              quiz.
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default UserNoQuestsDisplay;
