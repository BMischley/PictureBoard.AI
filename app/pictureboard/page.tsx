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
import Link from "next/link";

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
  const [pictureBoards, setPictureBoards] = useState([
    { name: "test", width: 10, height: 10 },
  ]);
  const tableStyles = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    transition: "0.3s",
    minHeight: "200px",
    borderRadius: "5px",
  };

  const thStyles = {
    borderBottom: "1px solid #f1f1f1",
    background: "#eaf5f3",
    color: "#333",
    fontWeight: "600",
    padding: "10px 15px",
  };

  const rowStyles: React.CSSProperties = {
    position: "relative",
    transition: "background-color 0.3s ease",
    cursor: "pointer",
  };

  const viewStyles: React.CSSProperties = {
    position: "absolute",
    right: "15px",
    opacity: 0,
    transition: "opacity 0.3s ease",
  };

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
    <>
      <section className="flex justify-between items-center p-6 bg-white shadow-md border-t-2">
        <h1 className="text-xl font-semibold text-gray-700">
          Your Picture Boards
        </h1>
        <Link href="/pictureboard/create">
          <button className="bg-primary-teal hover:bg-teal-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            + Create Picture Board
          </button>
        </Link>
      </section>

      <div className="container mx-auto mt-6 min-h-screen">
        <div style={tableStyles} className="bg-white">
          <table className="min-w-full w-full bg-white">
            <thead>
              <tr>
                <th style={thStyles}>Name of the Board</th>
                <th style={thStyles}>Dimensions</th>
                <th style={thStyles}> </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pictureBoards.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    style={{
                      padding: "20px",
                      textAlign: "center",
                      color: "#999",
                    }}
                    className="border-b-2"
                  >
                    No picture boards available.
                  </td>
                </tr>
              ) : (
                pictureBoards.map((board, index) => (
                  <tr key={index} className="tableRow" style={rowStyles}>
                    <td className=" px-4 py-3 text-center font-semibold">
                      {board.name}
                    </td>
                    <td className=" px-4 py-3 text-center ">{`${board.width} x ${board.height}`}</td>
                    <td className=" px-4 py-3 cellWithView text-center">
                      <span className="viewLink text-center mr-6 font-bold">
                        View →
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
