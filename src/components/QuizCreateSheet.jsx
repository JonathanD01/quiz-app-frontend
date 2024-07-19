import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { createQuizWithAI } from "@/services/QuizService";
import { useContext, useState } from "react";

const QuizCreateSheet = ({ open, setOpen }) => {
  const { token } = useContext(AuthContext);
  const [selectedLanguage, setSelectedLanguage] = useState("norwegian");
  const { showErrorToast } = useToastHandler();

  async function sendQuizCreateRequest(event) {
    event.preventDefault();

    setOpen(false);

    try {
      await createQuizWithAI(token, selectedLanguage);
    } catch (error) {
      showErrorToast(error);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Lag en quiz</SheetTitle>
          <SheetDescription>
            Alt du må gjøre er å laste opp din tekstfil fil så fikser vi resten!
            <br />
            <span>
              <b>Maks størrelse på fil er 200KB</b>
            </span>
          </SheetDescription>
        </SheetHeader>
        <form id="new-quiz-form">
          <div className="flex flex-col gap-5 mt-5">
            <Select onValueChange={setSelectedLanguage} required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Velg språk" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Språk</SelectLabel>
                  <SelectItem value="norwegian">Norsk</SelectItem>
                  <SelectItem value="english">Engelsk</SelectItem>
                  <SelectItem value="french">Fransk</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div>
              <Input id="file" type="file" />
            </div>
          </div>
          <button
            onClick={sendQuizCreateRequest}
            type="submit"
            className="flex mt-5 justify-center items-center gap-3 rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lag
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default QuizCreateSheet;
