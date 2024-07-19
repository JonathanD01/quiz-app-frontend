import { Copy, LucideShare2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useToastHandler from "@/hooks/useToastHandler";

const QuizCopySharedUrlDialog = ({ quizLink }) => {
  const { showSuccessToast } = useToastHandler();

  function getUrl() {
    return window.location.origin + `/quiz/${quizLink}/spill`;
  }

  function copyClipboard() {
    // Get the text field
    var copyText = getUrl();

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText);

    // Alert the copied text
    console.log("Copied the text: " + copyText);

    showSuccessToast("Kopiert!", "Du har kopiert lenken til quizen din");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-3 w-full" variant="outline">
          <LucideShare2 className="mr-1" /> Kopier lenke
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kopier lenke</DialogTitle>
          <DialogDescription>
            Alle som har denne lenken kan spille! For å skjule quizen må du
            trykke på "Rediger" og ta av deling.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={getUrl()} readOnly />
          </div>
          <Button
            onClick={copyClipboard}
            type="submit"
            size="sm"
            className="px-3"
          >
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Lukk
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizCopySharedUrlDialog;
