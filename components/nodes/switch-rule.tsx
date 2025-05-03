import React from "react";
import { Handle, Position } from "@xyflow/react";
import { BiSolidDirections } from "react-icons/bi";
import ActionButtonsWrapper from "@/components/hoc/action-button-wrapper";
const SwitchRule = () => {
  return (
    <div className="w-[150px] flex items-center flex-col">
      <div className="shadow bg-white h-[100px] border rounded w-[100px] flex justify-center items-center">
        <BiSolidDirections size={40} />
        <Handle id="switch-rule-input" type="target" position={Position.Left} style={{ top: "55px", left: "25px", height: 10, width: 10 }} />
        <Handle id="switch-rule-output" type="source" position={Position.Right} style={{ right: "25px", top: "55px", height: 10, width: 10 }} />
      </div>
      <div className="flex justify-center">
        <div className="text-center font-medium">Switch Rule</div>
      </div>
    </div>
  );
};

export default ActionButtonsWrapper(SwitchRule);
