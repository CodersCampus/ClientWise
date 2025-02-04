import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { FcExpired } from "react-icons/fc";
import { IoIosSend, IoMdLogOut } from "react-icons/io";
import { IoCloudOfflineSharp } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineOnlinePrediction } from "react-icons/md";
import User from "./User";
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";
import { getTimeAndDate } from "./utils";
import { FormComponent } from "./components/FormComponent";
import { MessageComponent } from "./components/MessageComponent";
import Swal from "sweetalert2";
import { RiAccountCircleFill } from "react-icons/ri";
import { jwtDecode } from "jwt-decode";
import { Account } from "./pages/Account";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
export default function Chat() {
  const { setUsername, username, id } = useContext(UserContext);
  const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [webSocket, setWebSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const uniqueMessages = useMemo(() => {
    return [...new Set(messages.map(JSON.stringify))].map(JSON.parse);
  }, [messages]);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const isTokenExpired = JSON.parse(localStorage.getItem("isTokenExpired"));
    if (isTokenExpired) {
      showLogoutAlert();
    }
  }, []);

  const showLogoutAlert = () => {
    Swal.fire({
      title: "Your Token Has Expired, Would You Like To Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the log out operation
        handleLogOut();
      }
    });
  };

  useEffect(() => {
    if (selectedUser && selectedUser.trim() !== "") {
      initWebSocket();
    }
    return () => {
      if (webSocket) {
        webSocket.removeEventListener("message", handleMessage);
        webSocket.removeEventListener("close", handleWebSocketClose);
        webSocket.close();
      }
    };
  }, [selectedUser]);

  function handleWebSocketClose() {
    console.log("Connection lost");
    setIsConnected(false);
    setTimeout(() => {
      console.log("Connection is lost. Reconnecting..");
      initWebSocket();
    }, 1000);
  }

  function initWebSocket() {
    if (!webSocket) {
      console.log("Creating a new WebSocket connection...");
      const ws = new WebSocket(
        // "wss://chat-api-spring-boot-production.up.railway.app/websocket"
        
        "wss://localhost:8080/websocket"
      );
      setIsConnected(true);
      setWebSocket(ws);
      ws.addEventListener("message", handleMessage);
      ws.addEventListener("close", handleWebSocketClose);
    }
  }

  useEffect(() => {
    if (selectedUser) {
      setLoadingMessages(true);

      axios
        .get(
          // "https://chat-api-spring-boot-production.up.railway.app/messages/" +
          //   selectedUser

          "/messages/"+selectedUser
        )
        .then((res) => {
          const messagesFromDb = res.data;
          console.log(messagesFromDb);
          if (messagesFromDb) {
            setMessages(messagesFromDb);
            setLoadingMessages(false);
          }
        })
        .catch((err) => {
          setIsSessionExpired(true);
          console.log(err);
        });
    } else {
      console.log("No selected user");
    }
  }, [selectedUser]);

  useEffect(() => {
    axios.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleSelectedUser = (userId) => {
    const selectedUserN = users.filter((user) => user.id === userId)[0]
      ?.username;
    console.log(selectedUser);
    setSelectedUsername(selectedUserN);
    setIsSelected(true);
    setMessages([]);
    setSelectedUser(userId);
  };

  const handleMessage = (e) => {
    if (e.data) {
      JSON.parse(e.data);
      setMessages((prev) => [...prev, JSON.parse(e.data)]);
    }
    const uniqueId = crypto.randomUUID();
    const createdAt = new Date();
    const currentMessage = {
      message: message,
      uniqueId,
      sender: id,
      recipient: selectedUser,
      createdAt,
    };
    if (message !== "" && currentMessage.message !== "") {
      webSocket.send(JSON.stringify(currentMessage));
    }
    setMessage("");
  };

  const handleLogOut = (e) => {
    // e.preventDefault();
    axios
      .post(
        // "https://chat-api-spring-boot-production.up.railway.app/auth/logout"
        "localhost:8080/auth/logout"
      )
      .then((res) => {
        setUsername("");
      })
      .finally(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        // localStorage.removeItem("username");
        location.href = "/signin";
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleMessage(e);
  };

  const handleToggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleAccountComponent = () => navigate("/account");
  


  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div
        className={`flex flex-col items-center flex-shrink-0 ${
          isDarkTheme ? "bg-gray-800" : "bg-slate-50"
        } ${
          isDarkTheme ? "text-white" : "text-slate-800"
        } md:w-1/4 md:h-screen overflow-y-auto rounded-md shadow-lg`}
      >
        <div className="overflow-auto  w-full">
          {users &&
            users.map((user, id) => (
              <User
                user={user}
                users={users}
                id={id}
                key={id}
                isOnline={true}
                handleSelectedUser={handleSelectedUser}
                handleLogOut={handleLogOut}
                selectedUser={selectedUser}
                setIsSelected={setIsSelected}
                isSelected={isSelected}
              />
            ))}
        </div>
        <div className="flex flex-col justify-evenly gap-4 font-serif items-center font-semibold italic">
          {isSessionExpired && (
            <div className="flex items-center justify-around gap-4">
              <span>Session Expired</span>
              <span>{isSessionExpired && <FcExpired size={25} />}</span>
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <span>Connection</span>
            <span>
              {isConnected ? (
                <MdOutlineOnlinePrediction size={30} color="green" />
              ) : (
                <IoCloudOfflineSharp size={30} color="red" />
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-between gap-2 items-center p-4">
          <span className="text-xl">{username}</span>
          <button
            onClick={handleLogOut}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoMdLogOut
              size={25}
              color={`${isDarkTheme ? "white" : "black"}`}
            />
          </button>
          <button onClick={handleToggleTheme}>
            <MdOutlineDarkMode
              size={25}
              color={isDarkTheme ? "white" : "black"}
            />
          </button>
          <button onClick={handleAccountComponent}>
            <RiAccountCircleFill size={25} />
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col w-full md:w-3/4 ${
          isDarkTheme ? "bg-gray-800" : "bg-white-50"
        }`}
      >
        <div
          className={`overflow-scroll h-[85%] p-4 relative ${
            loadingMessages ? "opacity-50" : ""
          }`}
        >
          {!!selectedUser &&
            uniqueMessages?.map((incomingMessage, id) => (
              <MessageComponent
                isDarkTheme={isDarkTheme}
                selectedUser={selectedUser}
                getTimeAndDate={getTimeAndDate}
                incomingMessage={incomingMessage}
                selectedUsername={selectedUsername}
                id={id}
                username={username}
              />
            ))}
        </div>
        <FormComponent
          handleSubmit={handleSubmit}
          message={message}
          isDarkTheme={isDarkTheme}
          selectedUser={selectedUser}
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}
