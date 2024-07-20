import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button";

function Footer() {
  const navigate = useNavigate();
  return (
      <footer className="py-8 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 RateMaster. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <Button variant="ghost" onClick={()=>navigate("/PricacyPolicy")}>Privacy Policy</Button>
          <Button variant="ghost" onClick={()=>navigate("/TermsOfService")}>Terms of Service</Button>
          <Button variant="ghost" onClick={()=>navigate("/contact")}>Contact Us</Button>
          </div>
        </div>
      </footer>  )
}

export default Footer