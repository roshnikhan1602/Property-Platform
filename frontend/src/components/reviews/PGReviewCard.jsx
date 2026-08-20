import { useState } from "react";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaTrash,
  FaUserCircle,
  FaEdit,
  FaSave,
  FaTimes,
  FaReply,
} from "react-icons/fa";

import PGRatingStars from "./PGRatingStars";

import {
  updateReview,
  replyToReview,
  deleteReply,
} from "../../services/pgReviewService";

function PGReviewCard({
  review,
  currentUser,
  onLike,
  onDislike,
  onDelete,
  onUpdated,
  canReply,
}) {
  const isReviewOwner =
    currentUser &&
    review.user &&
    (review.user?._id || review.user) ===
      currentUser._id;

  const [editing, setEditing] =
    useState(false);

  const [rating, setRating] =
    useState(review.rating);

  const [comment, setComment] =
    useState(review.comment);

  const [replying, setReplying] =
    useState(false);

  const [reply, setReply] = useState(
    review.ownerReply || ""
  );

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

  const handleReply = async () => {
    if (!reply.trim()) return;

    const data = await replyToReview(
      review._id,
      reply
    );

    if (data.success) {
      setReplying(false);
      onUpdated();
    }
  };

  const handleDeleteReply = async () => {
    const data =
      await deleteReply(review._id);

    if (data.success) {
      setReply("");
      onUpdated();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-5">

      {/* User Information */}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">

        <div className="flex items-start gap-3 min-w-0">

          {review.user?.profileImage ? (
            <img
              src={review.user.profileImage}
              alt={
                review.user?.name ||
                review.userName
              }
              className="w-11 h-11 rounded-full object-cover border border-gray-200 shrink-0"
            />
          ) : (
            <FaUserCircle
              size={42}
              className="text-gray-400 shrink-0"
            />
          )}

          <div className="min-w-0">

            <div className="flex items-center gap-2 flex-wrap">

              <h3 className="font-semibold text-gray-900 break-words">
                {review.user?.name ||
                  review.userName}
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
              <PGRatingStars
                rating={review.rating}
                readonly
              />
            </div>

          </div>

        </div>

        {/* Edit / Delete */}

        {isReviewOwner && (
          <div className="flex items-center gap-2 shrink-0">

            {editing ? (
              <>
                <button
                  onClick={handleUpdate}
                  className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 text-green-700 flex items-center justify-center"
                >
                  <FaSave size={14} />
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    setRating(review.rating);
                    setComment(
                      review.comment
                    );
                  }}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center"
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
                  className="w-8 h-8 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 flex items-center justify-center"
                >
                  <FaEdit size={14} />
                </button>

                <button
                  onClick={() =>
                    onDelete(review._id)
                  }
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-700 flex items-center justify-center"
                >
                  <FaTrash size={14} />
                </button>
              </>
            )}

          </div>
        )}

      </div>

      {/* Review Content */}

      {editing ? (
        <div className="mt-4">

          <div className="mb-3">
            <PGRatingStars
              rating={rating}
              setRating={setRating}
            />
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>
      ) : (
        <p className="mt-4 text-gray-700 leading-6 text-sm break-words">
          {review.comment}
        </p>
      )}

      {/* Owner Reply */}

      {review.ownerReply && (
        <div className="mt-4 rounded-lg border-l-4 border-blue-600 bg-blue-50 p-3 sm:p-4">

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2">

            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full w-fit">
              OWNER REPLY
            </span>

            {canReply && (
              <button
                onClick={
                  handleDeleteReply
                }
                className="text-red-600 text-sm hover:underline text-left sm:text-right"
              >
                Delete Reply
              </button>
            )}

          </div>

          <p className="text-sm text-gray-700 break-words">
            {review.ownerReply}
          </p>

        </div>
      )}

      {/* Reply Box */}

      {canReply &&
        !review.ownerReply &&
        (replying ? (
          <div className="mt-4">

            <textarea
              rows={3}
              value={reply}
              onChange={(e) =>
                setReply(e.target.value)
              }
              placeholder="Write your reply..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex flex-col sm:flex-row gap-2 mt-3">

              <button
                onClick={handleReply}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Reply
              </button>

              <button
                onClick={() => {
                  setReplying(false);
                  setReply("");
                }}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

            </div>

          </div>
        ) : (
          <button
            onClick={() =>
              setReplying(true)
            }
            className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaReply />
            Reply
          </button>
        ))}

      {/* Likes / Dislikes */}

      <div className="flex items-center gap-3 mt-5 pt-4">

        <button
          onClick={() =>
            onLike(review._id)
          }
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-green-100 text-sm"
        >
          <FaThumbsUp />
          {review.likes?.length || 0}
        </button>

        <button
          onClick={() =>
            onDislike(review._id)
          }
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-red-100 text-sm"
        >
          <FaThumbsDown />
          {review.dislikes?.length || 0}
        </button>

      </div>

    </div>
  );
}

export default PGReviewCard;