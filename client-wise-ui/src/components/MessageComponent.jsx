export const MessageComponent = ({
  isDarkTheme,
  selectedUser,
  getTimeAndDate,
  incomingMessage,
  selectedUsername,
  id,
  username,
}) => {
  return (
    <div key={id}>
      {incomingMessage.message && (
        <div
          className={`flex  justify-between p-4 m-3 rounded-lg shadow-md ${
            incomingMessage.sender === selectedUser
              ? `${
                  isDarkTheme
                    ? "bg-[#3B3C36] text-white self-end"
                    : "bg-blue-100 text-blue-900 self-end"
                }`
              : `${
                  isDarkTheme
                    ? "bg-[#3B3C36] text-white"
                    : "bg-gray-100 text-gray-800"
                }`
          }`}
        >
          <div>
            <p className="text-sm font-semibold">
              {incomingMessage.sender === selectedUser
                ? selectedUsername
                : username}
            </p>
            <p className="text-base">{incomingMessage.message}</p>
          </div>
          <p className="text-xs italic">
            {getTimeAndDate(incomingMessage.createdAt)}
          </p>
        </div>
      )}
    </div>
  );
};
