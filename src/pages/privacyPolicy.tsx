// pages/PrivacyPolicy.tsx
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p>
                We collect information you provide directly to us, such as when
                you create an account, submit a review, or contact us for
                support.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p>
                We use the information we collect to operate and improve our
                services, communicate with you, and personalize your experience.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                3. Information Sharing and Disclosure
              </h2>
              <p>
                We do not sell your personal information. We may share
                information with third-party service providers who perform
                services on our behalf.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect the security of your personal information.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal
                information. Contact us to exercise these rights.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                6. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any changes by posting the new policy on this
                page.
              </p>
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

export default PrivacyPolicy;
