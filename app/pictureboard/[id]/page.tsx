import Submit from "@/components/pictureboard/Submit";
import Display from "@/components/pictureboard/Display";
import { useAuthStore } from "@/stores/AuthStore";
import { Sub } from "@radix-ui/react-navigation-menu";
import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase.config";
import { set } from "firebase/database";
import { getUserPictureboard } from "@/utils/user/profileMethods";

interface ImageResponse {
  url: string;
}

async function fetchImage(prompt: string): Promise<string | null> {
  console.log(prompt);
  const generateImage = httpsCallable(functions, "generate_image");

  try {
    const result = await generateImage({ prompt: prompt });
    const data = result.data as ImageResponse; // Type assertion here
    const url = data.url;
    console.log(url);
    return url;
  } catch (error) {
    console.error("Error calling generate_image:", error);
    return null;
  }
}

export default async function Home({ params }: { params: { id: string } }) {
  const pictureboard = await getUserPictureboard(params.id);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-200">
      <div className="-mt-56 mb-16">
        <>
          <h1 className=" text-3xl font-extrabold underline text-tertiary-navy decoration-seconday-blue">
            Done!
          </h1>
        </>
      </div>
      <div>
        <Display images={pictureboard.images} captions={pictureboard.prompts} id={params.id}/>
      </div>
    </main>
  );
}
