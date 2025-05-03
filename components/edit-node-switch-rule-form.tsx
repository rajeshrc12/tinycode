import React from "react";
import { Credential } from "@prisma/client";
import { Button } from "./ui/button";

const EditNodeSwitchRuleForm = ({ credentials, workflowId }: { credentials: Credential[]; workflowId: string }) => {
  return (
    <div>
      {credentials.map((cred: Credential) => (
        <div key={cred.id}>{cred.name}</div>
      ))}
      <Button onClick={() => console.log(workflowId)}>Save</Button>
    </div>
  );
};

export default EditNodeSwitchRuleForm;
