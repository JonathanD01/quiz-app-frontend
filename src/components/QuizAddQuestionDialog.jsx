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
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { cn } from "@/lib/utils";
import { createQuizQuestion } from "@/services/QuizQuestionService";
import { useMediaQuery } from "@uidotdev/usehooks";

export default function QuizAddQuestionDialog({
  quizId,
  setQuiz,
  setLoading,
  name,
  open,
  setOpen,
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { token } = useContext(AuthContext);
  const { showSuccessToast } = useToastHandler();

  function onOpenChange(value) {
    setOpen(name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const text = document.getElementById("text").value;

    const data = {};
    data.quizId = quizId;
    data.text = text;

    setLoading(true);
    setOpen(name, false);

    try {
      const response = await createQuizQuestion(token, data);
      if (response.status === 200) {
        addQuizQuestion(response.data.result);
        showSuccessToast("Quiz endret", "Du har endret quizen!");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  function addQuizQuestion(newQuizQuestion) {
    setQuiz((prevQuiz) => {
      // Create a deep copy of the previous quiz state to avoid mutating the state directly
      const newQuiz = { ...prevQuiz };

      // Add the new question to the questions array
      newQuiz.questions = [newQuizQuestion, ...newQuiz.questions];

      return newQuiz; // Return the new quiz state
    });
  }

  function CreateAnswerOptionForm({ className }) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn("grid items-start gap-4", className)}
      >
        <div className="grid gap-2">
          <Label htmlFor="text">Spørsmål</Label>
          <Textarea
            id="text"
            name="text"
            placeholder="Skriv inn spørsmålet her"
            required
          />
        </div>
        <button
          className="w-full my-3 justify-center items-center rounded-md bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-emerald-600"
          type="submit"
        >
          Lag
        </button>
      </form>
    );
  }

  if (isDesktop) {
    return (
      <Dialog open={open[name]} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Legg til et nytt spørsmål</DialogTitle>
            <DialogDescription>
              Her lager du det nyet spørsmålet. Trykk på lag når du er ferdig.
            </DialogDescription>
          </DialogHeader>
          <CreateAnswerOptionForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open[name]} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Legg til et nytt spørsmål</DrawerTitle>
          <DrawerDescription>
            Her lager du det nyet spørsmålet. Trykk på lag når du er ferdig.
          </DrawerDescription>
        </DrawerHeader>
        <CreateAnswerOptionForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
