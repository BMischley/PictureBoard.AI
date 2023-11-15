"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import GoogleLogo from "/public/GoogleLogo.svg";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as z from "zod";
import { updateName } from "@/utils/user/profileMethods";
import { updateUserProfileObj } from "@/utils/user/accountMethods";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import CircleBackground from "@/components/wrappers/CircleBackground";

type inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const formSchema = z.object({
  firstName: z
    .string({
      required_error: "Please enter your first name",
    })
    .min(2, {
      message: "Must be between 2 and 16 characters",
    })
    .max(16, {
      message: "Must be between 2 and 16 characters",
    })
    .trim(),
  lastName: z
    .string({
      required_error: "Please enter your last name",
    })
    .min(2, {
      message: "Must be between 2 and 16 characters",
    })
    .max(16, {
      message: "Must be between 2 and 16 characters",
    })
    .trim(),
  email: z
    .string()
    .min(1, {
      message: "Please enter your email",
    })
    .max(50, {
      message: "Max length exceeded",
    }),
  password: z
    .string({
      required_error: "Please enter your password",
    })
    .min(8, {
      message: "Must be at least 8 characters long",
    }),
  confirmPassword: z
    .string({
      required_error: "Please confirm your password",
    })
    .min(8, {
      message: "Must be at least 8 characters long",
    }),
});

export default function SignupForm() {
 

  const router = useRouter();
  const [error, setError] = useState<string>("");
  const form = useForm<inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { signUpWithEmail } = useAuth();

  const onSubmit = async (data: inputs) => {
    console.log("Submitting form with data:", data);
  
    if (data.confirmPassword !== data.password) {
      form.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }
  
    const { firstName, lastName, email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Successfully signed up with credentials:", userCredential);
      
      // Now we have the user, let's update their profile
      const user = userCredential.user;
      await updateUserProfileObj(user, { firstName, lastName });
      router.push("/signup/info");
    } catch (e: any) {
      console.error(e);
      if (e.code === "auth/email-already-in-use") {
        form.setError("email", {
          message: "Email already in use",
        });
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center w-full shadow-2xl rounded-xl mt-2">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full bg-white mx-auto px-6 rounded-xl"
        >
          <div className="flex flex-row gap-6 w-full mt-6">
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full ">
                    <FormLabel className="label font-bold">
                      <span className="label-required">First Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        type="text"
                        className="w-full "
                        error={!!form.formState.errors.firstName?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-1/2">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="label font-bold">
                      <span className="label-required">Last Name</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        type="text"
                        className="w-full "
                        error={!!form.formState.errors.lastName?.message}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormLabel className="label font-bold">
                  <span className="label-required">Email</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    type="text"
                    className="w-full "
                    error={!!form.formState.errors.email?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormLabel className="label font-bold">
                  <span className="label-required">Password</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    className="w-full "
                    error={!!form.formState.errors.password?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full mt-4">
                <FormLabel className="label font-bold">
                  <span>Confirm Password</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                    className="w-full "
                    error={!!form.formState.errors.confirmPassword?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
          <div className="flex justify-center pb-4">
            <button
              className="btn w-3/4 mx-auto mt-10 md:w-1/3 "
              disabled={false}
            >
              {false && (
                <span className="loading loading-spinner"></span>
              )}{" "}
              Sign Up
            </button>
          </div>

          <h2 className="text-center mt-6 block md:hidden">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-red underline">
              Login
            </Link>
          </h2>
          {error && <h2>{error}</h2>}
        </form>
      </Form>

      <div className="flex flex-row justify-center gap-1 md:hidden">
        <div className="block h-[1px] border border-[#E7E9EC] w-[30%] my-7"></div>
        <p className="block my-auto text-[#5E6672] text-sm">Or</p>
        <div className="block h-[1px] border border-[#E7E9EC] w-[30%] my-7"></div>
      </div>
     
      
    </div>
   
  );
}
