// components/StarRating.tsx
import React from "react";

interface StarRatingProps {
    rating: number; // rating in float (e.g., 3.5)
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => {
                if (i < fullStars) {
                    // Full star
                    return (
                        <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    );
                } else if (i === fullStars && hasHalfStar) {
                    // Half star
                    return (

                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                            <defs>
                                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="50%" stopColor="currentColor" />
                                    <stop offset="50%" stopColor="transparent" />
                                </linearGradient>
                            </defs>
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.27l-7.19-.61L12 2 9.19 8.66 2 9.27l5.46 4.7L5.82 21z" fill="url(#grad)" />
                        </svg>


                    );
                } else {
                    // Empty star
                    return (
                        <svg
                            key={i}
                            className="w-5 h-5 text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    );
                }
            })}
        </div>
    );
};

export default StarRating;

