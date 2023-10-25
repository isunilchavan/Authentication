import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../Store/AuthContext";

const AutoLogout = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    let timeout;

    const setupAutoLogout = () => {
      timeout = setTimeout(() => {
        authCtx.logout();
        // You can also redirect the user to the login page
        history.replace("/auth");
      }, 300000); // 5 minutes in milliseconds
    };

    const resetTimeout = () => {
      clearTimeout(timeout);
      setupAutoLogout();
    };

    setupAutoLogout();

    // Listen for user activity events (eg. mousemove or keydown)
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
    };
  }, [authCtx,history]);//you can keep this dependency or remove both should work fine

  return null;
};

export default AutoLogout;
