"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { useAuthStore } from "@/stores/AuthStore";
import PlusIcon from "@/components/misc/PlusIcon";
import MinusIcon from "@/components/misc/MinusIcon";

function NavElement({
  matrix,
  setMatrix,
}: {
  matrix: string[][];
  setMatrix: any;
}) {
  const loading = useAuthStore((state) => state.loading);

  const addColumn = () => {
    if (matrix[0].length < 5) {
      setMatrix(matrix.map((row) => [...row, ""]));
    }
  };

  const removeColumn = () => {
    if (matrix[0].length > 1) {
      setMatrix(matrix.map((row) => row.slice(0, -1)));
    }
  };

  const addRow = () => {
    if (matrix.length < 5) {
      setMatrix([...matrix, new Array(matrix[0].length).fill("")]);
    }
  };

  const removeRow = () => {
    if (matrix.length > 1) {
      setMatrix(matrix.slice(0, -1));
    }
  };

  const handleInputChange = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = value;
    setMatrix(newMatrix);
  };

  return (
    <>
      <div className="grid grid-flow-col-dense">
        {matrix.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-col">
            {row.map((col, colIndex) => (
              <div key={colIndex} className="relative m-2">
                <input
                  type="text"
                  value={col}
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
                  className="p-2 border-2 border-gray-300"
                />
              </div>
            ))}
          </div>
        ))}
        <div className="h-fit block my-auto">
          {matrix.length > 1 && (
            <button onClick={removeRow} className="self-center mt-2">
              <MinusIcon />
            </button>
          )}
          {matrix.length < 5 && (
            <button onClick={addRow} className="self-center mt-2">
              <PlusIcon />
            </button>
          )}
        </div>
      </div>
      <div className="w-fit mx-auto">
        {matrix[0]?.length > 1 && (
          <button onClick={removeColumn} className="self-center mt-2">
            <MinusIcon />
          </button>
        )}
        {matrix[0]?.length < 5 && (
          <button onClick={addColumn} className="self-center mt-2">
            <PlusIcon />
          </button>
        )}
      </div>
    </>
  );
}

export default NavElement;
