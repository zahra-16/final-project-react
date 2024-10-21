// StarRating.jsx
import React from "react";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`cursor-pointer text-xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
          onClick={() => setRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
