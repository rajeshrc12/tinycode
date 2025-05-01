import React from "react";
interface CredentialFormProps {
  credential: string;
}
const CredentialForm = ({ credential }: CredentialFormProps) => {
  if (!credential) return <div>Loading...</div>;
  if (credential === "telegram") return <div>Telegram CredentialForm</div>;
  if (credential === "gmail") return <div>Gmail CredentialForm</div>;
};

export default CredentialForm;
