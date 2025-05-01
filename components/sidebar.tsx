import React from "react";
import { Button } from "./ui/button";
import ActiveLink from "./active-link";
import { Settings, User } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      name: "Workflow",
      path: "/dashboard",
      icon: <Settings className="h-4 w-4" />,
    },
    {
      name: "Credentials",
      path: "/dashboard/credentials",
      icon: <User className="h-4 w-4" />,
    },
  ];
  return (
    <div className="w-[250px] border-r flex flex-col justify-between px-2">
      <div className="flex flex-col gap-10">
        <h1 className="font-bold text-2xl w-full text-center">Tinycode</h1>
        <div className="flex flex-col gap-5">
          {navItems.map((item) => (
            <ActiveLink
              key={item.path}
              href={item.path}
              icon={item.icon}
              name={item.name}
            />
          ))}
        </div>
      </div>
      <Button variant={"ghost"}>Logout</Button>
    </div>
  );
};
export default Sidebar;
