// pages/TermsOfService.tsx
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Terms of Service</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using RateMaster, you agree to be bound by these Terms of Service.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Content</h2>
              <p>You retain ownership of the content you post. By posting content, you grant RateMaster a non-exclusive license to use, modify, and display that content.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Prohibited Conduct</h2>
              <p>You agree not to engage in any conduct that may disrupt or interfere with RateMaster's services or the use and enjoyment of other users.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
              <p>We reserve the right to terminate or suspend your account and access to RateMaster at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. We will provide notice of significant changes by posting an announcement on our website.</p>
            </section>
          </div>
        </ScrollArea>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </main>
    </div>
  );
}

export default TermsOfService;