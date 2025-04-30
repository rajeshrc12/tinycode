import Sidebar from "@/components/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="bg-gray-50 h-screen w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
