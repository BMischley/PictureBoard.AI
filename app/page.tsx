import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-quaternary-grey">
      <div>
        <h1>Generate images from text prompts</h1>
        <Link href="/pictureboard">
          <button className="px-4 py-2 text-white bg-primary-teal rounded hover:bg-teal-500">
            Pictureboard
          </button>
        </Link>
      </div>
    </main>
  );
}
