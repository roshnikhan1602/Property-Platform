import { useState } from "react";
import PGRatingStars from "./PGRatingStars";

function PGReviewForm({
  onSubmit,
  loading = false,
}) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    onSubmit({
      rating,
      comment,
    });

    setRating(5);
    setComment("");
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-5">
        Write a Review
      </h2>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>

        <PGRatingStars
          rating={rating}
          setRating={setRating}
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Review
        </label>

        <textarea
          rows={3}
          placeholder="Share your experience..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300 p-3 text-sm resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
        >
          {loading
            ? "Submitting..."
            : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

export default PGReviewForm;