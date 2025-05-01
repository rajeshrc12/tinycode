import { FaTelegram } from "react-icons/fa";
import React from "react";
import { Handle, Position } from "@xyflow/react";
import withDeleteOnHover from "@/components/hoc/with-delete-onhover";

const Telegram = () => {
  return (
    <div className="w-[150px] flex items-center flex-col">
      <div className="shadow bg-white h-[100px] border rounded-l-4xl w-[100px] flex justify-center items-center">
        <FaTelegram color="#24A1DE" size={40} />
        <Handle id="chat" type="source" position={Position.Right} style={{ right: "25px", top: "55px", height: 10, width: 10 }} />
      </div>
      <div className="flex justify-center">
        <div className="text-center font-medium">When message received</div>
      </div>
    </div>
  );
};

export default withDeleteOnHover(Telegram);
