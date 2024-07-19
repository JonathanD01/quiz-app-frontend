import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";
import PhoneDisplay from "./PhoneDisplay";

const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col gap-y-40">
      <div className="bg-indigo-100">
        <div className="flex flex-col lg:flex-row gap-12 items-center py-8 max-w-[95%] lg:w-fit mx-auto">
          <div className="flex-1 lg:max-w-[800px] text-center lg:text-left">
            <span className="uppercase font-bold text-indigo-800">
              spill og lær
            </span>
            <h1 className="max-w-[750px] text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mx-auto lg:mx-0">
              Lag, del og administrer dine egne quizer med AI 🤖
            </h1>
            <p className="mt-6 text-lg leading-7 text-gray-800">
              Vår <span className="text-indigo-800 font-bold">quiz app</span>{" "}
              lar deg enkelt opprette, dele, administrere og delta i interaktive
              quizer. Perfekt for undervisning, opplæring eller moro.
            </p>
            <div className="flex gap-10 mt-6 justify-center items-center lg:justify-normal">
              {user ? (
                <a href="/logg-inn">
                  <button className="rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Gå til min side
                  </button>
                </a>
              ) : (
                <a href="/logg-inn">
                  <button className="justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Kom i gang
                  </button>
                </a>
              )}
              <a
                href="/tips"
                className="font-bold underline decoration-indigo-600 underline-offset-8 hover:opacity-80"
              >
                Les om tips
              </a>
            </div>
          </div>
          <div className="basis-auto">
            <PhoneDisplay
              title={" App screenshot"}
              url={"/images/app_preview.png"}
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="text-center">
            <span className="uppercase font-bold text-indigo-600">
              hvordan det fungerer
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Enkle steg for å lære mer
            </h2>
          </div>
          <div className="bg-indigo-200 xl:px-0 py-8 mt-8 max-w-[95%] xl:max-w-[90%] rounded-xl mx-auto xl:overflow-hidden">
            <div className="flex flex-col items-center xl:items-start xl:flex-row gap-10 justify-center max-w-[95%] xl:max-h-[500px] mx-auto">
              <div className="self-end xl:max-w-[650px] text-center xl:text-left">
                <span className="uppercase font-bold text-indigo-600">
                  spill og forbedre
                </span>
                <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit 🔥
                </h3>
                <p className="mt-6 text-lg leading-7 text-gray-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda earum numquam consequuntur aut optio. Consequuntur.
                </p>
              </div>
              <div>
                <PhoneDisplay url={"/images/create_quiz_preview.png"} />
              </div>
              <div>
                <PhoneDisplay url={"/images/edit_quiz_preview.png"} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-indigo-200 xl:px-0 py-8 mt-8 max-w-[95%] xl:max-w-[90%] rounded-xl mx-auto xl:overflow-hidden">
          <div className="flex flex-col items-center xl:items-start xl:flex-row gap-10 justify-center max-w-[95%] xl:max-h-[500px] mx-auto">
            <div className="flex-1 self-end xl:max-w-[650px] text-center xl:text-left">
              <span className="uppercase font-bold text-indigo-600">
                lær av resultater
              </span>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Lorem ipsum dolor sit amet consectetur 🤌
              </h3>
              <p className="mt-6 text-lg leading-7 text-gray-800">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
                corporis laboriosam ullam assumenda vel perferendis!
              </p>
            </div>
            <div className="basis-auto xl:-order-1">
              <PhoneDisplay url={"/images/quiz_attempt_preview.png"} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-indigo-200 xl:px-0 py-8 mt-8 max-w-[95%] xl:max-w-[50%] rounded-xl mx-auto text-center">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
            Hva venter du på?
          </h3>
          <p className="mt-6 text-lg leading-7 text-gray-800 max-w-[90%] mx-auto">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Doloremque, id adipisci quas assumenda quam molestias?
          </p>
          <div className="mt-2">
            {user ? (
              <a href="/logg-inn">
                <button className="rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Gå til min side
                </button>
              </a>
            ) : (
              <a href="/logg-inn">
                <button className="justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Kom i gang
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
