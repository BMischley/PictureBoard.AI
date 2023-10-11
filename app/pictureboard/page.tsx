"use client";
import React, { useState, useEffect } from "react";
import Submit from "@/components/pictureboard/Submit";
import Display from "@/components/pictureboard/Display";
import { useAuthStore } from "@/stores/AuthStore";
import { Sub } from "@radix-ui/react-navigation-menu";
import axios from "axios";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase.config";
import { set } from "firebase/database";

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

export default function Home() {
  const [matrix, setMatrix] = useState([[""]]);
  const [images, setImages] = useState<any[][]>([[]]);
  const [submitted, setSubmitted] = useState(false); // TODO: use this to show the images
  const [isCooking, setIsCooking] = useState(false); // TODO: use this to show the images
  const setLoading = useAuthStore((state) => state.setLoading);
  const handleFetchImages = async () => {
    setIsCooking(true);
    // map over the matrix to create a 2D array of promises
    const imagePromises = matrix.map(
      (row) => Promise.all(row.map((item) => fetchImage(item))) // for each item in the row, call fetchImage
    );

    // wait for all promises to resolve

    Promise.all(imagePromises)
      .then((newImages) => {
        console.log(newImages); // log new images
        setImages(newImages); // set the images state
        setIsCooking(false);
        setSubmitted(true);
      })
      .catch((error) => {
        console.error(error); // log any error that occurred during the promises
        setIsCooking(false); // ensure loading spinner is turned off even if there's an error
      });
  };

  useEffect(() => {
    console.log("Updated images state:", images);
  }, [images]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-200">
      <div className="-mt-56 mb-16">
        {submitted ? (
          <>
            <h1 className=" text-3xl font-extrabold underline text-tertiary-navy decoration-seconday-blue">
              Done!
            </h1>
          </>
        ) : (
          <>
            <h1 className=" text-3xl font-extrabold underline text-tertiary-navy decoration-seconday-blue">
              Generate a Picture Board
            </h1>
            <div className="w-fit mx-auto mt-2">
              <p className="text-left text-sm ">
                1. Click the + icon to increase dimensions.
              </p>
              <p className="text-left text-sm">
                2. Click the - icon to reduce dimensions.
              </p>
              <p className="text-left text-sm">
                3. Type your desired image prompt in the input field.
              </p>
              <p className="text-left text-sm">4. Once ready, click submit!</p>
            </div>
          </>
        )}
      </div>
      <div>
        {submitted ? (
          <Display images={images} captions={matrix} />
        ) : (
          <Submit matrix={matrix} setMatrix={setMatrix} />
        )}

        <div className="flex justify-center mt-8">
          {submitted ? (
            <button
              className="!h-10 !w-32 text-white bg-primary-teal rounded hover:bg-teal-500"
              onClick={() => setSubmitted(false)}
            >
              Go Back
            </button>
          ) : (
            <button
              className="!h-10 !w-32 text-white bg-primary-teal rounded hover:bg-teal-500"
              onClick={handleFetchImages}
            >
              {isCooking ? (
                <span className="loading loading-dots  mx-auto  bg-tertiary-navy "></span>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
