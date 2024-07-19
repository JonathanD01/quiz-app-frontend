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
import { deleteQuizQuestionById } from "@/services/QuizQuestionService";
import { useContext } from "react";

const QuizDeleteQuestionDialog = ({
  setQuiz,
  quizQuestion,
  setLoading,
  name,
  open,
  setOpen,
}) => {
  const { token } = useContext(AuthContext);
  const { showErrorToast, showSuccessToast } = useToastHandler();

  function onOpenChange(value) {
    setOpen(name, value);
  }

  function deleteQuizQuestion(questionId) {
    setQuiz((prevQuiz) => {
      // Create a deep copy of the previous quiz state to avoid mutating the state directly
      const newQuiz = { ...prevQuiz };

      // Filter out the question to be deleted
      newQuiz.questions = newQuiz.questions.filter((q) => q.id !== questionId);

      return newQuiz; // Return the new quiz state
    });
  }

  async function handleDelete() {
    setOpen(name, false);
    setLoading(true);

    try {
      const response = await deleteQuizQuestionById(token, quizQuestion.id);
      if (response.status === 200) {
        deleteQuizQuestion(response.data.result);
        showSuccessToast(
          "Quiz spørsmål slettet",
          "Du har slettet spørsmålet fra quizen!"
        );
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AlertDialog open={open[name]} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
            <AlertDialogDescription>
              Ønsker du å slette quiz spørsmålet <b>"{quizQuestion?.text}"</b>{" "}
              fra quizen? Denne handlingen kan ikke angres!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Avbryt</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Jeg er sikker
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default QuizDeleteQuestionDialog;
