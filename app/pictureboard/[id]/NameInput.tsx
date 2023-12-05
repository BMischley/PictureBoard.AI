"use client";
import React, { useState, useEffect } from "react";
import { renamePictureboard } from "@/utils/user/profileMethods";
// const imageURL = "https://tressays.files.wordpress.com/2015/09/test-clip-art-cpa-school-test.png"
// const testImages = [[imageURL, imageURL],[imageURL, imageURL]]

export default function Home({ id, name }: { id: string; name: string }) {
  const [newName, setNewName] = useState("");
  console.log(name)
  const handleInputChange = (event: any) => {
    setNewName(event.target.value);
  };

  const handleRenameClick = () => {
    renamePictureboard(id, newName);
  };

  return (
    <>
      <input
        className="text-3xl font-extrabold border-b-2 bg-gray-200 border-gray-300 focus:outline-none focus:border-tertiary-navy"
        placeholder={name}
        defaultValue={""}
        onChange={handleInputChange} // Set up the onChange handler here
        value={newName} // Control the input with the newName state
      />

      <button className="btn btn-sm ml-4" onClick={handleRenameClick}>
        Rename
      </button>
    </>
  );
}
