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
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
const formSchema = z.object({
  style: z.string({
    required_error: "Please select your graduation year",
  }),
  isBlackAndWhite: z.boolean().default(false),
});

const styles = [
  {
    value: "minimalistic",
    label: "Minimalistic",
    imgSrc: "/minimalistic-example-output.png",
  },
  { value: "cartoon", label: "Cartoon", imgSrc: "/cartoon-example-dinasour-output.png" },
  {
    value: "realitsic",
    label: "Realistic",
    imgSrc: "/hyperrealistic-example-output.png",
  },
];

function Info() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const { style, dispatch } = useSubmissionContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...style,
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    const json = JSON.stringify(data);
    localStorage.setItem("info", json);
    dispatch({ type: "SET_STYLE", payload: data });
    dispatch({ type: "SET_COMPLETED", payload: "style" });

    router.push(`/pictureboard/create/info`);
  };
  const handleBack = () => {
    router.back();
  };

  const handleForward = () => {};
  useEffect(() => {
    if (router) {
      router.prefetch(`/pictureboard/create/info`);
    }
   
  }, [router]);

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center md:items-start justify-start md:gap-6 gap-0
        md:justify-center  flex-col w-full py-6 "
          id="info"
        >
          <div className="w-full max-w-xs mx-auto">
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel className="label font-bold">
                    <span className="label-required">Style</span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-around">
                      {styles.map((style, index) => (
                        <div
                          key={style.value}
                          className="flex flex-col items-center cursor-pointer rounded-xl "
                        >
                          <input
                            type="radio"
                            id={`style-option-${index}`} // Unique ID for each button
                            className="sr-only"
                            {...field}
                            value={style.value}
                            checked={field.value === style.value}
                            onChange={() => form.setValue("style", style.value)}
                          />
                          <label
                            htmlFor={`style-option-${index}`}
                            className="p-2 glow rounded-xl"
                          >
                            {" "}
                            {/* Use htmlFor with the ID */}
                            <img
                              src={style.imgSrc}
                              alt={style.label}
                              style={{ width: "100px", height: "100px" }}
                            />
                            <div className="text-center mt-2">
                              {style.label}
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
              
            />
                      <p className="text-xs !text-gray-500 text-center mt-1">"Dancing Dinosaurs"</p>

          </div>

          <div className="w-full max-w-xs mx-auto">
            <FormField
              control={form.control}
              name="isBlackAndWhite"
              render={({ field }) => (
                <FormItem className="w-full max-w-xs">
                  <FormLabel className="label gap-2 w-fit">
                    <FormControl>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary checkbox-sm"
                        {...form.register("isBlackAndWhite")}
                      />
                    </FormControl>

                    <span className="label-text">Black and White?</span>
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
