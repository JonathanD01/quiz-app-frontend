export const Page404 = () => {
  return (
    <div className="max-w-[90%] mx-auto py-40">
      <div className="w-fit mx-auto">
        <h1 className="text-lg md:text-6xl leading-8 font-semibold">
          Siden ble ikke funnet
        </h1>
        <p className="mt-3">
          Siden ble ikke funnet. Trykk{" "}
          <a className="font-bold" href="/min-side">
            her
          </a>{" "}
          for å gå tilbake.
        </p>
      </div>
    </div>
  );
};
