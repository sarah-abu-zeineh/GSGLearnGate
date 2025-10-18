import Image from "next/image";

interface HeaderLogoProps {
  position: "absolute" | "relative";
}

const HeaderLogo = ({ position }: HeaderLogoProps) => {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer max-sm:w-[120px]">
      <Image src="/img/logo.webp" alt="GSG logo" width={50} height={50} />
      <h1
        className={`font-bold max-sm:text-sm text-xl ${
          position === "absolute" ? "lg:text-white" : "lg:text-black"
        }`}
      >
        Gaza Sky Geeks
      </h1>
    </div>
  );
};

export default HeaderLogo;
