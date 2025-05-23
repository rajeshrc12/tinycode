import { initialNodes } from "@/lib/react-flow";
import { Node } from "@xyflow/react";
import React from "react";
import { Button } from "./ui/button";

interface AddNodeProps {
  handleNodes: (node: Node) => void;
  handleNodeDialog: (value: boolean) => void;
}

const AddNode = ({ handleNodes, handleNodeDialog }: AddNodeProps) => {
  return (
    <div>
      {initialNodes.map((node: Node) => (
        <div key={node.id} className="flex justify-between items-center py-2">
          <div>{node.type}</div>
          <Button
            onClick={() => {
              handleNodes(node);
              handleNodeDialog(false);
            }}
          >
            Add
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AddNode;
