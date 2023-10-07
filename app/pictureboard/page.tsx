"use client";
import React, { useState, useEffect } from "react";
import Submit from "@/components/pictureboard/Submit";

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
  const setLoading = useAuthStore((state) => state.setLoading);
  const handleFetchImages = async () => {
    setLoading(true);

    // map over the matrix to create a 2D array of promises
    const imagePromises = matrix.map(
      (row) => Promise.all(row.map((item) => fetchImage(item))) // for each item in the row, call fetchImage
    );

    // wait for all promises to resolve

    Promise.all(imagePromises)
    .then((newImages) => {
      console.log(newImages); // log new images
      setImages(newImages); // set the images state
      setLoading(false); // turn off loading spinner
    })
    .catch((error) => {
      console.error(error); // log any error that occurred during the promises
      setLoading(false); // ensure loading spinner is turned off even if there's an error
    });

    setLoading(false);
  };

  useEffect(() => {
    console.log("Updated images state:", images);
  }, [images]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-gray-200">
      <div>
        <Submit matrix={matrix} setMatrix={setMatrix} />

        <div className="flex justify-center mt-8">
          <button
            className="px-4 py-2 text-white bg-primary-teal rounded hover:bg-teal-500"
            onClick={handleFetchImages}
          >
            Submit
          </button>
        </div>
        {images.map((row, rowIndex) => (
          <div key={rowIndex} className="image-row">
            {row.map((image, imageIndex) => (
              <img
                key={imageIndex}
                src={image}
                className="w-32 h-32 m-2"
                alt={`Image ${rowIndex}-${imageIndex}`}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
