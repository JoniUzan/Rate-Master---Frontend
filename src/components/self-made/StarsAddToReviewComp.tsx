import { useState } from 'react';

interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
}

const StarAddToReview: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMouseEnter = (index: number) => setHoveredIndex(index);
    const handleMouseLeave = () => setHoveredIndex(null);
    const handleClick = (index: number) => onRatingChange(index + 1);

    return (
        <div className="flex space-x-1">
            {[0, 1, 2, 3, 4].map((index) => {
                const isFilled = index < (hoveredIndex !== null ? hoveredIndex + 1 : rating);
                return (
                    <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={isFilled ? "#FFDE4D" : "gray"}
                        className="w-6 h-6 cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.27l-7.19-.61L12 2 9.19 8.66 2 9.27l5.46 4.7L5.82 21z" />
                    </svg>
                );
            })}
        </div>
    );
};

export default StarAddToReview;
