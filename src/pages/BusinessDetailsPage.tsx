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
import { socket } from "../App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StarAddToReview from "@/components/self-made/StarsAddToReviewComp";

interface Review {
  _id: string;
  content: string;
  business: string;
  user: {
    _id: string;
    username: string;
    image: string;
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
  const { businessId } = useParams<{ businessId: string }>();
  const [rating, setRating] = useState(0);
  const [isAddReviewClicked, setIsAddReviewClicked] = useState(false)
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

    socket.on("newReview", (newReview) => {
      setBusiness((prevBusiness) => {
        if (!prevBusiness) return null;
        return {
          ...prevBusiness,
          reviews: [...prevBusiness.reviews, newReview],
        };
      });
    });

    socket.on("reviewToDelete", (reviewToDelete) => {
      setBusiness((prevBusiness) => {
        if (!prevBusiness) return null;
        return {
          ...prevBusiness,
          reviews: prevBusiness.reviews.filter(
            (review) => review._id !== reviewToDelete._id
          ),
        };
      });
    });

    socket.on("updateReviewContent", (updateReviewContent) => {
      setBusiness((prevBusiness) => {
        if (!prevBusiness) return null;
        return {
          ...prevBusiness,
          reviews: prevBusiness.reviews.map((review) =>
            review._id === updateReviewContent._id
              ? { ...review, content: updateReviewContent.content }
              : review
          ),
        };
      });
    });

    return () => {
      socket.off("newReview");
      socket.off("reviewUpdated");
      socket.off("updateReviewContent");
      socket.off("reviewToDelete");
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
    const updatedLikes = business?.reviews.map((review) =>
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

    e.preventDefault();

    if (!isAddReviewClicked) {
      if (!loggedInUser) {
        navigate("/auth/SignIn");
        return;
      }

      if (!newReview.trim()) return;

      setIsAddReviewClicked(true);

      try {
        await api.post(`business/reviews/${businessId}`, { content: newReview, rating: rating });

        setRating(0);
        setNewReview("");
        setIsAddReviewClicked(false);
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Failed to add review:", error);
      }
    }
  }

  // const getInitialLetter = (username: string) => {
  //   return username.charAt(0).toUpperCase();
  // };

  if (loading) return <BusinessDetailsSkeleton />;
  if (!business)
    return <div className="text-center py-4">No business found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-[90vw] md:max-w-[60vw] mx-auto">
        <CardHeader>
          <Button onClick={handleGoBack} className="w-fit mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-48 md:h-96 pb-3 object-cover"
          />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="mb-4 md:mb-0">
              <CardTitle className="text-xl md:text-2xl font-bold">
                {business.name}
              </CardTitle>
              <p className="text-gray-600 mb-4">{business.description}</p>
              <div className="flex items-center mb-4">
                <Star size={16} className="text-yellow-400 mr-1" />
                <span>{business.stars.toFixed(1)} stars</span>
              </div>
            </div>
            <div className="w-full md:w-80 h-36 rounded-lg overflow-hidden">
              <GoogleMaps
                location={business.location}
                position={business.coordinates}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex flex-col md:flex-row md:gap-4 md:items-center mb-4 md:mb-0">
                <h3 className="text-lg md:text-xl font-semibold">
                  Reviews ({business.reviews.length})
                </h3>
                <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                  <MapPin size={16} className="mr-2" />
                  <span>{business.location}</span>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Review</Button>
                </DialogTrigger>
                <DialogContent aria-describedby="">
                  <DialogHeader>
                    <DialogTitle className="text-accent-foreground">
                      Write a Review
                    </DialogTitle>
                  </DialogHeader>
                  <form className="flex flex-col gap-6 text-accent-foreground" onSubmit={handleAddReview}>
                    <Textarea
                      value={newReview}
                      onChange={(e) => setNewReview(e.target.value)}
                      placeholder="Write your review here..."
                    />
                    <StarAddToReview rating={rating} onRatingChange={setRating} />
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
                        <Avatar>
                          {review.user.image && (
                            <AvatarImage src={review.user.image} />
                          )}
                          <AvatarFallback className="text-foreground">
                            {review.user.username[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold">{review.user.username}</p>
                        <p className="text-xs">posted in: {review.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <DeleteReview _id={review._id} user={review.user} />
                      <EditReview
                        _id={review._id}
                        content={review.content}
                        user={review.user}
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
