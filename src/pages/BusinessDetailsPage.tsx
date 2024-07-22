import React, { Fragment, useEffect, useState } from "react";
import { api } from "@/lib/utils";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, ArrowLeft, MapPin, Heart, HeartOff } from "lucide-react";
import { useAuth } from "../context/UserProvider";
import { BusinessDetailsSkeleton } from "@/components/self-made/SelfSkeleton";

interface Review {
  _id: string;
  content: string;
  business: string;
  user: {
    _id: string;
    username: string;
  };
  likes: number;
}

interface Business {
  image: string;
  _id: string;
  name: string;
  description: string;
  stars: number;
  location: string;
  reviews: Review[];
}

const BusinessDetailsPage: React.FC = () => {
  const { loggedInUser, userLikes, setUserLikes } = useAuth();

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setNewReview] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessData();
  }, [businessId]);

  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      const res = await api.get<Business>(`/business/${businessId}`);
      const reviewsResponse = await api.get<Review[]>(
        `/business/reviews/${businessId}`
      );

      const businessWithReview = { ...res.data, reviews: reviewsResponse.data };
      setBusiness(businessWithReview);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  async function handleGoBack() {
    navigate(-1);
  }

  async function handleLikeReview(reviewId: string) {
    try {
      const { data: updatedReview } = await api.patch(
        `business/reviews/like/${reviewId}`
      );
      console.log(updatedReview);
      if (!business) return;
      setBusiness((prev: any) => {
        return {
          ...prev,
          reviews: prev?.reviews.map((r: any) =>
            r._id === reviewId ? updatedReview : r
          ),
        };
      });
      setUserLikes((prev) => {
        if (prev.includes(reviewId)) {
          return prev.filter((rId) => reviewId !== rId);
        } else {
          return [...prev, reviewId];
        }
      });
    } catch (error) {
      console.error("Failed to like review:", error);
    }
  }

  async function handleAddReview(e: React.FormEvent) {
    if (!loggedInUser) {
      navigate("/auth/SignIn");
    }

    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      await api.post(`business/reviews/${businessId}`, { content: newReview });
      setNewReview("");
      setIsDialogOpen(false);
      fetchBusinessData();
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  }

  if (loading) return <BusinessDetailsSkeleton />;
  if (!business)
    return <div className="text-center py-4">No business found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-[60vw] mx-auto">
        <CardHeader>
          <Button onClick={handleGoBack} className="w-fit">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-48 pb-3 object-cover"
          />
          <CardTitle className="text-2xl font-bold">{business.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{business.description}</p>
          <div className="flex items-center mb-4">
            <Star size={16} className="text-yellow-400 mr-1" />
            <span>{business.stars.toFixed(1)} stars</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4 items-center">
                <h3 className="text-xl font-semibold">
                  Reviews ({business.reviews.length})
                </h3>
                <div className="flex items-center text-gray-500">
                  <MapPin size={16} className="mr-2" />
                  <span>{business.location}</span>
                </div>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Review</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddReview}>
                    <Textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write your review here..."
                      className="mb-4"
                    />
                    <Button type="submit">Submit Review</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {business.reviews.map((review) => (
                <div key={review._id} className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{review.user.username}</p>
                    <div className="flex items-center text-gray-500">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeReview(review._id)}
                        className="mr-2"
                      >
                        {userLikes?.includes(review._id) ? (
                          <Fragment>
                            <HeartOff className="mr-1" size={16} />
                            <span>{review.likes}</span>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <Heart className="mr-1" size={16} />
                            <span>{review.likes}</span>
                          </Fragment>
                        )}
                      </Button>
                    </div>
                  </div>
                  <p>{review.content}</p>
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};
export default BusinessDetailsPage;
