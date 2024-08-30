import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { ThemeContext } from "./context/ThemeContext";

import Register from "./pages/Register";
import Chat from "./Chat";
import Logo from "./assets/coders-campus-logo.svg";

export const RoutesComponent = () => {
  const { username, token } = useContext(UserContext);
  const { isDarkTheme } = useContext(ThemeContext);

  console.log("Username from userContext: " + username);
  if (username || token) {
    return (
      <>
        <div className={`"p-4 w-36" ${isDarkTheme ? "bg-gray-800" : ``}`}>
          <img src={Logo} width={125} height={125} alt="" />
        </div>
        <Chat />;
      </>
    );
  }
  return <Register />;
};
