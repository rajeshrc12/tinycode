import { Workflow as WorkflowType } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Workflow = (workflow: WorkflowType) => {
  return (
    <div className="bg-white border px-2 py-4 rounded-xl flex justify-between">
      <div className="flex flex-col">
        <span className="text-sm">{workflow.name}</span>
        <span className="text-xs text-muted-foreground">created at today</span>
      </div>
      <Link href={`/dashboard/${workflow.id}`}>
        <Button variant={"ghost"}>edit</Button>
      </Link>
    </div>
  );
};

export default Workflow;
