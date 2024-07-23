import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
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
    <section className="pt-44 bg-background">
      <div className="container  px-4 w-[80%]">
        <h2 className="text-4xl font-bold mb-8  text-primary">
          Our Highest Rated Business
        </h2>
        <Carousel className=" mx-auto">
          <CarouselContent>
            {topBusinesse.map((business, index) => {
              return (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/1 md:basis-1/2 lg:basis-1/2 xl:basis-1/3 "
                >
                  <Card
                    onClick={() => {
                      navigate(`/business/${business._id}`);
                    }}
                    className="relative bg-secondary-foreground overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-none cursor-pointer"
                  >
                    <img
                      src={business.image}
                      alt={business.name}
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-md p-6">
                      <h2 className="text-2xl font-bold mb-2 text-white">
                        {business.name}
                      </h2>
                      <p className="text-white mb-4">{business.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-100">
                          {business.location}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < business.stars
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
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="text-foreground" />
          <CarouselNext className="text-foreground" />
        </Carousel>
      </div>
    </section>
  );
}

export default HomeCarusele;
