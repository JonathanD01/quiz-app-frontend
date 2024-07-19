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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { cn } from "@/lib/utils";
import { updateQuizAnswerOptionById } from "@/services/QuizAnswerOptionService";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function QuizEditAnswerOptionDialog({
  setQuiz,
  quizQuestion,
  answerOption,
  setLoading,
  name,
  open,
  setOpen,
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  var isCorrectAnswer = null;
  const { token } = useContext(AuthContext);
  const { showSuccessToast, showErrorToast } = useToastHandler();

  function onOpenChange(value) {
    setOpen(name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newText = document.getElementById("text").value;
    const newCorrect =
      isCorrectAnswer === null ? answerOption.correct : isCorrectAnswer;

    const data = {};
    data.text = newText;
    data.correct = newCorrect;

    setOpen(name, false);
    setLoading(true);

    try {
      const response = await updateQuizAnswerOptionById(
        token,
        answerOption.id,
        data
      );
      if (response.status === 200) {
        updateQuizAnswerOption(response.data.result);
        showSuccessToast("Quiz endret", "Du har endret quizen!");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  function updateQuizAnswerOption(updatedAnswerOption) {
    setQuiz((prevQuiz) => {
      // Create a deep copy of the previous quiz state to avoid mutating the state directly
      const newQuiz = { ...prevQuiz, questions: [...prevQuiz.questions] };

      // Find the quizQuestion by ID
      const questionIndex = newQuiz.questions.findIndex(
        (q) => q.id === quizQuestion.id
      );
      if (questionIndex === -1) return prevQuiz; // If the quizQuestion is not found, return the previous state

      // Find the answer option by ID within the specific quizQuestion
      const answerOptions = newQuiz.questions[questionIndex].quizAnswerOptions;
      const answerOptionIndex = answerOptions.findIndex(
        (ao) => ao.id === answerOption.id
      );
      if (answerOptionIndex === -1) return prevQuiz; // If the answer option is not found, return the previous state

      // Replace the old answer option with the updated one
      const updatedAnswerOptions = [...answerOptions];
      updatedAnswerOptions[answerOptionIndex] = { ...updatedAnswerOption };

      // Update the specific quizQuestion with the new answer options
      newQuiz.questions[questionIndex] = {
        ...newQuiz.questions[questionIndex],
        quizAnswerOptions: updatedAnswerOptions,
      };

      return newQuiz; // Return the new quiz state
    });
  }

  function EditAnswerOptionForm({ className }) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <Label htmlFor="text">Svar alternativ</Label>
          <Textarea
            id="text"
            name="text"
            required
            defaultValue={answerOption?.text}
          />
        </div>
        <div className="grid gap-2">
          <Switch
            id="correct"
            name="correct"
            defaultChecked={answerOption?.correct}
            onCheckedChange={(value) => (isCorrectAnswer = value)}
          />
          <Label htmlFor="correct">Riktig svar?</Label>
        </div>
        <button
          className="w-full my-3 justify-center items-center rounded-md bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-emerald-600"
          type="submit"
        >
          Lagre
        </button>
      </form>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={open[name]} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rediger svar alternativ</DialogTitle>
            <DialogDescription>
              Her kan du endre svar alternativet. Trykk på lagre når du er
              ferdig.
            </DialogDescription>
          </DialogHeader>
          <EditAnswerOptionForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open[name]} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Rediger svar alternativ</DrawerTitle>
          <DrawerDescription>
            Her kan du endre svar alternativet. Trykk på lagre når du er ferdig.
          </DrawerDescription>
        </DrawerHeader>
        <EditAnswerOptionForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Avbryt</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
