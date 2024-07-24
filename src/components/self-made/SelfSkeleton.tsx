import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";

const BusinessCardSkeleton = () => (
  <div className="bg-gray-500 overflow-hidden shadow-lg rounded-md">
    <div className="w-full h-48 bg-gray-300 animate-pulse" />
    <div className="p-6">
      <div className="h-8 bg-gray-300 rounded w-3/4 mb-2 animate-pulse" />
      <div className="h-4 bg-gray-300 rounded w-full mb-4 animate-pulse" />
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-5 h-5 bg-gray-300 rounded-full mr-1 animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const BusinessSkeletonPage = () => (
  <div className=" mt-20 mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <motion.div
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <BusinessCardSkeleton />
      </motion.div>
    ))}
  </div>
);

const BusinessDetailsSkeleton = () => (
  <div className="container mx-auto px-4 py-8 ">
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse" />
      </CardHeader>
      <CardContent>
        <div className="h-4 bg-gray-300 rounded w-full mb-4 animate-pulse" />
        <div className="flex items-center mb-4">
          <div className="h-4 bg-gray-300 rounded w-16 animate-pulse" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse" />
            <div className="h-8 bg-gray-300 rounded w-24 animate-pulse" />
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-t pt-4 mt-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-4 bg-gray-300 rounded w-1/4 animate-pulse" />
                  <div className="h-6 bg-gray-300 rounded w-16 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  </div>
);

export { BusinessSkeletonPage };
export { BusinessDetailsSkeleton };
