"use client";
import Image from "next/image";
import SignUpForm from "@/app/signup/SignupPage";
import { auth } from "@/firebase.config";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const logout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="h-screen">
      <Link href="/signup/info">
        <button className="btn btn-lg bg-tertiary-navy">
          Edit Profile Info
        </button>
      </Link>
      <button onClick={logout} className="btn btn-lg bg-primary-teal">
        Logout
      </button>
    </div>
  );
}
