import Submit from "@/components/pictureboard/Submit";
import Display from "@/components/pictureboard/Display";
import { useAuthStore } from "@/stores/AuthStore";
import { Sub } from "@radix-ui/react-navigation-menu";
import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase.config";
import { set } from "firebase/database";
import {
  getUserPictureboard,
  renamePictureboard,
} from "@/utils/user/profileMethods";
import NameInput from "./NameInput";
import Link from "next/link";

interface ImageResponse {
  url: string;
}

export default async function Home({ params }: { params: { id: string } }) {
  const pictureboard = await getUserPictureboard(params.id);

  return (
    <main className="flex flex-col items-center justify-center py-16 bg-gray-200">
      <div className="mb-12 flex items-center">
        <Link href="/pictureboard">
          <button className="mr-4">
            {/* Replace with your back arrow icon if available */}
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        </Link>
        <NameInput name={pictureboard.name} id={params.id} />
      </div>

      <div className="w-full max-w-4xl px-4 py-8 mx-auto bg-white rounded-lg shadow-md">
        <Display
          images={pictureboard.images}
          captions={pictureboard.prompts}
          id={params.id}
          name={pictureboard.name
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/&/g, "-and-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")}
        />
      </div>
    </main>
  );
}
