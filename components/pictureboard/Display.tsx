"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";
import GeneratedImage from "./GeneratedImage";

function NavElement({
  images,
  captions,
}: {
  images: string[][];
  captions: string[][];
}) {
  return (
    <>
      <div className="grid grid-flow-col-dense">
        {images.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col">
            {row.map((col, colIndex) => (
              <GeneratedImage key={colIndex} image={col} caption={captions[rowIndex][colIndex]}/>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default NavElement;
