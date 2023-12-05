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
    <div className="h-screen flex items-center justify-center bg-gray-100">
      {/* Profile card */}
      <div className="bg-white shadow-xl rounded-lg p-6 w-96">
        {/* User info */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-semibold text-gray-900">
            Profile
          </h1>
          <p className="text-gray-600">{auth.currentUser?.email}</p>
          <p className="text-gray-600">
          {auth.currentUser?.displayName}
          </p>
         
        </div>

        {/* Action buttons */}
        <div className="flex justify-center mt-6 space-x-4">
            <Link href="/signup/info">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300">
            Edit Profile Info
          </button>
            </Link>
          
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
