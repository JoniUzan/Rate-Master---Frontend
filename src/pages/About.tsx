import { Button } from "../components/ui/button"


function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container py-20">
        <h2 className="text-3xl font-bold mb-8">About RateMaster</h2>
        <p className="text-lg mb-6">
          RateMaster is your go-to platform for honest, reliable reviews. Our mission is to empower consumers and businesses alike with transparent feedback and ratings.
        </p>
        <p className="text-lg mb-6">
          Founded in 2024, we've quickly grown to become a trusted source for reviews across various industries. Our user-friendly interface and commitment to authenticity set us apart in the crowded world of online reviews.
        </p>
        <Button size="lg">Learn More</Button>
      </main>
    </div>
  );
}

export default About;