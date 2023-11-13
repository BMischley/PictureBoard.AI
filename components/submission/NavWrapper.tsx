import { ReactNode } from "react";

function NavWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`md:mx-auto m-0 w-full md:max-w-xs md:static fixed mt-auto bottom-0 left-0 z-10 
    bg-white p-2 px-8 md:border-0 md:p-0 border-t border-base-300 ${className}}`}
    >
      {children}
    </div>
  );
}

export default NavWrapper;
