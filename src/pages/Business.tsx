import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/utils";
import { motion } from "framer-motion";
import PaginationComponent from "../components/self-made/PaganationSelf";
import { BusinessSkeletonPage } from "@/components/self-made/SelfSkeleton";
import FilterBusiness from "@/components/self-made/FilterBusiness";
import StarRating from "@/components/self-made/StarsRating"; // Import the new component

function Business() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  interface Business {
    _id: string;
    image: string;
    name: string;
    description: string;
    location: string;
    stars: number;
  }

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get("/business", {
          params: {
            page: searchParams.get("page") || 1,
            search: searchParams.get("search") || "",
            category: searchParams.get("category") || "",
            location: searchParams.get("location") || "",
          },
        });
        const data = response.data;
        if (data && Array.isArray(data.businesses)) {
          setBusinesses(data.businesses);
          setTotalPages(data.totalPages);
          setLoading(false)
        } else {
          console.error(
            "Expected businesses array in response, but got:",
            data
          );
        }
      } catch (err) {
        console.error("Error fetching businesses:", err);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchBusinesses();
  }, [searchParams]);

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setSearchParams((prev) => {
      return {
        ...prev,
        search: search,
        page: "1",
      };
    });
  };
  
  const handlePageChange = (page: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: page.toString(),
    });
  };
  
  if (loading) return <BusinessSkeletonPage />;
  return (
    
    <div className="container mx-auto p-4 bg-background">
      <div className="mb-8 flex justify-center items-center gap-8">
        <Input
          type="text"
          placeholder="Search businesses..."
          value={searchParams.get("search") || ""}
          onChange={handleSearch}
          className="w-full max-w-md text-foreground"
        />
        <FilterBusiness
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      {businesses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {businesses.map((business: Business) => (
            <motion.div
              key={business._id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                onClick={() => {
                  navigate(`/business/${business._id}`);
                }}
                className="relative bg-secondary-foreground overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
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
                    <p className="text-sm text-gray-100">{business.location}</p>
                    <StarRating rating={business.stars} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-accent-foreground">
          No businesses found.
        </div>
      )}

      <PaginationComponent
        currentPage={Number(searchParams.get("page") || 1)}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Business;
