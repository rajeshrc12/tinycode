import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Workflow from "@/components/workflow";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-5 py-5 px-15">
      <div className="flex justify-end">
        <Button>Create Workflow</Button>
      </div>
      <div className="flex justify-end">
        <Input placeholder="search workflows" className="bg-white w-[300px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Workflow />
      </div>
    </div>
  );
};

export default DashboardPage;
