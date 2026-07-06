import { FaStar } from "react-icons/fa";

function PGRatingStars({
  rating,
  setRating,
  readonly = false,
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={20}
          onClick={() =>
            !readonly && setRating(star)
          }
          className={`transition ${
            readonly
              ? ""
              : "cursor-pointer hover:scale-110"
          } ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

export default PGRatingStars;