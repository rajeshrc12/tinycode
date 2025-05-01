"use client";
import CreateWorkflow from "@/components/create-workflow";
import { Input } from "@/components/ui/input";
import Workflow from "@/components/workflow";
import { fetcher } from "@/utils/api";
import { Workflow as WorkflowType } from "@prisma/client";
import React from "react";
import useSWR from "swr";

const DashboardPage = () => {
  const { data, error, isLoading } = useSWR(`/api/dashboard/`, fetcher, {
    refreshInterval: 0, // No polling
  });
  if (!data?.workflows || isLoading) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading workflows...</p>;
  }
  if (error) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Error while loading workflow...</p>;
  }
  console.log(data);
  return (
    <div className="flex flex-col gap-5 py-5 px-15">
      <div className="flex justify-end">
        <CreateWorkflow />
      </div>
      <div className="flex justify-end">
        <Input placeholder="search workflows" className="bg-white w-[300px]" />
      </div>
      <div className="flex flex-col gap-2">
        {data?.workflows?.map((workflow: WorkflowType) => (
          <Workflow key={workflow.id} {...workflow} />
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
