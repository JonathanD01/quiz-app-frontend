import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { showCustomErrorToast } = useToastHandler();
  const { isAuthenticated } = useContext(AuthContext);
  const nagivate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      nagivate("/logg-inn");
      setTimeout(() => {
        showCustomErrorToast(
          "Ingen tilgang!",
          "Vennligst logg inn og prøv igjen."
        );
      }, 500);
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
