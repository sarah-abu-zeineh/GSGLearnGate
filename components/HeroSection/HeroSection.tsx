import Image from "next/image";

export default function HeroSection() {
  return (
    <div
      data-testid="hero-section"
      className="relative w-full h-screen flex items-center justify-center text-white"
    >
      {/* خلفية الصورة */}
      <Image
        data-testid="hero-background"
        src="/img/hero-background.png"
        alt="Hero Section"
        layout="fill"
        objectFit="cover"
        className="absolute top-0 left-0 w-full h-full"
      />

      {/* الطبقة الشفافة */}
      <div data-testid="hero-overlay" className="absolute inset-0 bg-[rgba(0,0,0,.7)]"></div>

      {/* المحتوى فوق الصورة */}
      <div data-testid="hero-content" className="relative z-10 text-center px-6">
        <h1 data-testid="hero-title" className="text-4xl md:text-6xl font-bold">
          Welcome to Gaza Sky Geeks
        </h1>
        <p data-testid="hero-subtitle" className="mt-4 text-lg md:text-xl">
          A wonderful experience awaits you! Enjoy browsing our courses now.
        </p>
      </div>

      {/* الفاصل الموجي */}
      <div data-testid="hero-wave" className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180 max-lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block w-[152%] h-[135px] -mt-0.5"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </div>
  );
}
