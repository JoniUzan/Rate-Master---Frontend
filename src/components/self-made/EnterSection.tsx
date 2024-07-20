import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

function EnterSection() {
    const navigate = useNavigate();
  return (
      <section className="py-20 text-center bg-hero-pattern bg-cover bg-center">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl  text-black  font-extrabold mb-6 text-primary-foreground shadow-text">Your Trusted Review Companion</h2>
            <p className="text-xl  text-black mb-8 max-w-2xl mx-auto text-primary-foreground shadow-text">Discover, rate, and share your experiences with RateMaster - the ultimate platform for honest reviews.</p>
            <Button onClick={()=>navigate("/SignIn")} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
          </div>
        </section>
  )
}

export default EnterSection