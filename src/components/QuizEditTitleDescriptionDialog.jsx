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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useToastHandler from "@/hooks/useToastHandler";
import { cn } from "@/lib/utils";
import { updateQuizById } from "@/services/QuizService";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Switch } from "./ui/switch";

export default function QuizEditTitleDescriptionDialog({
  token,
  quiz,
  setQuiz,
  setLoading,
  name,
  open,
  setOpen,
}) {
  const { showErrorToast, showSuccessToast } = useToastHandler();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  var isShared = quiz?.shared;

  function onOpenChange(value) {
    setOpen(name, value);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newTitle = document.getElementById("edit-quiz-title").value;
    const newDescription = document.getElementById(
      "edit-quiz-description"
    ).value;

    const data = {};
    data.title = newTitle;
    data.description = newDescription;
    data.shared = isShared;

    setLoading(true);
    setOpen(name, false);

    try {
      const response = await updateQuizById(token, quiz.id, data);
      if (response.status === 200) {
        setQuiz(response.data.result);
        showSuccessToast("Quiz endret", "Du har endret quizen!");
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  function EditQuizTitleDescriptionForm({ className }) {
    return (
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={handleSubmit}
      >
        <div className="grid gap-2">
          <Label htmlFor="edit-quiz-title">Tittel</Label>
          <Input
            type="text"
            id="edit-quiz-title"
            name="title"
            required
            defaultValue={quiz.title}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="edit-quiz-description">Beskrivelse</Label>
          <Textarea
            id="edit-quiz-description"
            name="description"
            required
            defaultValue={quiz.description}
          />
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="edit-quiz-shared">Delt</Label>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Dersom quizen er delt kan alle som har lenken spille den.
          </p>
          <Switch
            id="edit-quiz-shared"
            defaultChecked={isShared}
            onCheckedChange={(value) => (isShared = value)}
          />
        </div>
        <button
          className="flex w-full my-3 justify-center items-center gap-3 rounded-md bg-emerald-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-emerald-600"
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
            <DialogTitle>Rediger quiz</DialogTitle>
            <DialogDescription>
              Her kan du endre tittel og beskrivelse. Trykk på lagre når du er
              ferdig.
            </DialogDescription>
          </DialogHeader>
          <EditQuizTitleDescriptionForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open[name]} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Rediger quiz</DrawerTitle>
          <DrawerDescription>
            Her kan du endre tittel og beskrivelse. Trykk på lagre når du er
            ferdig.
          </DrawerDescription>
        </DrawerHeader>
        <EditQuizTitleDescriptionForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button className="flex w-full my-3 justify-center items-center gap-3 rounded-md bg-red-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-red-600">
              Avbryt
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
