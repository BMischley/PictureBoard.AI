"use client";
import React, { useState, useEffect } from "react";
import RedoIcon from "@/components/misc/RedoIcon";
import { regenerateImage } from "../misc/helpers";

function GeneratedImage({
  image,
  caption,
  id,
}: {
  image: string;
  caption: string;
  id: string;
}) {
  const [imageData, setImageData] = useState(image);
  const [loading, setLoading] = useState(false);

  const handleRegenerate = async () => {
    setLoading(true);
    const newImageData = await regenerateImage({ prompt: caption, id: id });
    if (newImageData) {
      setImageData(newImageData);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="relative m-2 bg-white rounded-xl max-w-lg max-h-xl mx-auto">
        {loading ? (
          <span className="loading loading-dots mx-auto bg-tertiary-navy"></span>
        ) : (
          <>
            <div className="absolute -top-5 -left-5 z-10">
              <button
                onClick={handleRegenerate}
                title="Regenerate Image"
                className="p-1 bg-white rounded-full shadow-lg"
              >
                <RedoIcon />
              </button>
            </div>
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={imageData}
                className="object-cover w-full h-full"
                alt={`Image`}
              />
            </div>
            <p className="p-2 text-center text-sm font-medium text-black">
              {caption}
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default GeneratedImage;
