import Image from "next/image";
import Link from "next/link";
import { SkipBack } from "phosphor-react";
import React from "react";

const Header = () => {
  return (
    <div
      className="md:w-[750] lg:w-[970] xl:w-[1170] m-auto py-2.5 px-2.5"
      data-testid="header-container"
    >
      <div
        className="flex justify-between items-center"
        data-testid="header-content"
      >
        <Image
          src={"/img/logo.webp"}
          alt="logo"
          width={60}
          height={60}
          data-testid="header-logo"
        />
        <Link
          href={"/"}
          className="flex items-center gap-2.5"
          data-testid="header-go-back-link"
        >
          <SkipBack size={20} data-testid="header-go-back-icon" />
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default Header;
