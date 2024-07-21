import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

function EnterSection() {
    const navigate = useNavigate();
  return (
      <section className="py-20 text-center bg-hero-pattern bg-cover bg-center text-black">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl text-black  font-extrabold mb-6  shadow-text">Your Trusted Review Companion</h2>
            <p className="text-xl text-black mb-8 max-w-2xl mx-auto  shadow-text">Discover, rate, and share your experiences with RateMaster - the ultimate platform for honest reviews.</p>
            <Button onClick={()=>navigate("/auth/SignIn")} size="lg" className="bg-primary hover:bg-primary/90 ">Get Started</Button>
          </div>
        </section>
  )
}

export default EnterSection