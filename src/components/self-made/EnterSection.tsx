import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

function EnterSection() {
  const navigate = useNavigate();
  return (
    <section className="  bg-[url('https://plus.unsplash.com/premium_photo-1682310144714-cb77b1e6d64a?q=80&w=1512&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center text-secondary-foreground min-w-full ">
      <div className="bg-gradient-to-r from-background/80 to-transparent/10 py-10  ">
        <div className="max-w-2xl p-8  px-4 ml-12  ">
          <h2 className="text-5xl text-secondary-foreground  font-extrabold mb-6  shadow-text">
            Your Trusted Review Companion
          </h2>
          <p className="text-xl text-secondary-foreground mb-8 max-w-2xl   shadow-text ">
            Discover, rate, and share your experiences with RateMaster - the
            ultimate platform for honest reviews.
          </p>
          <Button
            onClick={() => navigate("/auth/SignIn")}
            size="lg"
            className="bg-primary hover:bg-primary/90 "
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}

export default EnterSection;
