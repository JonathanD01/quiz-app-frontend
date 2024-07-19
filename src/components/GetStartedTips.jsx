import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LucideHelpCircle, LucideShare2, LucideStar } from "lucide-react";

const GetStartedTips = () => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-5">Raske tips</h2>
      <div className="flex flex-col gap-3">
        <div className="bg-stone-100 hover:bg-stone-200 rounded-xl p-2 hover:cursor-pointer">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-3 w-100">
                <LucideHelpCircle /> Hva bør være innholdet i tekstfilen være?
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Hva bør være innholdet i tekstfilen være?
                </DialogTitle>
                <DialogDescription>
                  Du har to valg. Det første valget er å ta med informasjon,
                  også flere avsnitt, i tekstfilen. Da vil AI-en lage svar og
                  spørsmålene ut ifra det. Det andre valget er å sette inn flere
                  spørsmål i tekstfilen. Dette kan du enkelt gjøre ved å spørre
                  en AI om: "Gi meg 10 spørsmål om dyrelivet" og lime dem inn i
                  tekstfilen. Da vil AI-en lage spørsmål og svar ut ifra
                  spørsmålene i filen.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-stone-100 hover:bg-stone-200 rounded-xl p-2 hover:cursor-pointer">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-3">
                <LucideStar /> Jeg kan ikke lage mer quizer!
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Vent 1 time og prøv igjen!</DialogTitle>
                <DialogDescription>
                  For å sikre at AI-en genererer relevante spørsmål, last opp
                  PDF-er med klart og konsist innhold. Dette hjelper AI-en med å
                  forstå og trekke ut de viktigste punktene.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="bg-stone-100 hover:bg-stone-200 rounded-xl p-2 hover:cursor-pointer">
          <Dialog>
            <DialogTrigger>
              <div className="flex items-center gap-3">
                <LucideShare2 /> Hvordan kan jeg dele en quiz med andre?
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Hvordan kan jeg dele en quiz med andre?
                </DialogTitle>
                <DialogDescription>
                  Trykk inn på quizen. Deretter trykk på "Rediger" slik at lite
                  vindu åpner opp. Pass på at "Delt" er på. Trykk på "Lagre".
                  Deretter må du trykke på en knapp som heter "Kopier lenke". På
                  dette vinudet kan du kopiere lenken og dele den med andre.
                  Alle som har lenken kan spille - det behøves ingen konto.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <a className="text-center text-blue-600 hover:underline" href="/tips">
          Les om mer tips her
        </a>
      </div>
    </div>
  );
};

export default GetStartedTips;
