"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Smile } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1),
});

const ChatInput = ({ apiUrl, name, query, type }: ChatInputProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    onClick={() => {}}
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-background p-1 transition"
                  >
                    <Plus className="" />
                  </button>
                  <Input
                    disabled={isLoading}
                    placeholder={`Message ${
                      type === "conversation" ? name : "#" + name
                    }`}
                    className="border-0 border-none bg-muted px-14 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                  <div className="absolute right-8 top-7">
                    <Smile />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        ></FormField>
      </form>
    </Form>
  );
};

export default ChatInput;
