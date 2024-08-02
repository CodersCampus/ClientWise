import { IoIosSend } from "react-icons/io";

export const FormComponent = ({
  handleSubmit,
  message,
  setMessage,
  selectedUser,
  isDarkTheme,
}) => {
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          placeholder="Enter your message here..."
          className={`flex-grow py-2 px-4 border rounded-full focus:outline-none focus:ring focus:border-indigo-300 ${
            isDarkTheme ? "bg-[#3B3C36] text-white" : ``
          }`}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!selectedUser}
        />
        <button
          className="rounded-full bg-blue-500 text-white p-2"
          type="submit"
          disabled={!selectedUser}
        >
          <IoIosSend size={25} />
        </button>
      </div>
    </form>
  );
};
