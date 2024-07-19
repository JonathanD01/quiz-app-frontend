import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TipsPage = () => {
  return (
    <>
      <div className="bg-indigo-100 py-16">
        <div className="flex flex-col gap-4 my-auto max-w-[90%] md:max-w-[60%] mx-auto">
          <span className="text-indigo-800 font-bold uppercase">
            ofte stilte spørsmål
          </span>
          <h1 className="text-xl md:text-4xl font-bold text-gray-900">
            Hjelpesenter
          </h1>
          <p className="text-gray-800">
            Alt innen hjelp & tips om vår quiz app slik at du kan enkelt komme i
            gang
          </p>
        </div>
      </div>
      <div className="max-w-[90%] mx-auto">
        <div className="flex gap-10 lg:flex-row mt-10">
          <div className="flex-none w-1/3">
            <div className="flex flex-col gap-4">
              <span className="text-indigo-800 font-bold uppercase">Hjelp</span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Ofte stitle spørsmål
              </h1>
              <p className="text-gray-800">
                Alt innen hjelp & tips om vår quiz app slik at du kan enkelt
                komme i gang
              </p>
            </div>
          </div>
          <div className="flex-1">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Hva bør være innholdet i tekstfilen være?
                </AccordionTrigger>
                <AccordionContent>
                  Du har to valg. Det første valget er å ta med informasjon,
                  også flere avsnitt, i tekstfilen. Da vil AI-en lage svar og
                  spørsmålene ut ifra det. Det andre valget er å sette inn flere
                  spørsmål i tekstfilen. Dette kan du enkelt gjøre ved å spørre
                  en AI om: "Gi meg 10 spørsmål om dyrelivet" og lime dem inn i
                  tekstfilen. Da vil AI-en lage spørsmål og svar ut ifra
                  spørsmålene i filen.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Vent 1 time og prøv igjen!</AccordionTrigger>
                <AccordionContent>
                  For å sikre at AI-en genererer relevante spørsmål, last opp
                  PDF-er med klart og konsist innhold. Dette hjelper AI-en med å
                  forstå og trekke ut de viktigste punktene.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Hvordan kan jeg dele en quiz med andre?
                </AccordionTrigger>
                <AccordionContent>
                  Trykk inn på quizen. Deretter trykk på "Rediger" slik at lite
                  vindu åpner opp. Pass på at "Delt" er på. Trykk på "Lagre".
                  Deretter må du trykke på en knapp som heter "Kopier lenke". På
                  dette vinudet kan du kopiere lenken og dele den med andre.
                  Alle som har lenken kan spille - det behøves ingen konto.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Kan jeg velge hvilke språk quizen blir laget i?
                </AccordionTrigger>
                <AccordionContent>
                  Ja. Når du trykker på "Ny quiz" knappen på "Min side" kan du
                  velge flere språk. Du kan velge mellom norsk, engelsk og
                  fransk. Mer kommer!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Kan jeg legge til mine egne spørsmål?
                </AccordionTrigger>
                <AccordionContent>
                  Ja det kan du. Gå til "Min side" og trykk på quizen du vil
                  legge spørsmålene til. Deretter trykker på "Legg til spørsmål"
                  på venstre side.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>
                  Kan jeg legge til svar alternativer?
                </AccordionTrigger>
                <AccordionContent>
                  Ja det kan du. Gå til "Min side" og trykk på quizen du vil
                  legge spørsmålene til. Deretter trykker på "Legg til svar
                  alternativ".
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default TipsPage;
