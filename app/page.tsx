import Header from "./component/Header/Header";
import HeroSection from "./pages/heroSection/HeroSection";
import InfoSection from "./pages/infoSection/InfoSection";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <InfoSection />
    </div>
  );
}
