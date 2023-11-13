import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-quaternary-grey">
      <div className="flex flex-col items-center">  {/* Adjusted this line */}
        <h1 className="text-2xl font-extrabold text-center">You Need To Be Logged In To Access</h1>
        <p className="mt-2">To create custom picture boards, please log in or create an account</p>
        <Link href="/singup">
          <button className="px-4 py-2 text-white mx-auto mt-16 bg-primary-teal rounded hover:bg-teal-500">
            Signup
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 text-white mx-auto mt-16 bg-seconday-blue rounded hover:bg-blue-300">
           Login
          </button>
        </Link>
      </div>
    </main>
  );
}

