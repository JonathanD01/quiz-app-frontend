import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

const Footer = () => {
  const { user } = useContext(AuthContext);
  return (
    <footer className="mt-14 pb-10">
      <nav className="grid grid-flow-row gap-10 md:grid-flow-col xl:auto-cols-max max-w-[90%] mx-auto bg-slate-100 rounded-2xl px-5 md:px-10 py-14">
        <div className="my-auto">
          <img className="h-14" src="/images/quiz-logo.png" />
          <p className="text-gray-900 md:max-w-[550px]">
            Demo prosjekt{" "}
            <a
              className="text-blue-500 hover:underline break-all"
              href="https://github.com/JonathanD01/"
            >
              https://github.com/JonathanD01/
            </a>
          </p>
        </div>
        {user && (
          <>
            <div className="flex flex-col gap-5 h-fit text-gray-900">
              <span className="font-bold text-black">Sider</span>
              <a href="/min-side">Min side</a>
              <a href="/mine-forsok">Mine forsøk</a>
            </div>
          </>
        )}

        <div className="flex flex-col gap-5 text-gray-900">
          <span className="font-bold text-black">Hjelp</span>
          <a href="/tips">Tips</a>
          {!user && (
            <>
              <a href="/logg-inn">Logg inn</a>
              <a href="/registrer-bruker">Registrer deg</a>
            </>
          )}
        </div>

        <div className="flex flex-col gap-5 text-gray-900">
          <span className="font-bold text-black">Status</span>
          <a href="/grafana">Grafana</a>
          <a href="/prometheus">Prometheus</a>
        </div>
      </nav>
      <div className="w-fit mx-auto mt-4">
        <span className="text-gray-600">
          &copy; {new Date().getFullYear()} Quiz App
        </span>
      </div>
    </footer>
  );
};

export default Footer;
