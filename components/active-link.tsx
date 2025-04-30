"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ActiveLinkProps {
  href: string;
  icon: ReactNode;
  name: string;
}

export default function ActiveLink({ href, icon, name }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} passHref>
      <Button
        className={`w-full justify-start px-4 py-3 rounded-md transition-all ${
          isActive
            ? "bg-gray-100 font-medium"
            : "text-gray-600 hover:bg-gray-100"
        }`}
        variant="ghost"
      >
        <span className="flex items-center gap-3">
          <span>{icon}</span>
          {name}
        </span>
      </Button>
    </Link>
  );
}
