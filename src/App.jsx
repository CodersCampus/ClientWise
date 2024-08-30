import axios from "axios";
import { RoutesComponent } from "./RoutesComponent";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Account } from "./pages/Account";

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

  axios.defaults.baseURL = "http://localhost:8080";
  axios.defaults.withCredentials = true;
  return (

    <Router>

    <div className={`${isDarkTheme ? "bg-gray-800" : ""}`}>
      {/* <Routes /> */}

      <Routes>
              <Route path="/" element={<RoutesComponent />} />
              <Route path="/account" element={<Account />} />
     
      </Routes>


      
    </div>
    </Router>
  );
}

export default App;



// Keep those endpoints for production environment
// https://chatapp-production-8152.up.railway.app
// https://chat-api-spring-boot-production.up.railway.app