import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import PortfolioPreview from "./components/PortfolioPreview";
import ProblemSolution from "./components/ProblemSolution";
import Process from "./components/Process";
import SolutionsGrid from "./components/SolutionsGrid";
import WhyAvlys from "./components/WhyAvlys";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <SolutionsGrid />
        <Process />
        <PortfolioPreview />
        <WhyAvlys />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
