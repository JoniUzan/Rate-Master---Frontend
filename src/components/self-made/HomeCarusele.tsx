import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { api } from "@/lib/utils";

interface Business {
  name: string;
  description: string;
  location: string;
  stars: number;
  reviews: string[];
  image: string;
}

function HomeCarusele() {
  const [topBusinesse, setTopBusinesse] = useState<Business[] | []>([]);

  useEffect(() => {
    async function fetchTopbusinesses() {
      try {
        const response = await api.get("/business/topBusinesses");
        setTopBusinesse(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("error while fetch top businesses");
      }
    }
    fetchTopbusinesses();
  }, []);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {topBusinesse.map((item, index) => {
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}

export default HomeCarusele;
