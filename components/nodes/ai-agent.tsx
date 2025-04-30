import { Handle, Position } from "@xyflow/react";
import React from "react";
import { FaRobot } from "react-icons/fa";
const AIAgent = () => {
  return (
    <div className="shadow bg-white w-[300px] h-[100px] border rounded-lg flex justify-center items-center">
      <div className="flex items-center gap-2">
        <FaRobot size={40} />
        <div className="font-medium">AI Agent</div>
      </div>
      <Handle
        id="ai-agent-message"
        type="target"
        position={Position.Left}
        style={{ height: 10, width: 10 }}
      />
      <Handle
        id="ai-agent-tool"
        type="source"
        position={Position.Bottom}
        style={{ height: 10, width: 10, marginLeft: "50px" }}
      >
        <div className="w-[100px] relative top-2 right-2 text-sm">Tool</div>
      </Handle>
      <Handle
        id="ai-agent-chat-model"
        type="source"
        position={Position.Bottom}
        style={{ height: 10, width: 10, marginLeft: "-50px" }}
      >
        <div className="w-[100px] relative top-2 right-10 text-sm">
          Chat Model
        </div>
      </Handle>
    </div>
  );
};
export default AIAgent;
