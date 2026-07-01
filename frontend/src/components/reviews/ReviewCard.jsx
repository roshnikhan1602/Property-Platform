import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaUserCircle,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import RatingStars from "./RatingStars";
import { updateReview } from "../../services/reviewService";

function ReviewCard({
  review,
  currentUser,
  onLike,
  onDislike,
  onDelete,
  onUpdated,
}) {
  const isOwner =
    currentUser &&
    review.user &&
   (review.user?._id || review.user) === currentUser._id;

  const [editing, setEditing] =
    useState(false);

  const [rating, setRating] =
    useState(review.rating);

  const [comment, setComment] =
    useState(review.comment);

  const handleUpdate = async () => {
    const data = await updateReview(
      review._id,
      {
        rating,
        comment,
      }
    );

    if (data.success) {
      setEditing(false);
      onUpdated();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5">

      <div className="flex justify-between items-start">

        <div className="flex items-start gap-3">

         {review.user?.profileImage ? (
  <img
    src={review.user.profileImage}
    alt={review.user?.name || review.userName}
    className="w-11 h-11 rounded-full object-cover border"
  />
) : (
  <FaUserCircle
    size={42}
    className="text-gray-400"
  />
)}

          <div>

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="font-semibold text-gray-900">
              {review.user?.name || review.userName}
              </h3>

              {review.isEdited && (
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  Edited
                </span>
              )}

            </div>

            <p className="text-xs text-gray-500 mt-0.5">
              {new Date(
                review.createdAt
              ).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="mt-2">
              <RatingStars
                rating={rating}
                setRating={setRating}
                readonly={!editing}
              />
            </div>

          </div>

        </div>

        {isOwner && (

          <div className="flex items-center gap-2">

            {editing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center transition"
                >
                  <FaSave size={14} />
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    setRating(review.rating);
                    setComment(review.comment);
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition"
                >
                  <FaTimes size={14} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() =>
                    setEditing(true)
                  }
                  className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center transition"
                >
                  <FaEdit size={14} />
                </button>

                <button
                  onClick={() =>
                    onDelete(review._id)
                  }
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center transition"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}

          </div>

        )}

      </div>

      {editing ? (

        <textarea
          rows={3}
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="w-full mt-4 border border-gray-300 rounded-lg p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
        />

      ) : (

        <p className="mt-4 text-gray-700 leading-6 text-sm">
          {review.comment}
        </p>

      )}

      {review.ownerReply && !editing && (

        <div className="mt-4 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-4">

          <div className="flex items-center gap-2 mb-2">

            <span className="bg-blue-600 text-white text-[10px] font-semibold px-2 py-1 rounded-full">
              OWNER
            </span>

          </div>

          <p className="text-sm text-gray-700 leading-6">
            {review.ownerReply}
          </p>

        </div>

      )}

      <div className="flex items-center gap-3 mt-5 pt-4 border-t">

        <button
          onClick={() =>
            onLike(review._id)
          }
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-green-100 text-sm transition"
        >
          <FaThumbsUp />
          {review.likes?.length || 0}
        </button>

        <button
          onClick={() =>
            onDislike(review._id)
          }
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-red-100 text-sm transition"
        >
          <FaThumbsDown />
          {review.dislikes?.length || 0}
        </button>

      </div>

    </div>
  );
}

export default ReviewCard;