import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Star,
  Filter,
  MapPin,
  BarChart,
  Shield,
} from "lucide-react";
import React from "react";

function KeyFeatures() {
  const features = [
    {
      title: "User Reviews",
      description:
        "Engage with our vibrant community through authentic user reviews. Share your experiences, read insights from others, and make informed decisions based on real user feedback.",
      icon: MessageSquare,
    },
    {
      title: "Advanced Rating System",
      description:
        "Our intuitive 5-star rating system allows for nuanced feedback. Rate products and services across multiple criteria, ensuring a comprehensive evaluation that helps others make informed choices.",
      icon: Star,
    },
    {
      title: "Smart Category Filters",
      description:
        "Effortlessly navigate through reviews with our advanced filtering system. Find exactly what you're looking for by category, product type, rating range, and more, saving you time and enhancing your search experience.",
      icon: Filter,
    },
    {
      title: "Geolocation Integration",
      description:
        "Discover local businesses and services with our geolocation feature. Find highly-rated options near you, perfect for travelers or those exploring their own city.",
      icon: MapPin,
    },
    {
      title: "Trend Analysis",
      description:
        "Stay ahead of the curve with our trend analysis tool. Track popularity shifts, identify emerging favorites, and see how ratings evolve over time for comprehensive market insights.",
      icon: BarChart,
    },
    {
      title: "Verified User Program",
      description:
        "Trust in the authenticity of reviews with our verified user program. Easily identify feedback from confirmed purchasers, ensuring reliability and reducing the impact of fake reviews.",
      icon: Shield,
    },
  ];

  return (
    <section className="py-52 bg-background">
      <div className="container mx-auto px-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full transition-all duration-1000 hover:shadow-lg border-none bg-background shadow-none">
                <CardHeader>
                  <div className="text-4xl mb-4">
                    {" "}
                    {React.createElement(feature.icon)}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default KeyFeatures;
