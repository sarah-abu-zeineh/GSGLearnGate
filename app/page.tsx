import CollectionCourses from "@/components/CollectionCourses/CollectionCourses";
import Footer from "@/components/Footer/Footer";
import HeaderNav from "@/components/Header/HeaderNav/HeaderNav";
import HeroSection from "@/components/HeroSection/HeroSection";

export default function Home() {
  return (
    <div>
      <HeaderNav position="absolute" />
      <HeroSection />
      <CollectionCourses />
      <Footer />
    </div>
  );
}
