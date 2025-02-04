import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

const User = ({
  id,
  user,
  isOnline,
  handleSelectedUser,
  selectedUser,
  isSelected,
}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      key={id}
      className={`flex justify-between ${
        isDarkTheme ? "bg-gray-700" : "bg-white"
      } hover:opacity-40 items-center rounded-lg shadow-md border p-4 m-5 gap-4 cursor-pointer transition-transform duration-300 ${
        isSelected && selectedUser === user.id ? "scale-105 shadow-lg" : ""
      }`}
      onClick={() => handleSelectedUser(user.id)}
      style={{
        boxShadow:
          isSelected && selectedUser === user.id
            ? "inset 0 0 5px rgba(0, 0, 0, 0.5)"
            : "",
      }}
    >
      <p
        className={`${
          isSelected && selectedUser === user.id ? "font-bold" : ""
        }`}
      >
        {user.username}
      </p>
      <div
        className={`rounded-full bg-${
          isOnline ? "green-600" : "gray-500"
        } w-2 h-2`}
      />
    </div>
  );
};

export default User;
