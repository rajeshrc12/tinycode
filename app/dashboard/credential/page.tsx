"use client";

import CredentialItem from "@/components/credential-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/api";
import { Credential as CredentialType } from "@prisma/client";
import React, { useState } from "react";
import useSWR from "swr";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CredentialForm from "@/components/credential-form";
import CredentialList from "@/components/credential-list";

const CredentialPage = () => {
  const [credentialModal, setCredentialModel] = useState(false);
  const [credential, setCredential] = useState("");
  const [credentialFormModal, setCredentialFormModel] = useState(false);
  // const [credentialForm, setCredentialForm] = useState(false);
  const { data, error, isLoading, mutate } = useSWR(`/api/dashboard/credential/`, fetcher, {
    refreshInterval: 0, // No polling
  });
  if (!data || isLoading) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Loading Credentials...</p>;
  }
  if (error) {
    return <p className="text-center text-gray-500 mt-10 text-lg">Error while loading workflow...</p>;
  }

  return (
    <div className="flex flex-col gap-5 py-5 px-15">
      <div className="flex justify-end">
        <Dialog open={credentialModal} onOpenChange={setCredentialModel}>
          <DialogTrigger asChild>
            <Button>Create Credential</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a new credential</DialogTitle>
            </DialogHeader>
            <CredentialList credential={credential} setCredential={setCredential} setCredentialModel={setCredentialModel} setCredentialFormModel={setCredentialFormModel} />
          </DialogContent>
        </Dialog>
        <Dialog open={credentialFormModal} onOpenChange={setCredentialFormModel}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add {credential} credential</DialogTitle>
            </DialogHeader>
            <CredentialForm credential={credential} setCredentialFormModel={setCredentialFormModel} mutate={mutate} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex justify-end">
        <Input placeholder="search workflows" className="bg-white w-[300px]" />
      </div>
      <div className="flex flex-col gap-2">
        {data?.credentials.map((credential: CredentialType) => (
          <CredentialItem key={credential.id} {...credential} />
        ))}
      </div>
    </div>
  );
};

export default CredentialPage;
