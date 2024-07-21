import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Card, CardHeader, CardTitle } from '../ui/card'

function HomeCarusele() {
      const carouselItems = [
    { title: "Product 1", image: "https://via.placeholder.com/400x300?text=Product+1" },
    { title: "Product 2", image: "https://via.placeholder.com/400x300?text=Product+2" },
    { title: "Product 3", image: "https://via.placeholder.com/400x300?text=Product+3" },
    { title: "Product 4", image: "https://via.placeholder.com/400x300?text=Product+4" },
  ];
  return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent>
                {carouselItems.map((item, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <CardHeader>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </section>
  )
}

export default HomeCarusele