import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { deleteQuizAnswerOptionById } from "@/services/QuizAnswerOptionService";
import { useContext } from "react";

const QuizDeleteAnswerOptionDialog = ({
  setQuiz,
  quizQuestion,
  answerOption,
  setLoading,
  name,
  open,
  setOpen,
}) => {
  const { token } = useContext(AuthContext);
  const { showSuccessToast, showErrorToast } = useToastHandler();

  function onOpenChange(value) {
    setOpen(name, value);
  }

  function deleteQuizAnswerOption(answerOptionIdToDelete) {
    setQuiz((prevQuiz) => {
      // Create a deep copy of the previous quiz state to avoid mutating the state directly
      const newQuiz = { ...prevQuiz, questions: [...prevQuiz.questions] };

      // Find the quizQuestion by ID
      const questionIndex = newQuiz.questions.findIndex(
        (q) => q.id === quizQuestion.id
      );
      if (questionIndex === -1) return prevQuiz; // If the quizQuestion is not found, return the previous state

      // Filter out the answer option by ID within the specific quizQuestion
      const updatedAnswerOptions = newQuiz.questions[
        questionIndex
      ].quizAnswerOptions.filter((ao) => ao.id !== answerOptionIdToDelete);

      // Update the specific quizQuestion with the new answer options
      newQuiz.questions[questionIndex] = {
        ...newQuiz.questions[questionIndex],
        quizAnswerOptions: updatedAnswerOptions,
      };

      return newQuiz; // Return the new quiz state
    });
  }

  async function onDeleteConfirmed() {
    setOpen(name, false);
    setLoading(true);
    try {
      const response = await deleteQuizAnswerOptionById(token, answerOption.id);
      if (response.status === 200) {
        deleteQuizAnswerOption(response.data.result);
        showSuccessToast("Quiz svar slettet", "Du slettet svar alternativet");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open[name]} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Denne handlingen kan ikke angres. Dette vil permanent slette svar
            alternativet fra quizen din.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Avbryt</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteConfirmed}>
            Jeg er sikker
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default QuizDeleteAnswerOptionDialog;
