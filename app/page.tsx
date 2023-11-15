import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen bg-quaternary-grey">
      <section className="w-1/3 p-24 flex flex-col justify-center">
        <h1 className="text-5xl font-extrabold text-center leading-tight text-tertiary-navy">
          PictureBoard.AI
        </h1>
        <p className="mt-4 text-xl text-center">
          Easily create and export custom picture boards.
        </p>
        <Link href="/signup" passHref>
          <div className="mt-8 inline-block px-8 py-3 text-white bg-primary-teal rounded hover:bg-teal-500 transition duration-300 ease-in-out">
            Try PictureBoard.AI
          </div>
        </Link>
      </section>
      
      <section className="w-2/3 flex mt-10 justify-center">
        <div className="max-w-4xl mx-auto">
          <Image
            src="/example-placeholder.png" // Replace with your image path
            alt="Showcase"
            width={1000} // Adjust as needed
            height={900} // Adjust as needed
            className="rounded-lg"
          />
        </div>
      </section>

      </main>
  );
}

