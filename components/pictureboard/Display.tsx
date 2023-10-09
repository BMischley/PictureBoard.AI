"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";

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
              <div key={colIndex} className="relative m-2 w-44 bg-white p-3 rounded-xl">
                <img
                  src={col}
                  className="w-32 h-32 m-2 rounded-lg mx-auto"
                  alt={`Image ${rowIndex}-${colIndex}`}
                />
                <p className="text-center text-lg font-bold break-words">{captions[rowIndex][colIndex]}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default NavElement;
