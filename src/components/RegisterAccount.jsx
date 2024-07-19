import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFormInputs from "../hooks/useFormInputs";
import { register } from "../services/UserService";
import { Spinner } from "./ui/spinner";

const RegisterAccount = () => {
  const { inputs, handleChange } = useFormInputs();
  const { showSuccessToast, showErrorToast } = useToastHandler();
  const { isAuthenticated } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await register(inputs);
      if (result.status === 202) {
        navigate("/logg-inn");
        showSuccessToast(
          "Bruker opprettet",
          "Du kan nå logge inn med din nye bruker!"
        );
      }
    } catch (error) {
      showErrorToast(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/min-side");
    }
  }, []);

  return (
    <div className="flex min-h-[900px] flex-col bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrer en bruker
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Fornavn
              </label>
              <div className="mt-2">
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Etternavn
              </label>
              <div className="mt-2">
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Epost addresse
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Passord
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center items-center gap-3 rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Lag bruker {isLoading && <Spinner size={"small"} />}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Har du allerede en bruker?{" "}
            <a
              href="/logg-inn"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Logg inn
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterAccount;
