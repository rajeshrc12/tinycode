import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import axios from "axios";

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  botKey: z.string().min(1, "Bot key is required"),
  userId: z.string().min(1, "User ID is required"),
});

type FormData = z.infer<typeof formSchema>;
interface CredentialFormProps {
  setCredentialFormModel: (value: boolean) => void;
  mutate: () => void;
}
const TelegramForm = ({ setCredentialFormModel, mutate }: CredentialFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      botKey: "",
      userId: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Form submitted:", data);
    const credential = await axios.post("/api/dashboard/credential", {
      name: data.name,
      type: "telegram",
      apiKey: {
        botKey: data.botKey,
        userId: data.userId,
      },
    });
    setCredentialFormModel(false);
    mutate();
    console.log(credential);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="botKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bot Key</FormLabel>
              <FormControl>
                <Input placeholder="Enter bot key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter user ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="float-right" type="submit">
          Add
        </Button>
      </form>
    </Form>
  );
};

export default TelegramForm;
