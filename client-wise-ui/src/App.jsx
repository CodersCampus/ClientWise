import axios from "axios";
import { Routes } from "./Routes";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

  axios.defaults.baseURL = "https://chat-api-spring-boot-production.up.railway.app";
  axios.defaults.withCredentials = true;
  return (
    <div className={`${isDarkTheme ? "bg-gray-800" : ""}`}>
      <Routes />
    </div>
  );
}

export default App;
