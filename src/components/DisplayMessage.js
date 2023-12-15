import React from "react";

const DisplayReceiver = [
  "col-start-1 col-end-8 p-3 rounded-lg",
  "flex flex-row items-center",
  "flex items-center justify-center text-white rounded-[5px] h-fit px-2 min-w-fit bg-indigo-500 flex-shrink-0",
  "relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl",
];
const DisplaySender = [
  "col-start-6 col-end-13 p-3 rounded-lg",
  "flex items-center justify-start flex-row-reverse",
  "flex items-center justify-center text-white rounded-[5px] h-fit px-2 min-w-fit bg-indigo-500 flex-shrink-0",
  "relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl",
];
function DisplayMessage({ sender, userName, message }) {
  return (
    <div className={sender ? DisplaySender[0] : DisplayReceiver[0]}>
      <div className={sender ? DisplaySender[1] : DisplayReceiver[1]}>
        <div className={sender ? DisplaySender[2] : DisplayReceiver[2]}>
          {userName}
        </div>
        <div className={sender ? DisplaySender[3] : DisplayReceiver[3]}>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayMessage;
