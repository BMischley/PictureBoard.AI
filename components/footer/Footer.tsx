import React from "react";
import Logo from "public/PictureboardAILogo.png";
import Image from "next/image";

function Footer() {
  return (
    <footer>
      <div className="bg-white py-6 md:py-10  w-[100%]">
          <div className="flex flex-row align-middle justify-center md:ml-0 ml-3.5 md:my-0 my-2.5">
            <Image
              className="object-contain w-10 h-14 sm:w-10 sm:h-10 "
              src={Logo}
              alt="PictureBoard.AI Logo"
            />
            <p className="my-auto py-0 text-[#5E6672] text-base align-middle md:block ml-2">
              Copyright © 2023 PictureBoard.AI LLC. All Rights Reserved.
            </p>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
