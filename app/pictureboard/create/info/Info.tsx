"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import ErrorWarning from "@/public/error-warning-fill.svg";

import NavButtons from "@/components/submission/NavButtons";
import NavWrapper from "@/components/submission/NavWrapper";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSubmissionContext } from "@/components/submission/SubmissionContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
const formSchema = z.object({
  selfDescription: z.string().optional(),
  useSelfDescription: z.boolean().default(false),
  language: z.string().default("English"),
});

const languages = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "spanish",
    label: "Spanish",
  },
  {
    value: "french",
    label: "French",
  },
  {
    value: "german",
    label: "German",
  },
  {
    value: "chinese",
    label: "Chinese",
  },
];

function Info() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { info, dispatch } = useSubmissionContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...info,
    },
  });

  const onSubmit = (data: any) => {
    const json = JSON.stringify(data);
    localStorage.setItem("info", json);
    dispatch({ type: "SET_INFO", payload: data });
    dispatch({ type: "SET_COMPLETED", payload: "info" });

    router.push(`/pictureboard/create/prompts`);
  };
  const handleBack = () => {
    const bio = form.getValues("selfDescription");
    const formData = form.getValues();
    dispatch({ type: "SET_INFO", payload: formData });
    localStorage.setItem("selfDescription", bio || "");
    router.push(`/pictureboard/create/style`);
  };

  const handleForward = () => {};
  useEffect(() => {
    if (router) {
      router.prefetch(`/pictureboard/create/prompts`);
    }
    if (
      !form.getValues("selfDescription") &&
      localStorage.getItem("selfDescription")
    ) {
      form.setValue(
        "selfDescription",
        localStorage.getItem("selfDescription") || ""
      );
    }
  }, [router]);

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center md:items-start justify-start md:gap-6 gap-0
        md:justify-center md:flex-row flex-col w-full py-6 "
          id="info"
        >
          <div className="w-full max-w-xs mx-auto">
            <FormField
              control={form.control}
              name="selfDescription"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel className="label font-bold">
                    <span className="label-required">Bio</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your bio here"
                      {...field}
                      className="w-full max-w-xs h-40"
                      error={!!form.formState.errors.selfDescription?.message}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="w-full max-w-xs mx-auto ">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel className="label font-bold">
                    <span className="label-required">Language</span>
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger aria-label="Select a style">
                        <SelectValue placeholder="Select a style" />
                        
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((style) => (
                          <SelectItem
                            key={style.value}
                            value={style.value}
                            className="text-black"
                          >
                            {style.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="useSelfDescription"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel className="label gap-2 w-fit">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        {...form.register("useSelfDescription")}
                      />
                    </FormControl>

                    <span className="label-text">
                      Combine your info into the prompt
                    </span>
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <NavWrapper>
        <NavButtons
          onClickBack={handleBack}
          onClickForward={handleForward}
          disabledBack={false}
          forForward="info"
          // forBack="info"
          disabledForward={false}
        />
      </NavWrapper>
    </div>
  );
}

export default Info;
