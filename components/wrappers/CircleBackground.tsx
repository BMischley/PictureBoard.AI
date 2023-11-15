import { ReactNode } from "react";
interface CircleBackgroundProps {
  children: ReactNode;
  size?: "full" | "half";
}

function CircleBackground({ children, size }: CircleBackgroundProps) {
  return (
    <div className="relative md:min-h-full flex-grow w-full  bg-[#F5FFFD]">
      <div
        className={`absolute bottom-0 left-0 w-full ${
          size === "full" ? "h-full" : "h-1/2"
        }`}
      >
        <div className="relative h-full w-full overflow-hidden md:bg-mint">
        <div className="bg-primary-teal rounded-full w-[450px] h-[450px] absolute bottom-[-225px] left-[-225px] md:block hidden"></div>
        <div className="bg-seconday-blue rounded-full w-[560px] h-[560px] absolute top-[-280px] right-[-280px] md:block hidden"></div>
        </div>
      </div>

      <div className="relative md:pt-12 pb-16 h-full"> {children}</div>
    </div>
  );
}

export default CircleBackground;
