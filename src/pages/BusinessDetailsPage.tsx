import React, { useEffect, useState } from "react";
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
import GoogleMaps from "@/components/self-made/GoogleMap";
import EditReview from "@/components/self-made/EditReview";
import DeleteReview from "@/components/self-made/DeleteReview";
import { Slider } from "@/components/ui/slider";
import { socket } from "../App"

interface Review {
  _id: string;
  content: string;
  business: string;
  user: {
    _id: string;
    username: string;
  };
  likes: number;
  time: string;
}

interface Business {
  image: string;
  _id: string;
  name: string;
  description: string;
  stars: number;
  location: string;
  reviews: Review[];
  coordinates: { lat: number; lng: number };
}

const BusinessDetailsPage: React.FC = () => {
  const { loggedInUser, userLikes, setUserLikes } = useAuth();

  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newReview, setNewReview] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [loadingLike, setLoadingLike] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([3]);
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBusinessData();

    socket.on("reviewUpdated", (updatedReview) => {
      setBusiness((prevBusiness) => {
        if (!prevBusiness) return null;
        return {
          ...prevBusiness,
          reviews: prevBusiness.reviews.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          ),
        };
      });
    });

    return () => {
      socket.off("reviewUpdated");
    };
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
    const currentLikes = userLikes || [];

    const isLiked = currentLikes.includes(reviewId);

    if (!loggedInUser) {
      navigate("/auth/SignIn");
    }
    const updatedLikes = business?.reviews.map(review =>
      review._id === reviewId
        ? { ...review, likes: review.likes + (isLiked ? -1 : 1) }
        : review
    );

    setBusiness((prev: any) => ({
      ...prev,
      reviews: updatedLikes || [],
    }));

    setUserLikes((prev: any) =>
      isLiked
        ? (prev || []).filter((rId: any) => rId !== reviewId)
        : [...(prev || []), reviewId]
    );

    setLoadingLike(reviewId);

    try {
      const { data: updatedReview } = await api.patch(
        `business/reviews/like/${reviewId}`
      );
      console.log(updatedReview);
      if (!business) return;
      setBusiness((prev: any) => ({
        ...prev,
        reviews: prev?.reviews.map((r: any) =>
          r._id === reviewId ? updatedReview : r
        ),
      }));
    } catch (error) {
      console.error("Failed to like review:", error);

      setBusiness((prev: any) => ({
        ...prev,
        reviews: prev?.reviews.map((r: any) =>
          r._id === reviewId
            ? {
              ...r,
              likes: r.likes - (currentLikes.includes(reviewId) ? -1 : 1),
            }
            : r
        ),
      }));
      setUserLikes((prev) =>
        isLiked
          ? [...(prev || []), reviewId]
          : (prev || []).filter((rId) => rId !== reviewId)
      );
    } finally {
      setLoadingLike(null);
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
      // await api.put(`business/${businessId}`, { business.star:sliderValue});
      setNewReview("");
      setIsDialogOpen(false);
      fetchBusinessData();
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  }

  const handleReviewDelete = (reviewId: string) => {
    setBusiness((prevBusiness) => {
      if (!prevBusiness) return null;
      return {
        ...prevBusiness,
        reviews: prevBusiness.reviews.filter((review) => review._id !== reviewId),
      };
    });
  };

  const handleReviewUpdate = (reviewId: string, newContent: string) => {
    setBusiness((prevBusiness) => {
      if (!prevBusiness) return null;
      return {
        ...prevBusiness,
        reviews: prevBusiness.reviews.map((review) =>
          review._id === reviewId ? { ...review, content: newContent } : review
        ),
      };
    });
  };

  const getInitialLetter = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

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
            className="w-full h-96 pb-3 object-cover"
          />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">
                {business.name}
              </CardTitle>
              <p className="text-gray-600 mb-4">{business.description}</p>
              <div className="flex items-center mb-4">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span>{business.stars.toFixed(1)} stars</span>
              </div>
            </div>
            <div className="w-80 h-36 rounded-lg overflow-hidden">
              <GoogleMaps
                location={business.location}
                position={business.coordinates}
              />
            </div>
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
                  {loggedInUser ? (<Button>Add Review</Button>) : <></>}
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className=" text-accent-foreground">Write a Review</DialogTitle>
                  </DialogHeader>
                  <form className=" text-accent-foreground" onSubmit={handleAddReview}>
                    <Textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write your review here..."
                      className="mb-4"
                    />
                    <div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < sliderValue[0] ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <Slider 
                        value={sliderValue} 
                        onValueChange={setSliderValue}
                        min={1}
                        max={5} 
                        step={1}
                        className="my-4" 

                      />
                    </div>
                    <Button type="submit">Submit Review</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="space-y-4">
              {business.reviews.map((review) => (
                <div key={review._id} className="border-t pt-4 mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold">
                        {getInitialLetter(review.user.username)}
                      </div>
                      <div className=" flex flex-col">
                      <p className="font-semibold">{review.user.username}</p>
                      <p className=" text-xs">posted in: {review.time }</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DeleteReview
                        _id={review._id}
                        user={review.user}
                        onReviewDelete={handleReviewDelete}
                      />
                      <EditReview
                        _id={review._id}
                        content={review.content}
                        user={review.user}
                        onReviewUpdate={handleReviewUpdate}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeReview(review._id)}
                        disabled={loadingLike === review._id}
                        className="mr-2"
                      >
                        {userLikes?.includes(review._id) ? (
                          <div className="flex flex-row items-center">
                            <HeartOff className="mr-1" size={16} />
                            <span>{review.likes}</span>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center">
                            <Heart className="mr-1 text-red-600" size={16} />
                            <span>{review.likes}</span>
                          </div>
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
