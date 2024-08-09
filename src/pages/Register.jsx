import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from 'jwt-decode'
const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");




  const [isRegisterOrLogin, setIsRegisterOrLogin] = useState("register");
  const { setUsername: setContextUsername, setId } = useContext(UserContext);
  const submitUserLogin = async (e) => {
    e.preventDefault();
    let url =
      isRegisterOrLogin === "register"
        ? `https://chat-api-spring-boot-production.up.railway.app/auth/signup`
        : "https://chat-api-spring-boot-production.up.railway.app/auth/signin";



        // If ;invalid return the result

        if (username === "" || password === "") return;
    const { data } = await axios.post(url, {
      username,
      password,
    });
    if (data) {
      console.log(data.jwt)
      try {
        const decodedToken = jwtDecode(data.jwt)
       

        const {exp} = decodedToken;


        if (exp <= Date.now()) {
          localStorage.setItem("isTokenExpired", false)
        } else {
          localStorage.setItem("isTokenExpired", true)

        }
      }catch(error) {
        console.error("Invaldi token", error)
      }
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("username", JSON.stringify(username));
      localStorage.setItem("id", JSON.stringify(data._id));
      setContextUsername(username);

      setId(data._id);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submitUserLogin}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        {isRegisterOrLogin === "register" ? (
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Register
          </h2>
        ) : (
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login</h2>
        )}

        <div className="mb-4">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-indigo-300"
            placeholder="Password"
          />
        </div>
        {isRegisterOrLogin === "login" ? (
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-md focus:outline-none"
            >
              Login
            </button>
            <p className="mt-4 text-gray-600 text-center">
              Not a user yet?{" "}
              <button
                type="submit"
                className="text-indigo-500 underline hover:text-indigo-600 focus:outline-none"
                onClick={() => setIsRegisterOrLogin("register")}
              >
                Register
              </button>
            </p>
          </div>
        ) : (
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white p-3 rounded-md focus:outline-none"
            >
              Register
            </button>
            <p className="mt-4 text-gray-600 text-center">
              Already a user?{" "}
              <button
                type="submit"
                className="text-indigo-500 underline hover:text-indigo-600 focus:outline-none"
                onClick={() => setIsRegisterOrLogin("login")}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
