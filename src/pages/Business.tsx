import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { api } from "@/lib/utils";

function Business() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  interface Business{
    id: any;
    name: String;
    description: String;
    
}
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get('/business');
        setBusinesses(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=' flex flex-wrap gap-9'>
      {businesses.map((business:Business) => (
        <Card key={business.id}>
          <div>{business.name}</div>
          <div>{business.description}</div>
        </Card>
      ))}
    </div>
  );
}

export default Business;
