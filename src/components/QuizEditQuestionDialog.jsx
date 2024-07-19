import { useContext } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useToastHandler from "@/hooks/useToastHandler";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";

import { AuthContext } from "@/context/AuthProvider";
import { updateQuizQuestionById } from "@/services/QuizQuestionService";

export default function QuizEditQuestionDialog({
  quizQuestion,
  setQuiz,
  setLoading,
  name,
  open,
  setOpen,
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { token } = useContext(AuthContext);
  const { showSuccessToast, showErrorToast } = useToastHandler();

  function updateQuizQuestionText(questionId, newText) {
    setQuiz((prevQuiz) => {
      // Create a deep copy of the previous quiz state to avoid mutating the state directly
      const newQuiz = { ...prevQuiz, questions: [...prevQuiz.questions] };

      // Find the question by ID
      const questionIndex = newQuiz.questions.findIndex(
        (q) => q.id === questionId
      );
      if (questionIndex === -1) return prevQuiz; // If the question is not found, return the previous state

      // Update the text of the specific question
      newQuiz.questions[questionIndex] = {
        ...newQuiz.questions[questionIndex],
        text: newText,
      };

      return newQuiz; // Return the new quiz state
    });
  }

  async function handleQuizAnswerSave(event) {
    event.preventDefault();

    const newQuizQuestionToSet = document.getElementById(
      "edit-quiz-question-text"
    ).value;

    const data = { question: newQuizQuestionToSet };

    setLoading(true);
    setOpen(name, false);

    try {
      const response = await updateQuizQuestionById(
        token,
        quizQuestion.id,
        data
      );
      if (response.status === 200) {
        const result = response.data.result;
        updateQuizQuestionText(result.id, result.text);
        showSuccessToast("Quiz spørsmål", "Du har endret quiz spørsmålet!");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  function QuizQuestionEditForm({ className }) {
    return (
      <>
        {quizQuestion && (
          <form
            className={cn("grid items-start gap-4", className)}
            onSubmit={handleQuizAnswerSave}
          >
            <div className="grid w-full gap-1.5">
              <Label htmlFor="edit-quiz-question-text">Spørsmål</Label>
              <Textarea
                id="edit-quiz-question-text"
                name="edit-quiz-question-text"
                required
                defaultValue={quizQuestion.text}
              />
            </div>
            <button
              className="w-full my-3 justify-center items-center rounded-md bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-emerald-600"
              type="submit"
            >
              Lagre
            </button>
          </form>
        )}
      </>
    );
  }

  if (isDesktop) {
    return (
      <div>
        <Dialog
          open={open[name]}
          onOpenChange={(value) => setOpen(name, value)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Rediger quiz spørsmål</DialogTitle>
              <DialogDescription>
                Her kan du endre spørsmålet. Trykk på lagre når du er ferdig.
              </DialogDescription>
            </DialogHeader>
            <QuizQuestionEditForm />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <Drawer open={open[name]} onOpenChange={(value) => setOpen(name, value)}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Rediger quiz spørsmål</DrawerTitle>
            <DrawerDescription>
              Her kan du endre spørsmålet. Trykk på lagre når du er ferdig.
            </DrawerDescription>
          </DrawerHeader>
          <QuizQuestionEditForm className="px-4" />
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button className="flex w-full my-3 justify-center items-center gap-3 rounded-md bg-red-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600">
                Avbryt
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
