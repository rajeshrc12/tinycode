"use client";

import { Credential } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { Node } from "@xyflow/react";

interface EditNodeTelegramForm {
  credentials: Credential[];
  workflowId: string;
  nodes: Node[];
  handleModal: (value: boolean) => void;
}
const EditNodeTelegramForm = ({ credentials, workflowId, nodes, handleModal }: EditNodeTelegramForm) => {
  const [selectedCredentialId, setSelectedCredentialId] = useState<string>("");

  const handleSave = async () => {
    console.log("Saving credentialId:", selectedCredentialId);
    const workflow = await axios.patch("/api/dashboard/credential", {
      workflowId,
      nodeId: "telegram",
      credentialId: selectedCredentialId,
    });
    console.log(workflow);
    handleModal(false);
    // Implement save logic, e.g. call an API to update the node
  };
  useEffect(() => {
    const telegramNode = nodes.find((node: Node) => node.id === "telegram") as Node;
    const credId = telegramNode?.data?.credentialId as string;

    if (credId) {
      setSelectedCredentialId(credId);
    }
  }, [credentials, nodes]);

  return (
    <div className="space-y-4">
      <Select value={selectedCredentialId} onValueChange={setSelectedCredentialId}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a credential" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Credentials</SelectLabel>
            {credentials.map((cred) => (
              <SelectItem key={cred.id} value={cred.id}>
                {cred.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleSave} disabled={!selectedCredentialId}>
        Save
      </Button>
    </div>
  );
};

export default EditNodeTelegramForm;
