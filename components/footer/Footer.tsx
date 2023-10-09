import React from "react";
import Logo from "public/PictureboardAILogo.png";
import Image from "next/image";

import MobileFooter from "./MobileFooter";
import Link from "next/link";

function Footer() {
  const productLinks = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Blog", link: "/blog" },
  ].map((title) => (
    <li key={title.label}>
      <Link
        href={title.link}
        className="font-light text-base flex text-[#838992]"
      >
        {title.label}
      </Link>
    </li>
  ));
  const supportLinks = [
    { label: "Contact", link: "/contact" },
    { label: "FAQ", link: "/faq" },
  ].map((title) => (
    <li key={title.label}>
      <Link
        href={title.link}
        className="font-light text-base flex text-[#838992]"
      >
        {title.label}
      </Link>
    </li>
  ));
  const legalLinks = [
    { label: "Privacy Policy", link: "/legal/privacy" },
    { label: "Terms of Service", link: "/legal/terms" },
  
  ].map((title) => (
    <li key={title.label}>
      <Link
        href={title.link}
        className="font-light text-base flex text-[#838992]"
      >
        {title.label}
      </Link>
    </li>
  ));
  return (
    <footer>
      <div className="bg-white  md:pt-20 p-0 w-[100%]">
        <div className="bg-white hidden md:flex flex-row w-[100%] h-max flex-wrap gap-20 pb-8 md:px-20 ">
          <div className="flex flex-col  my-2">
            <div className="font-semibold text-lg">Product</div>
            <ul>{productLinks}</ul>
          </div>
          <div className="flex flex-col  my-2">
            <div className="font-semibold text-lg">Support</div>
            <ul>{supportLinks}</ul>
          </div>
          <div className="flex flex-col  my-2">
            <div className="font-semibold text-lg">Legal</div>
            <ul>{legalLinks}</ul>
          </div>
        </div>
        <div className="flex flex-row border-t-2 border-[#E7E9EC] md:mb-6 md:px-20 md:pt-5">
          <div className="flex flex-row align-middle mr-auto md:ml-0 ml-3.5 md:my-0 my-2.5">
            <Image
              className="object-contain w-10 h-14 sm:w-20 sm:h-20 "
              src={Logo}
              alt="PictureBoard.AI Logo"
            />
            <p className="hidden my-auto py-0 text-[#5E6672] text-base align-middle md:block">
              Copyright © 2023 PictureBoard.AI LLC. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="md:hidden">
          <MobileFooter />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
