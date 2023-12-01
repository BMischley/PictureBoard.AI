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
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase.config";
import { Input } from "@/components/ui/input";
import ErrorWarning from "@/public/error-warning-fill.svg";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import { useForm, Controller, useFieldArray, set } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter, usePathname, useParams } from "next/navigation";
import { auth } from "@/firebase.config";
const formSchema = z.object({
  // Define your form fields here based on the state you have in your current Home component
  prompts: z
    .array(z.array(z.string()))
    .nonempty("You need to have at least one prompt"),
  // Add other fields if necessary
});

function Info() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const { prompts, dispatch, info, style } = useSubmissionContext();
  const defaultValues = {
    prompts: [[""]],
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...prompts,
    },
  });

  const { control, handleSubmit, register, getValues, setValue } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "prompts",
  });

  const onSubmit = async () => {
    console.log("hi");
    await submitPost();
  };
  const queryClient = useQueryClient();

  const submitMutation = useMutation({
    mutationFn: async ({
      style,
      prompts,
      language,
      selfDescription,
      useSelfDescription,
    }: {
      style: { style: string; isBlackAndWhite: boolean };
      prompts: string[][];
      language: string;
      selfDescription: string;
      useSelfDescription: boolean;
    }) => {
      const generateImage = httpsCallable(functions, "generate_image");
      try {
        const result = await generateImage({
          prompts: prompts,
          style: style,
          language: language,
          selfDescription: selfDescription,
          useSelfDescription: useSelfDescription,
          uidAuth: auth.currentUser?.uid,
        });
        console.log("Results");
        console.log(result);
        return result.data as { uid: string };
      } catch (e) {
        console.error("Error during image generation:", e);
        // Handle the error appropriately
        // Maybe set some error state or return a specific error object
        return { error: e };
      }
    },
    onSuccess: (data) => {
      // Handle the success case
      console.log("Image generated successfully:", data);
    },
    onError: (error) => {
      // Handle the error case
      console.error("Error in mutation:", error);
    },
  });

  const submitPost = async () => {
    const formValues = getValues(); // This should give you the form state
    let copiedInfo = { ...info, style, ...formValues };

    // Check for empty values in the grid
    let found_empty = false
    const prompts = getValues("prompts");
    prompts.map((row)=>(
      row.map((val)=>{
        if(val === ''){
          found_empty = true;
        }
      })
    ))

    if (found_empty){
      alert("There are still empty prompts! Please enter a prompt into every grid input field.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await submitMutation.mutateAsync(copiedInfo);
      console.log(res);
      if ("error" in res) {
        console.log("Error", res.error);
      } else {
        router.push("/pictureboard/" + res.uid);
      }
    } catch (error) {
      console.error("Error during mutation:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleBack = () => {
    const bio = form.getValues("prompts");
    const formData = form.getValues();
    dispatch({ type: "SET_PROMPTS", payload: formData });
    router.push(`/pictureboard/create/info`);
  };

  const handleForward = () => {};
  useEffect(() => {
    dispatch({ type: "SET_COMPLETED", payload: "prompts" });
  }, []);

  const removeRow = (index: number) => {
    remove(index);
  };

  const addRow = () => {
    const currentMatrix = getValues("prompts");
    // The new row should have the same number of elements as the other rows
    const newRow = new Array(currentMatrix[0].length).fill("");
    setValue("prompts", [...currentMatrix, newRow]);
  };

  const addColumn = () => {
    const currentMatrix = getValues("prompts");
    // Add a new element to each row to create an additional column
    const newMatrix = currentMatrix.map((row) => [...row, ""]);
    setValue("prompts", newMatrix);
  };

  const removeColumn = (columnIndex: number) => {
    const currentMatrix = getValues("prompts");
    if (currentMatrix[0].length > 1) {
      // Prevent removing if only one column left
      const newMatrix = currentMatrix.map((row) =>
        row.filter((_, colIndex) => colIndex !== columnIndex)
      );
      setValue("prompts", newMatrix);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className="">
          <div className="w-fit mx-auto mt-24 mb-16">
            <span className="loading loading-dots mx-auto bg-tertiary-navy"></span>
          </div>
        </div>
      ) : (
        <div>
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="info"
              className="p-2 mt-6 mb-8"
            >
              {fields.map((row, rowIndex) => (
                <FormItem key={row.id}>
                  <div className="flex m-1">
                    {getValues(`prompts.${rowIndex}`).map(
                      (prompt, columnIndex) => (
                        <FormField
                          key={`${row.id}-${columnIndex}`}
                          control={control}
                          name={`prompts.${rowIndex}.${columnIndex}`}
                          render={({ field }) => (
                            <FormControl className="">
                              <Input
                                placeholder="prompt"
                                {...field}
                                type="text"
                                className="w-full max-w-xs text-xs"
                              />
                            </FormControl>
                          )}
                        />
                      )
                    )}
                    <button
                      type="button"
                      onClick={addColumn}
                      className="text-2xl"
                    >
                      +
                    </button>
                    {getValues(`prompts.${rowIndex}`).length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeColumn(
                            getValues(`prompts.${rowIndex}`).length - 1
                          )
                        }
                        className="text-2xl"
                      >
                        -
                      </button>
                    )}
                  </div>
                </FormItem>
              ))}
              <button
                type="button"
                onClick={addRow}
                className="text-2xl text-center"
              >
                +
              </button>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRow(fields.length - 1)}
                  className="text-2xl"
                >
                  -
                </button>
              )}
            </form>
          </Form>
          <NavWrapper>
            <NavButtons
              onClickBack={handleBack}
              onClickForward={handleForward}
              disabledBack={false}
              disabledForward={false}
              forwardText="Submit"
              forForward="info"
            />
          </NavWrapper>
        </div>
      )}
    </>
  );
}

export default Info;
