// pages/Home.tsx
import KeyFeatures from "@/components/self-made/KeyFeatures";
import EnterSection from "@/components/self-made/EnterSection";
import HomeCarusele from "@/components/self-made/HomeCarusele";
import Getstarted from "@/components/self-made/Getstarted";

function Home() {



  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">

      <main>
        <EnterSection/>
        <KeyFeatures />
        <HomeCarusele/>
        <Getstarted/>

      </main>


    </div>
  );
}

export default Home;