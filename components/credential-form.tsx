import React from "react";
import TelegramForm from "./telegram-form";
import GmailForm from "./gmail-form";
interface CredentialFormProps {
  credential: string;
  setCredentialFormModel: (value: boolean) => void;
  mutate: () => void;
}
const CredentialForm = ({ credential, setCredentialFormModel, mutate }: CredentialFormProps) => {
  if (!credential) return <div>Loading...</div>;
  if (credential === "telegram") return <TelegramForm setCredentialFormModel={setCredentialFormModel} mutate={mutate} />;
  if (credential === "gmail") return <GmailForm />;
};

export default CredentialForm;
