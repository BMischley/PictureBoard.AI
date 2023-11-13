"use client";
import { useAuthStore } from "@/stores/AuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase.config";
import { User } from "firebase/auth";
import CreateAccount from "./CreateAccount"

function AdminProtector({ children }: { children: React.ReactNode }) {
    // const [currentUser, setCurrentUser] = useState<User | null>(null);
    const user = useAuthStore((state) => state.user);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setCurrentUser(user);
//     });

//     return () => unsubscribe();
//   }, []);

  return (
    <>
      {!user ? (
        <>{children}</>
      )  : (
       <CreateAccount  />
      )}
    </>
  );
}

export default AdminProtector;
