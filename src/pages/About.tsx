import { Button } from "../components/ui/button";
import { Shield, Users, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/UserProvider";


function About() {
  const { loggedInUser } = useAuth();
  const values = [
    {
      icon: Shield,
      title: "Trust",
      description:
        "We prioritize authenticity and transparency in every review.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Our platform is built on the collective wisdom of our diverse user base.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      description:
        "We're constantly evolving to meet the needs of consumers and businesses alike.",
    },
  ];

  return (
    <section id="about" className="pb-52 bg-background text-foreground">
      <div className="container mx-auto px-10">
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About RateMaster
        </motion.h1>

        <motion.p
          className="text-xl mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Welcome to RateMaster, your trusted companion in the world of reviews
          and ratings. Since our inception in 2024, we've been on a mission to
          revolutionize how people make informed decisions. At RateMaster, we
          believe in the power of collective wisdom. Our platform brings
          together consumers and businesses, creating a space where authentic
          experiences shape the narrative. From restaurants to tech gadgets,
          from services to entertainment, we cover it all with the same
          commitment to honesty and reliability.
        </motion.p>

        <motion.h2
          className="text-2xl font-semibold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Our Core Values
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <Card className="h-full transition-all duration-1000 hover:shadow-lg border-none bg-background shadow-none">
                <CardHeader>
                  <div className="text-4xl mb-4">
                    {React.createElement(value.icon)}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          What sets us apart? It's our unwavering dedication to user experience,
          our innovative approach to gathering and presenting data, and our
          commitment to fostering a community where every voice matters. Whether
          you're a discerning consumer or a business looking to engage with your
          audience, RateMaster provides the platform you need to connect, share,
          and grow. At RateMaster, we believe in the power of collective wisdom.
          Our platform brings together consumers and businesses, creating a
          space where authentic experiences shape the narrative. From
          restaurants to tech gadgets, from services to entertainment, we cover
          it all with the same commitment to honesty and reliability.
        </motion.p>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          {!loggedInUser && (
            <Link to={"auth/signup"}>
              <Button size="lg">Join Our Community</Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default About;
