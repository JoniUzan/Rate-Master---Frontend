import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-20">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <form className="max-w-md mx-auto">
          <div className="mb-4">
            <Input placeholder="Your Name" />
          </div>
          <div className="mb-4">
            <Input type="email" placeholder="Your Email" />
          </div>
          <div className="mb-4">
            <Textarea placeholder="Your Message" />
          </div>
          <Button type="submit" size="lg">Send Message</Button>
        </form>
      </main>
    </div>
  );
}

export default Contact;