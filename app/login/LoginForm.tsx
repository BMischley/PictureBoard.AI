"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FacebookLogo from "@/public/icons/FacebookLogo.svg";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import * as z from "zod";
import { useAuth } from "@/components/auth/AuthProvider";
import { updateName } from "@/utils/user/profileMethods";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";

type inputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const searchParams = useSearchParams()!;
  useEffect(() => {
    if (searchParams) {
      let route = "/me";
      const media = searchParams.get("media");
      const type = searchParams.get("type");
      const college = searchParams.get("college");
      const redirect = searchParams.get("redirect");
      if (college && type === "profile") {
        route = "/" + college + "/profile/create/photos";
      } else if (college && type === "post") {
        route = "/" + college + "/" + media + "/create/photos";
      }
      if (redirect) route = redirect;
      sessionStorage.setItem("redirect", route);
      if (college) sessionStorage.setItem("incomingCollege", college!);
    }
  }, [searchParams]);
  const formSchema = z.object({
    email: z
      .string()
      .min(1, {
        message: "Please enter your email",
      })
      .max(50, {
        message: "Max length exceeded",
      }),
    password: z.string({
      required_error: "Please enter your password",
    }),
  });
  const form = useForm<inputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: inputs) => {
    const { email, password } = data;
  
    try {
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Now we have the user, let's update their profile
      const user = userCredential.user;
      console.log(user);
      router.push("/pictureboard");
    } catch (e: any) {
      console.log(e.code);
      if (e.code === "auth/user-not-found") {
        form.setError("email", {
          message: "User with this email doesn't exist",
        });
        return;
      } else if (e.code === "auth/invalid-email") {
        form.setError("email", {
          message: "Enter a vaild email",
        });
        return;
      } else if (e.code === "auth/wrong-password") {
        form.setError("password", {
          message: "Incorrect password",
        });
        return;
      } else {
        setError("Something went wrong, please try again later");
      }
    }
  };

  return (
    <div className="flex-grow">
      <div className="relative py-8 overflow-hidden md:bg-[#F5FFFD] bg-white md:py-24">
        <div className="bg-primary-teal rounded-full w-[450px] h-[450px] absolute bottom-[-225px] left-[-225px] md:block hidden"></div>
        <div className="bg-seconday-blue rounded-full w-[560px] h-[560px] absolute top-[-280px] right-[-280px] md:block hidden"></div>

        <div className="px-5 bg-white md:px-[106px] relative md:mx-auto md:w-[633px] md:rounded-3xl md:shadow-2xl flex flex-col">
          <h1 className="text-center text-[32px] text-black font-bold md:pt-[31px]">
            Hi, welcome back!
          </h1>

          <p className="text-center text-sm text-[#838992] mt-2">
            Welcome back, please enter your details
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="form-control w-full mt-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="w-full ">
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
              </div>

              <div className="form-control w-full mt-[25px]">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full ">
                      <FormLabel className="label font-bold">
                        <span className="label-required">Password</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
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
              </div>

              <div className="flex justify-between items-center mt-[30px]">
                <div className="form-control min-w-max">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm checkbox-primary"
                    />
                    <span className="label-text text-sm pl-2">Remember Me</span>
                  </label>
                </div>

                <div className="min-w-max">
                  <Link
                    href={"/login/recovery"}
                    className="text-primary-red text-sm underline"
                  >
                    Forgot password
                  </Link>
                </div>
              </div>

              <div className="flex justify-center mt-[50px]">
                <button className="btn bg-tertiary-navy h-[40px] w-[320px]">
                  Log in
                </button>
              </div>
            </form>
          </Form>

          <div className="flex w-full justify-center space-x-1 mt-[20px] mb-6">
            <div className="grid h-5 flex-grow-0 card rounded-box place-items-center text-color-[#00112B] text-sm">
              Not registered?
            </div>
            <Link
              href={"/signup"}
              className="grid h-5 flex-grow-0 card rounded-box place-items-center text-primary-red text-sm underline"
            >
              Create an account
            </Link>
          </div>

    
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
