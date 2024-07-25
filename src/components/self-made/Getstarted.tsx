import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "../../context/UserProvider";

function Getstarted() {
  const navigate = useNavigate();
  const { loggedInUser } = useAuth();
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
        <p className="text-xl mb-8">
          Join thousands of users who trust RateMaster for honest reviews.
        </p>
        {!loggedInUser && (
          <Button
            onClick={() => navigate("/auth/SignUp")}
            size="lg"
            variant="secondary"
          >
            Sign Up Now
          </Button>
        )}
      </div>
    </section>
  );
}

export default Getstarted;
