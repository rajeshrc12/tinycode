import { Handle, Position } from "@xyflow/react";
import React from "react";
import { FaRobot } from "react-icons/fa";
const AIAgent = () => {
  return (
    <div className="bg-white w-[300px] h-[100px] border rounded-lg flex justify-center items-center">
      <div className="flex items-center gap-2">
        <FaRobot size={40} />
        <div className="font-medium">AI Agent</div>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={{ height: 10, width: 10 }}
      ></Handle>
    </div>
  );
};
export default AIAgent;
