"use client";
import { useEffect, useState } from "react";

import TablePictureboards from "./TablePictureboards";
// const imageURL = "https://tressays.files.wordpress.com/2015/09/test-clip-art-cpa-school-test.png"
// const testImages = [[imageURL, imageURL],[imageURL, imageURL]]
import { getUserPictureboards } from "@/utils/user/accountMethods";
import { auth } from "@/firebase.config";
import { User } from "@firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { set } from "@firebase/database";

interface ImageResponse {
  url: string;
}

export default function Home() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();
  const [pictureboards, setPictureboards] = useState<any>([]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // user is of type User | null
      if (user) {
        console.log("Logged in user UID:", user.uid);
        // Fetch the pictureboards for the logged-in user
        getUserPictureboards(user.uid).then((pictureboards) => {
          setPictureboards(pictureboards);
          console.log("Pictureboards:", pictureboards);
        });
      } else {
        console.log("No user logged in.");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

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
                <th style={thStyles}> {" "}</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {pictureboards.length === 0 ? (
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
                pictureboards.map((board: any, index: any) => (
                  <tr key={index} className="tableRow" style={rowStyles} onClick={()=>router.push(`/pictureboard/${board.id}`)}>
                    <td className=" px-4 py-3 text-center font-semibold">
                      {board.name ? board.name : "Untitled Picture Board"}
                    </td>
                    <td className=" px-4 py-3 text-center ">{`${board.prompts.length} x ${board.prompts[0].length}`}</td>
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
