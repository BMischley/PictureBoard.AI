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
  id
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
  }, [ref])

  return (
    <>
      <div className="grid grid-flow-col-dense" ref={ref}>
        {images.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col">
            {row.map((col, colIndex) => (
              <GeneratedImage key={colIndex} image={col} caption={captions[rowIndex][colIndex]} id={id}/>
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
