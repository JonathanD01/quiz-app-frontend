import { AuthContext } from "@/context/AuthProvider";
import useToastHandler from "@/hooks/useToastHandler";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { token, logout } = useContext(AuthContext);
  const { showSuccessToast } = useToastHandler();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    showSuccessToast("Du er logget ut", "Du er ikke lenger innlogget");
    navigate("/logg-inn");
  }, [token]);
};

export default Logout;
