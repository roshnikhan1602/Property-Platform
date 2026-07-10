import ReviewForm from "./ReviewForm";
import ReviewCard from "./ReviewCard";
import RatingStars from "./RatingStars";

function ReviewSection({
  property,
  user,
  reviews,
  loadingReviews,
  handleAddReview,
  handleDeleteReview,
  handleLike,
  handleDislike,
  handleReply,
  canReply,
  loadReviews,
}) {
  const isOwner =
    user &&
    property &&
    String(property.owner) === String(user._id);

  return (
    <section className="mt-10">
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-3xl font-bold">
              Reviews & Ratings
            </h2>

            <p className="text-blue-100 mt-1">
              See what people think about this
              property.
            </p>

            <div className="flex -space-x-3 mt-5">
              {reviews
                .slice(0, 5)
                .map((review) =>
                  review.userProfileImage ? (
                    <img
                      key={review._id}
                      src={review.userProfileImage}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div
                      key={review._id}
                      className="w-10 h-10 rounded-full border-2 border-white bg-white text-blue-600 font-bold flex items-center justify-center"
                    >
                      {review.userName?.charAt(0)}
                    </div>
                  )
                )}
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold">
              {property.averageRating?.toFixed(1) ||
                "0.0"}
            </h1>

            <div className="flex justify-center mt-2">
              <RatingStars
                rating={
                  property.averageRating || 0
                }
                readonly
              />
            </div>

            <p className="text-blue-100 mt-2">
              Based on{" "}
              <span className="font-semibold">
                {property.totalReviews || 0}
              </span>{" "}
              review
              {property.totalReviews !== 1 &&
                "s"}
            </p>
          </div>
        </div>
      </div>

      {/* Review Form */}
      {user && !isOwner && (
        <div className="mt-6">
          <ReviewForm
            onSubmit={handleAddReview}
            loading={loadingReviews}
          />
        </div>
      )}

      

      <div className="mt-10">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-2xl font-semibold">
              Customer Reviews
            </h2>

            <p className="text-sm text-gray-500">
              {reviews.length} Review
              {reviews.length !== 1 && "s"}
            </p>
          </div>
        </div>

        {loadingReviews ? (
          <div className="bg-white rounded-xl shadow-sm border p-10 text-center text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl border shadow-sm p-12 text-center">
            <div className="text-5xl mb-3">
              💬
            </div>

            <h3 className="text-xl font-semibold">
              No Reviews Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Be the first to share your
              experience.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUser={user}
                onLike={handleLike}
                onDislike={handleDislike}
                onDelete={handleDeleteReview}
                onReply={handleReply}
                canReply={canReply}
                onUpdated={loadReviews}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewSection;