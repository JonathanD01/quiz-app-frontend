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
import useToastHandler from "@/hooks/useToastHandler";
import { deleteQuizById } from "@/services/QuizService";
import { useNavigate } from "react-router-dom";

const QuizDeleteDialog = ({
  token,
  quizTitle,
  quizId,
  name,
  open,
  setOpen,
}) => {
  const { showSuccessToast, showErrorToast } = useToastHandler();
  const navigate = useNavigate();

  function onOpenChange(value) {
    setOpen(name, value);
  }

  async function onDeleteConfirmed() {
    try {
      const response = await deleteQuizById(token, quizId);
      if (response.status === 200) {
        navigate("/min-side");
        showSuccessToast("Quiz slettet", `Quiz '${quizTitle}' ble slettet`);
      }
    } catch (error) {
      showErrorToast(error);
    }
  }

  return (
    <AlertDialog open={open[name]} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
          <AlertDialogDescription>
            Denne handlingen kan ikke angres. Dette vil permanent slette quizen
            din.
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

export default QuizDeleteDialog;
