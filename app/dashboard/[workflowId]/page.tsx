"use client";
import React, { useCallback, useEffect, useState } from "react";
import { addEdge, Background, Connection, Controls, Edge, Node, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/lib/react-flow";
import { useParams } from "next/navigation";
import { fetcher } from "@/utils/api";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddNode from "@/components/add-node";
import { toast } from "sonner";

const WorkflowPage = () => {
  const { workflowId } = useParams();
  const { data, error, isLoading } = useSWR(workflowId ? `/api/dashboard/${workflowId}` : null, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 0, // No polling
  });
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [workflowName, setWorkflowName] = useState("");
  const [nodeDialog, setNodeDialog] = useState(false);

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
  useEffect(() => {
    if (data?.name) {
      setWorkflowName(data.name);
      setEdges(data.edges);
      setNodes(data.nodes);
    }
  }, [data]);

  useEffect(() => {
    setEdges([]);
    setNodes([]);
  }, []);

  console.log(data);
  const handleNodes = (node: Node) => {
    if (!nodes.find((n) => n.type === node.type)) setNodes((prevNodes) => [...prevNodes, node]);
  };
  const handleNodeDialog = (value: boolean) => {
    setNodeDialog(value);
  };
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
          <input value={workflowName} onChange={(e) => setWorkflowName(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {" "}
          <Button
            disabled={isSaveLoading}
            onClick={async () => {
              setIsSaveLoading((prev) => !prev);
              const workflow = await axios.patch("/api/dashboard", { workflowId, nodes, edges });
              if (workflow.data.name) {
                toast.success("Workflow saved.");
              }
              setIsSaveLoading((prev) => !prev);
            }}
          >
            {isSaveLoading ? "Saving..." : "Save"}
          </Button>
          <Dialog open={nodeDialog} onOpenChange={setNodeDialog}>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                onClick={() => {
                  console.log(edges, nodes);
                }}
              >
                Add
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Node</DialogTitle>
              </DialogHeader>
              <AddNode handleNodes={handleNodes} handleNodeDialog={handleNodeDialog} />
            </DialogContent>
          </Dialog>
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
