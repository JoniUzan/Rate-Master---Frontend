import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/utils";
import { motion } from "framer-motion";
import PaginationComponent from '../components/self-made/PaganationSelf';

function Business() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

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
        const response = await api.get('/business', {
          params: { 
            page: searchParams.get('page') || 1,
            search: searchParams.get('search') || ''
          }
        });
        const data = response.data;
        if (data && Array.isArray(data.businesses)) {
          setBusinesses(data.businesses);
          setTotalPages(data.totalPages);
        } else {
          console.error('Expected businesses array in response, but got:', data);
        }
      } catch (err) {
        console.error('Error fetching businesses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, [searchParams]);

  if (loading) return <div>Loading...</div>;

  const handleSearch = (e:any) => {
    const search = e.target.value;
    setSearchParams({ search, page: '1' });
  };

  const handlePageChange = (page:number) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page: page.toString() });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <Input
          type="text"
          placeholder="Search businesses..."
          value={searchParams.get('search') || ''}
          onChange={handleSearch}
          className="w-full max-w-md mx-auto"
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
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-800">{business.name}</h2>
                  <p className="text-gray-600 mb-4">{business.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">{business.location}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < business.stars ? 'text-yellow-400' : 'text-gray-300'}`}
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
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center text-gray-600">No businesses found.</div>
      )}

      <PaginationComponent
        currentPage={Number(searchParams.get('page') || 1)}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Business;