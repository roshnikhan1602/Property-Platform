import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import FeaturedProperties from "../components/home/FeaturedProperties";
import RecentlyViewed from "../components/property/RecentlyViewed";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Home({
  setShowLoginModal,
}) {
  return (
    <>
      <Navbar
        setShowLoginModal={
          setShowLoginModal
        }
      />

      <HeroSection
        setShowLoginModal={
          setShowLoginModal
        }
      />

      <SearchBar />

      <RecentlyViewed />

      <FeaturedProperties />

      <Footer />
    </>
  );
}

export default Home;