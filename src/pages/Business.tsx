import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { api } from "@/lib/utils";

function Business() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await api.get('/api/business');
        setBusinesses(response.data);
      } catch (err) {
        setError(err:E);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {businesses.map((business) => (
        <Card key={business.id}>
          <div>{business.name}</div>
          <div>{business.description}</div>
        </Card>
      ))}
    </div>
  );
}

export default Business;
