import { IoChatbubbles } from "react-icons/io5";
import React from "react";
import { Handle, Position } from "@xyflow/react";

const Chat = () => {
  return (
    <div className="w-[150px] flex items-center flex-col">
      <div className="bg-white h-[100px] border rounded-l-4xl w-[100px] flex justify-center items-center">
        <IoChatbubbles size={40} />
        <Handle
          type="source"
          position={Position.Right}
          style={{ right: "25px", top: "55px", height: 10, width: 10 }}
        />
      </div>
      <div className="flex justify-center">
        <div className="text-center font-medium">
          When chat message received
        </div>
      </div>
    </div>
  );
};

export default Chat;
