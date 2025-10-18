"use client";
import React, { useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import { List } from "@phosphor-icons/react/dist/ssr";
import HeaderLogo from "../HeaderLogo/HeaderLogo";
import NavLinks from "@/components/NavLinks/NavLinks";
import Link from "next/link";
import { useAuth } from "@/context/user";

interface HeaderNavProps {
  position: "absolute" | "relative";
}

const HeaderNav = ({ position }: HeaderNavProps) => {
  const { user, token } = useAuth();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showNav, setShowNav] = useState(false);

  return (
    <header
      id="header-container"
      className={`md:w-[750px] lg:w-[970px] xl:w-[1170px] mx-auto px-4 flex items-center justify-between z-50 py-2.5 ${
        position === "absolute"
          ? "lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          : ""
      }`}
    >
      <HeaderLogo position={position} />

      <NavLinks showNav={showNav} setShowNav={setShowNav} position={position} />

      {token ? (
        <UserMenu
          user={user}
          showUserDetails={showUserDetails}
          setShowUserDetails={setShowUserDetails}
        />
      ) : (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="py-2 px-4 lg:text-white hover:text-black hover:bg-gray-50 max-sm:py-1 max-sm:px-1"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="py-2 px-4 bg-[#FFA41F] hover:bg-[#FFAF1F] rounded text-white font-bold max-sm:py-1 max-sm:px-1"
          >
            Get started
          </Link>
        </div>
      )}

      <List
        size={26}
        onClick={() => setShowNav(!showNav)}
        className="cursor-pointer lg:hidden"
      />
    </header>
  );
};

export default HeaderNav;
