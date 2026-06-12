import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/home/HeroSection";
import SearchBar from "../components/home/SearchBar";
import FeaturedProperties from "../components/home/FeaturedProperties";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <SearchBar />
      <FeaturedProperties />
      <Footer />
    </div>
  );
}

export default Home;