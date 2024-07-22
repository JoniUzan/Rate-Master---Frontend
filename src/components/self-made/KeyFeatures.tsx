import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { motion } from "framer-motion"

function KeyFeatures() {
      const features = [
    { title: "User Reviews", description: "Read and write authentic user reviews", icon: "📝" },
    { title: "Rating System", description: "Easy-to-use 5-star rating system", icon: "⭐" },
    { title: "Category Filters", description: "Find reviews by category or product type", icon: "🔍" },
  ];

  return (
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-secondary-foreground">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="text-4xl mb-4">{feature.icon}</div>
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
        </section>  )
}

export default KeyFeatures