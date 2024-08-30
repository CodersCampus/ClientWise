import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Account = () => {

  const [username, setUsername] = useState("");
  const navigate = useNavigate();



  const handleReturnChat = () => navigate("/");

  useEffect(() => {
    const userInfo =  localStorage.getItem("userInformation");
    const parsedUser = JSON.parse(userInfo);
    const usernameFromLocalStorage = parsedUser.username;

    setUsername(usernameFromLocalStorage);
   
  }, [])

  return <>
    <div>Account Component</div>;

    <h1 className="text-lg font-bold text-center">{username}</h1>
    <button onClick={handleReturnChat}>Back to chat...</button>
    </>
};
