"use client";
import SignupForm from "./SignupForm";
import Link from "next/link";
import ReviewCard from "@/components/ReviewCard";
import {
  DotButton,
  useDotButton,
} from "@/components/carousel/EmblaCarouselDotButton";
import { useRouter, useSearchParams } from "next/navigation";
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";

import GoogleLogo from "/public/GoogleLogo.svg";

const reviews = [
  {
    header: '"Absolutely amazing!"',
    message:
      "PictureBoard is great! It let me express what I wanted to say in a way that was easy and fun!",
    name: "Blake Mischley",
    college: "Coder",
    photo: "/minimalistic-review.png",
  },
  {
    header: '"I love it!"',
    message:
      '"It customized the pictures to me! I could create my own style of images- a better representation of me!',
    name: "Aidan Tucker",
    college: "Coder",
    photo: "/realistic-review.png",
  },
];
import { useAuth } from "@/components/auth/AuthProvider";
import { updateName } from "@/utils/user/profileMethods";
import { useEffect, useState } from "react";
import CircleBackground from "@/components/wrappers/CircleBackground";
type options = EmblaOptionsType;

const options: EmblaOptionsType = { containScroll: "trimSnaps" };

export default function Signup() {
  //console.log(watch("example")); // watch input value by passing the name of it
  const [open, setOpen] = useState<boolean>(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const router = useRouter();
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const { signInWithGoogle } = useAuth();

  return (
    <CircleBackground size="full">
    <div className="flex pb-16  flex-row w-full">
      <div className="lg:mx-20 md:mx-8 mx-4 flex flex-col w-full md:w-1/2 ">
        <div className="w-fit mx-auto">
          <h1 className="font-bold text-3xl mt-7 md:mt-10 ">
            Create an account
          </h1>
          <h2 className="mt-6 md:block hidden font-normal ">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-red underline">
              Login
            </Link>
          </h2>
          <SignupForm />
          <div className="hidden md:flex flex-col">
          
          </div>
        </div>
      </div>
      <div className="md:block hidden w-1/2 ">
        <h2 className="text-4xl font-bold text-center mb-12 pt-32">
          What our users say about us
        </h2>
        <div className="overflow-hidden" ref={emblaRef}>
          <div
            style={{
              backfaceVisibility: "hidden",
              touchAction: "pan-y",
            }}
            className={`flex `}
          >
            {reviews.map((reviewProps, index) => {
              return (
                <div
                  className="overflow-hidden relative flex-[0_0_100%] py-6"
                  key={index}
                >
                  <ReviewCard {...reviewProps} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-row gap-4 w-fit mx-auto mt-4 items-center">
          {reviews.map((_, index) => {
            return (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={`rounded-full h-4 w-4 bg-neutral-600 inline-flex ${
                  index === selectedIndex ? "bg-neutral-700" : "opacity-50"
                } `}
              />
            );
          })}
        </div>
      </div>
    </div>
    </CircleBackground>
  );
}
