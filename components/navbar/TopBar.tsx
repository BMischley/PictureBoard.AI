"use client";
import Logo from "public/PictureboardAILogo.png";
import NavElement from "./NavElement";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@/firebase.config";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { User2Icon, UserCircle } from "lucide-react";

function ProfileMenu() {
  console.log(auth.currentUser);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pictureBoards, setPictureBoards] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex justify-between w-full !bg-white px-4 text-lg">
      <div className="flex">
        <NavElement paths={["/"]} className="py-4 my-auto px-6 text-black">
          <Link href="/">
            <Image
              className="object-contain w-16 h-12 "
              src={Logo}
              alt="PictureBoard.AI Logo"
            />
          </Link>
        </NavElement>
        <div className="flex gap-20">
          <NavElement
            paths={["/pictureboard"]}
            className="py-4 my-auto px-6 text-black"
          >
            <Link href="/pictureboard">Generate</Link>
          </NavElement>
          <NavElement
            paths={["/about"]}
            className="py-4 my-auto px-6 text-black"
          >
            <Link href="/about">About</Link>
          </NavElement>

          <NavElement
            paths={["/resources"]}
            className="py-4 my-auto px-6 text-black"
          >
            <Link href="/resources">Resources</Link>
          </NavElement>
        </div>
      </div>

      <div className="flex">
        {currentUser ? (
          <NavElement paths={["/profile"]} className="py-4 px-2">
            <Link href="/profile">
              {/* <button className="bg-primary-blue btn w-32 btn-md bg-primary-teal border-0 text-lg text-white rounded-full px-4 py-2">
                Profile
              </button> */}
              <UserCircle className="w-10 h-10" />
            </Link>
          </NavElement>
        ) : (
          <>
            <NavElement paths={["/login"]} className="py-4 px-2">
              <Link href="/login">
                <button className="bg-primary-blue btn w-32 btn-md !border-primary-teal border-1 text-lg bg-white text-primary-teal rounded-full px-4 py-2">
                  Log In
                </button>
              </Link>
            </NavElement>
            <NavElement paths={["/signup"]} className="py-4 px-2">
              <Link href="/signup">
                <button className="bg-primary-blue btn w-32 btn-md bg-primary-teal border-0 text-lg text-white rounded-full px-4 py-2">
                  Sign Up
                </button>
              </Link>
            </NavElement>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileMenu;
