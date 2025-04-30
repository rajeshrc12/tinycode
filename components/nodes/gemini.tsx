import { Handle, Position } from "@xyflow/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const Gemini = () => {
  return (
    <div className="w-[150px] flex items-center flex-col">
      <div className="shadow bg-white h-[100px] border rounded-full w-[100px] flex justify-center items-center">
        <FcGoogle size={40} />
        <Handle
          id="gemini-chat-model"
          type="target"
          position={Position.Top}
          style={{ height: 10, width: 10 }}
        />
      </div>
      <div className="flex justify-center">
        <div className="text-center font-medium">Google Gemini Chat Model</div>
      </div>
    </div>
  );
};

export default Gemini;
