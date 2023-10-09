import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-quaternary-grey">
      <div className="flex flex-col items-center">  {/* Adjusted this line */}
        <h1 className="text-2xl font-extrabold text-center">Generate images from text prompts</h1>
        <p className="mt-2">We are PictureBoard.AI! We leverage Generative AI to help create picture boards.</p>
        <Link href="/pictureboard">
          <button className="px-4 py-2 text-white mx-auto mt-16 bg-primary-teal rounded hover:bg-teal-500">
            Generate Picture Boards!
          </button>
        </Link>
      </div>
    </main>
  );
}

