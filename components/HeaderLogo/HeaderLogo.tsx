import Image from "next/image";

interface PositionProps {
  position: "absolute" | "relative" | string; // you can tighten the type if you only expect specific values
}

const HeaderLogo = ({ position }: PositionProps) => {
  return (
    <div className="flex items-center gap-2.5 cursor-pointer">
      <Image
        src="/img/logo.webp"
        alt="GSG logo"
        width={50}
        height={50}
        priority
      />
      <h1
        className={`text-xl font-bold ${
          position === "absolute" ? "lg:text-white" : "lg:text-black"
        }`}
      >
        Gaza Sky Geeks
      </h1>
    </div>
  );
};

export default HeaderLogo;
