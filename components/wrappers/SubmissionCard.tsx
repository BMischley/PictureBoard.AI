import React from "react";
import { cn } from "@/lib/utils";
function SubmissionCard({
  children,
  classNameInner,
  classNameOuter,
}: {
  children: React.ReactNode;
  classNameInner?: string;
  classNameOuter?: string;
}) {
  return (
    <div className={cn(classNameOuter, "xl:py-8 py-0 ")}>
      <div
        className={cn(
          classNameInner,
          "transition-all md:shadow-xl shadow-none md:w-fit w-auto lg:px-16 relative md:pt-4 md:px-8 px-2 md:pb-4  mx-auto bg-white flex flex-col rounded-3xl md:border-[0.5px] border-neutral-300 "
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default SubmissionCard;
