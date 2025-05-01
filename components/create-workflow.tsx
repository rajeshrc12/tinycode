"use client";
import React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateWorkflow = () => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        const workflow = await axios.post("/api/dashboard");
        router.push(`dashboard/${workflow.data.id}`);
      }}
    >
      Create Workflow
    </Button>
  );
};

export default CreateWorkflow;
