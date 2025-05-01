import React, { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
interface CredentialListProps {
  credential: string;
  setCredential: (credential: string) => void;
  setCredentialModel: (value: boolean) => void;
  setCredentialFormModel: (value: boolean) => void;
}
const credentialList = [
  {
    name: "Telegram",
    type: "telegram",
  },
  {
    name: "Gmail",
    type: "gmail",
  },
];
const CredentialList = ({ credential, setCredential, setCredentialModel, setCredentialFormModel }: CredentialListProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full flex flex-col gap-5">
            <h1>Select an app or service to connect to</h1>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
              {credential ? credentialList.find((cred) => cred.type === credential)?.name : "Select framework..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {credentialList.map((cred) => (
                  <CommandItem
                    key={cred.type}
                    value={cred.type}
                    onSelect={(currentValue) => {
                      console.log(currentValue);
                      setCredential(currentValue);
                      setOpen(false);
                    }}
                  >
                    {cred.name}
                    <Check className={cn("ml-auto", credential === cred.type ? "opacity-100" : "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setCredentialModel(false);
            setCredentialFormModel(true);
          }}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CredentialList;
