import useFormInputs from "@/hooks/useFormInputs";
import useToastHandler from "@/hooks/useToastHandler";
import { authenticate } from "@/services/UserService";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { Spinner } from "./ui/spinner";

const Login = () => {
  const { inputs, handleChange } = useFormInputs();
  const { showErrorToast } = useToastHandler();
  const { token, user, login, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const result = await authenticate(inputs);
      if (result.status == 200 && result.data.response === "SUCCESS") {
        const newToken = result.data.result.token;
        login(newToken);
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
  }, [token]);

  return (
    <div className="flex min-h-[750px] flex-col bg-white">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Logg inn på din bruker
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
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logg inn {isLoading && <Spinner size={"small"} />}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Ikke medlem?{" "}
            <a
              href="/registrer-bruker"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Registrer deg
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
