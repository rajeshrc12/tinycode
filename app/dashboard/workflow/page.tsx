"use client";
import React, { useCallback } from "react";
import {
  addEdge,
  Background,
  Connection,
  Controls,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Chat from "@/components/nodes/chat";

import AIAgent from "@/components/nodes/ai-agent";
const nodeTypes = {
  chat: Chat,
  "ai-agent": AIAgent,
};
const initialNodes: Node[] = [
  { id: "1", position: { x: 100, y: 100 }, data: { label: "1" }, type: "chat" },
  {
    id: "2",
    position: { x: 100, y: 300 },
    data: { label: "2" },
    type: "ai-agent",
  },
];

const WorkflowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `e${edges.length + 1}`,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null,
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  }, []);
  return (
    <div className="w-full h-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default WorkflowPage;
