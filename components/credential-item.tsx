import { Credential as CredentialType } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";

import Link from "next/link";

const CredentialItem = (credential: CredentialType) => {
  return (
    <div className="bg-white border px-2 py-4 rounded-xl flex justify-between">
      <div className="flex flex-col">
        <span className="text-sm">{credential.name}</span>
        <span className="text-xs text-muted-foreground">created at today</span>
      </div>
      <Link href={`/dashboard/${credential.id}`}>
        <Button variant={"ghost"}>edit</Button>
      </Link>
    </div>
  );
};

export default CredentialItem;
