"use client";
import React, { useCallback, useState } from "react";
import { addEdge, Background, Connection, Controls, Edge, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { initialNodes, nodeTypes } from "@/lib/react-flow";
import { useParams } from "next/navigation";
import { fetcher } from "@/utils/api";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import axios from "axios";

const WorkflowPage = () => {
  const { workflowId } = useParams();
  const { data, error, isLoading } = useSWR(workflowId ? `/api/dashboard/${workflowId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [workflowName, setWorkflowName] = useState(data?.name);
  const onConnect = useCallback((connection: Connection) => {
    const edge: Edge = {
      ...connection,
      animated: true,
      id: `edge-${connection.source}-${connection.target}`,
      sourceHandle: connection.sourceHandle ?? null,
      targetHandle: connection.targetHandle ?? null,
    };
    setEdges((prevEdges) => addEdge(edge, prevEdges));
  }, []);

  if (!data || isLoading) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading workflow...</p>;
  }
  if (error) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Error while loading workflow...</p>;
  }
  return (
    <div className="w-full h-screen">
      <div className="h-[10%] bg-white border-b flex justify-between items-center px-5">
        <div>
          <input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            onBlur={async () => {
              await axios.put(`/api/dashboard/${workflowId}`, {
                name: workflowName,
              });
            }}
          />
        </div>
        <div className="flex gap-2">
          {" "}
          <Button
            onClick={() => {
              console.log(edges, nodes);
            }}
          >
            Save
          </Button>
          <Button
            variant={"outline"}
            onClick={() => {
              console.log(edges, nodes);
            }}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="h-[90%]">
        {" "}
        <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} nodeTypes={nodeTypes}>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};
export default WorkflowPage;
