import React, { useState, useEffect } from "react";
import Connector from "../signalRConnection";
import Modal from "../components/Modal";
import NavChat from "../components/NavChat";
import DisplayMessage from "../components/DisplayMessage";

const ChatApp = () => {
  const [clientMessage, setClientMessage] = useState([
    <DisplayMessage
      sender={false}
      userName={"Lê văn thuận"}
      message={"bạn có định mua ti vi không ?"}
    />,
    <DisplayMessage
      sender={true}
      userName={"Lê văn thuận"}
      message={"bạn có định mua ti vi không ?"}
    />,
  ]);
  const [CurentIdConnection, setCurrentIdConnection] = useState("");
  const [typingclientMessage, typingsetClientMessage] = useState("");
  const [clientName, setClientName] = useState("");
  const [showModal, setShowModal] = useState(true);

  const [userActives, setUserActives] = useState([]);

  const [dataInput, setDataInput] = useState("");

  const hubConnection = Connector.connection;
  useEffect(() => {
    hubConnection.on("ReceiveMessage", (user, message) => {
      setClientMessage([
        ...clientMessage,
        <DisplayMessage
          sender={user === clientName ? false : true}
          userName={user}
          message={message}
        />,
      ]);
    });
    hubConnection.on("ConnectionId", (connectionId) => {
      setCurrentIdConnection(connectionId);
    });
    hubConnection.on("UserIsTyping", (user) => {
      typingsetClientMessage(user);
    });
    hubConnection.on("CLoseTyping", () => {
      typingsetClientMessage("");
    });
    hubConnection.on("ReceiveConnections", (users) => {
      setUserActives(users);
    });
  });
  console.log(userActives);
  const sendMessage = () => {
    if (!clientName || !dataInput) {
      return;
    }
    Connector.sendMessage(clientName, dataInput);
    Connector.userCLoseTyping();
    typingsetClientMessage("");
    setDataInput("");
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      Connector.sendMessage(clientName, event.target.value);
      event.target.value = "";
      setDataInput("");
      Connector.userCLoseTyping();
    } else {
      Connector.userIsTyping(clientName);
    }
  };
  const getConnections = () => {
    Connector.getConnect(clientName);
  };
  return (
    <>
      {/* component */}

      <div className="flex h-screen antialiased text-gray-800">
        {showModal && (
          <>
            {/* Modal */}
            <Modal
              clientName={clientName}
              getConnections={getConnections}
              setClientName={setClientName}
              content={"Nhập vào tên của bạn"}
              subContent={"bạn cần nhập tên mới có thể vào phòng chat"}
              setShowModal={setShowModal}
            />
          </>
        )}

        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <NavChat
            userName={clientName}
            CurentIdConnection={CurentIdConnection}
            userActives={userActives}></NavChat>
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {clientMessage &&
                      clientMessage.map((item, index) => {
                        return item;
                      })}
                  </div>
                </div>
              </div>
              {typingclientMessage && typingclientMessage !== clientName && (
                <p className="p-3">
                  {" "}
                  {typingclientMessage} {" đang nhắn"}
                </p>
              )}
              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div>
                  <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      onKeyPress={handleKeyPress}
                      value={dataInput}
                      onChange={(x) => {
                        setDataInput(x.target.value);
                      }}
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={sendMessage}
                    className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
