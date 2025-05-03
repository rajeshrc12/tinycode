"use client";
import { RootState } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { setId } from "@/store/slices/nodeSlice";
import useSWR from "swr";
import { fetcher } from "@/utils/api";
import EditNodeTelegramForm from "./edit-node-telegram-form";
import EditNodeGmailForm from "./edit-node-gmail-form";
import EditNodeSwitchRuleForm from "./edit-node-switch-rule-form";
import { Credential } from "@prisma/client";
import { Node } from "@xyflow/react";

const EditNodeForm = ({ workflowId, nodes, mutate }: { workflowId: string; nodes: Node[]; mutate: () => void }) => {
  const node = useSelector((state: RootState) => state.node);
  const dispatch = useDispatch();
  const handleModal = (value: boolean) => {
    dispatch(setId(value));
    mutate();
  };
  const { data, error, isLoading } = useSWR(node.id ? `/api/dashboard/credential/${node.id}` : null, fetcher, {
    refreshInterval: 0, // No polling
  });
  if (!data || isLoading) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading Credentials...</p>;
  }
  if (error) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Error while loading workflow...</p>;
  }
  return (
    <Dialog open={!!node.id} onOpenChange={handleModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Node</DialogTitle>
        </DialogHeader>
        {node.id === "telegram" && <EditNodeTelegramForm handleModal={handleModal} nodes={nodes} workflowId={workflowId} credentials={data.credentials as Credential[]} />}
        {node.id === "gmail" && <EditNodeGmailForm handleModal={handleModal} nodes={nodes} workflowId={workflowId} credentials={data.credentials as Credential[]} />}
        {node.id === "switch-rule" && <EditNodeSwitchRuleForm workflowId={workflowId} credentials={data.credentials as Credential[]} />}
      </DialogContent>
    </Dialog>
  );
};

export default EditNodeForm;
