// pages/Home.tsx
import KeyFeatures from "@/components/self-made/KeyFeatures";
import EnterSection from "@/components/self-made/EnterSection";
import HomeCarusele from "@/components/self-made/HomeCarusele";
import About from "./About";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main>
        <EnterSection />
        <HomeCarusele />
        <KeyFeatures />
        
        <About />
      </main>
    </div>
  );
}

export default Home;
