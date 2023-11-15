"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";
import GeneratedImage from "./GeneratedImage";

import { useCallback, useRef } from "react";
import { toBlob } from "html-to-image";
import FileSaver from "file-saver";

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

  const exportPictureboard = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toBlob(ref.current)
      .then(function (blob) {
        if (blob !== null) {
          FileSaver.saveAs(blob, "my-pictureboard.png");
        }
      })
      .catch((err) => {
        console.log("export error: ", err);
      });
  }, [ref]);
  console.log(images);
  const numCols = Math.min(images.length > 0 ? images[0].length : 0, 5);
  const colClass = `grid-cols-${numCols}`;
  const gridItemWidth = `w-full md:w-${Math.floor(12 / numCols)}/12`;
  console.log(colClass);
  return (
    <>
    <div ref={ref} className="mx-auto p-4">
        {images.map((row, rowIndex) => (
          // Each row is a div with grid and three columns
          <div key={rowIndex} className={`grid ${colClass} gap-4`}>
            {row.map((image, colIndex) => (
              // Each image is an individual grid item
              <div key={colIndex} className="grid-item">
                <GeneratedImage
                  image={image}
                  caption={captions[rowIndex][colIndex]}
                  id={id}
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
