"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";
import GeneratedImage from "./GeneratedImage";
import { useState } from "react";
import { useCallback, useRef } from "react";
import { toBlob } from "html-to-image";
import { toPng } from "html-to-image";
import FileSaver from "file-saver";
import { set } from "@firebase/database";

function NavElement({
  images,
  captions,
  id,
}: {
  images: string[][];
  captions: string[][];
  id: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [showRedo, setShowRedo] = useState(true);
  const exportPictureboard = () => {
    setShowRedo(false);

    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
        setShowRedo(true);

      })
      .catch((err) => {
        console.log(err);
      });

  };

  console.log(showRedo);
  const numCols = Math.min(images.length > 0 ? images[0].length : 0, 5);
  const colClass = `grid-cols-${numCols}`;

  console.log(colClass);
  return (
    <>
      <div ref={ref} className="mx-auto p-4 ">
        {images.map((row, rowIndex) => (
          // Each row is a div with grid and three columns
          <div
            key={rowIndex}
            className={`grid `}
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
            }}
          >
            {row.map((image, colIndex) => (
              // Each image is an individual grid item
              <div key={colIndex} className="grid-item w-fit mx-auto mt-6">
                <GeneratedImage
                  image={image}
                  caption={captions[rowIndex][colIndex]}
                  id={id}
                  showRedo={showRedo}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <button
          className="!h-10 !w-32 text-white bg-primary-teal rounded hover:bg-teal-500"
          onClick={exportPictureboard}
        >
          Export
        </button>
      </div>
    </>
  );
}

export default NavElement;
