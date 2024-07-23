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
import { useNavigate } from "react-router-dom";

interface Business {
  _id: string;
  name: string;
  description: string;
  location: string;
  stars: number;
  reviews: string[];
  image: string;
}

function HomeCarusele() {
  const [topBusinesse, setTopBusinesse] = useState<Business[] | []>([]);
  const navigate = useNavigate();
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
      <div className="container  px-4">
        <h2 className="text-4xl font-bold mb-8 ml-12 text-primary">
          Our Highest Rated Business
        </h2>
        <Carousel className="w-full max-w-6xl ml-12">
          <CarouselContent>
            {topBusinesse.map((item, index) => {
              return (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card
                      onClick={() => {
                        navigate(`/business/${item._id}`);
                      }}
                      className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                      </CardHeader>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${
                              i < item.stars
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
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
