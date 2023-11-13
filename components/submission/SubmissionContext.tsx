"use client";
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { StepProps } from "@/types/SubmissionProps";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import {  getUserProfile } from "@/utils/user/profileMethods";
import { useAuthStore } from "@/stores/AuthStore";
import { User } from "firebase/auth";
import { auth } from "@/firebase.config";

const defaultValues = {
  style: {
    style: "",
    isBlackAndWhite: false,
  },
  info: {
    language: "English",
    selfDescription: "",
    useSelfDescription: true,
  },
  prompts: { prompts: [[]] },

  steps: [
    { name: "style", active: false, completed: false },
    { name: "info", active: false, completed: false },
    { name: "prompts", active: false, completed: false },
  ],
  dispatch: () => {},
};

interface SubmissionContextProps {
  style: {
    style: string;
    isBlackAndWhite: boolean;
  };
  info: {
    language: string;
    selfDescription: string;
    useSelfDescription: boolean;
  };
  prompts: { prompts: string[][] };

  steps: StepProps[];
  dispatch: React.Dispatch<{
    type: string;
    payload: any;
  }>;
}

const SubmissionContext = createContext<SubmissionContextProps>(defaultValues);

export const useSubmissionContext = () => useContext(SubmissionContext);

const reducer = (
  state: SubmissionContextProps,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case "SET_INFO":
      return { ...state, info: { ...state.info, ...action.payload } };
    case "SET_ACTIVE":
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.name === action.payload) {
            return { ...step, active: true };
          } else {
            return { ...step, active: false };
          }
        }),
      };
    case "SET_STYLE":
      return { ...state, style: { ...state.style, ...action.payload } };
    case "SET_PROMPTS":
      return { ...state, prompts: { ...state.prompts, ...action.payload } };
    case "SET_COMPLETED":
      return {
        ...state,
        steps: state.steps.map((step) => {
          if (step.name === action.payload) {
            console.log(action.payload, { ...step, completed: true })
            return { ...step, completed: true };
          } else {
            return step;
          }
        }),
      };
    default:
      return state;
  }
};

export const SubmissionContextProvider = ({
  children,
  params,

}: {
  children: React.ReactNode;
  params: any;

}) => {
  const [state, dispatch] = useReducer(reducer, defaultValues);
  const user = useAuthStore((state) => state.user);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);


  const userInfo = useQuery({
    queryKey: ["users", user?.uid!],
    queryFn: () => getUserProfile(user?.uid!),
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    console.log(userInfo.data)
    if (userInfo.data) {
      dispatch({
        type: "SET_INFO",
        payload: {
          selfDescription: userInfo.data.selfDescription || "",
          language: userInfo.data.language || "English",
        },
      });
    }
  }, [userInfo.data]);
  
  

  const pathname = usePathname();


  useEffect(() => {
    if (pathname) {
      const step = pathname?.split("/")?.at(-1);
      console.log(step)
      dispatch({ type: "SET_ACTIVE", payload: step });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      console.log(state.steps)
    }
  }, [pathname]);

 
  useEffect(() => {
    sessionStorage.removeItem("redirect");
  }, []);
  useEffect(() => {
    console.log("here");
    if (!params?.type) return;
    
  }, [params?.type]);
  return (
    <SubmissionContext.Provider
      value={{
        style: state.style,
        info: state.info,
        dispatch,
        prompts: state.prompts,
        steps: state.steps,
      }}
    >
      {children}
    </SubmissionContext.Provider>
  );
};
