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
import { getUserPictureboards } from "@/utils/user/accountMethods";
import { auth } from "@/firebase.config";
import { User } from "@firebase/auth";
// const imageURL = "https://tressays.files.wordpress.com/2015/09/test-clip-art-cpa-school-test.png"
// const testImages = [[imageURL, imageURL],[imageURL, imageURL]]

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
  const [img64Data, setImg64Data] = useState<any[][]>([[]]);

  const [pictureBoards, setPictureBoards] = useState([
    { name: "Dinosaurs", width: 5, height: 5 },
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

  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    console.log("Updated images state:", images);
    console.log("matrix state:", matrix);

    // Get images in base64 format to bypass CORS errors when exporting
    const data = { data: images };
    fetch("/api/convert/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setImg64Data(data.result));
  }, [images]);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

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
