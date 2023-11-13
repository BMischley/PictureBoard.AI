"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";

import { useCallback, useRef } from "react";
import { toBlob } from "html-to-image";
import FileSaver from "file-saver";

function NavElement({
  images,
  captions,
}: {
  images: string[][];
  captions: string[][];
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
  }, [ref])

  return (
    <>
      <div className="grid grid-flow-col-dense" ref={ref}>
        {images.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col">
            {row.map((col, colIndex) => (
              <div key={colIndex} className="relative m-2 w-44 bg-white p-3 rounded-xl">
                <img
                  src={col}
                  className="w-32 h-32 m-2 rounded-lg mx-auto"
                  alt={`Image ${rowIndex}-${colIndex}`}
                  onError={(e) => e.currentTarget.src = 'path_to_default_image'}

                />
                <p className="text-center text-lg font-bold break-words">{captions[rowIndex][colIndex]}</p>
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
