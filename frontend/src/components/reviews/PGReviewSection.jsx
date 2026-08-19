import PGReviewForm from "./PGReviewForm";
import PGReviewCard from "./PGReviewCard";
import PGRatingStars from "./PGRatingStars";

function PGReviewSection({
  pg,
  user,
  reviews,
  loadingReviews,
  handleAddReview,
  handleDeleteReview,
  handleUpdateReview,
  handleLike,
  handleDislike,
  handleReply,
  handleDeleteReply,
  canReply,
  isOwner,
  loadReviews,
}) {
  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5).length,
    4: reviews.filter((review) => review.rating === 4).length,
    3: reviews.filter((review) => review.rating === 3).length,
    2: reviews.filter((review) => review.rating === 2).length,
    1: reviews.filter((review) => review.rating === 1).length,
  };

  return (
    <section className="mt-2">

      {/* ================= RATING SUMMARY ================= */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">

        {/* Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">
            Reviews & Ratings
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            See what people think about this PG.
          </p>
        </div>

        {/* ================= RATING + REVIEW FORM ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] items-start">

          {/* ================= LEFT : RATINGS ================= */}
          <div className="pr-7">

            <div className="flex items-center min-h-[250px]">

              {/* Overall Rating */}
              <div className="w-[150px] text-center border-r border-gray-200 pr-6">

                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {pg.averageRating?.toFixed(1) || "0.0"}
                </h1>

                <div className="flex justify-center mt-2">
                  <PGRatingStars
                    rating={pg.averageRating || 0}
                    readonly
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {pg.totalReviews || 0} Review
                  {pg.totalReviews !== 1 && "s"}
                </p>

              </div>

              {/* Rating Breakdown */}
              <div className="flex-1 pl-6 space-y-3">

                {[5, 4, 3, 2, 1].map((rating) => {

                  const count = ratingCounts[rating];

                  const percentage =
                    reviews.length > 0
                      ? (count / reviews.length) * 100
                      : 0;

                  return (
                    <div
                      key={rating}
                      className="flex items-center gap-2"
                    >

                      <span className="w-6 text-xs font-medium text-gray-600 text-right">
                        {rating}★
                      </span>

                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">

                        <div
                          className="h-full bg-green-500 rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                      <span className="w-4 text-xs text-gray-500">
                        {count}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>

          {/* ================= RIGHT : WRITE REVIEW ================= */}
          {user &&  (
            <div className="border-l border-gray-200 pl-7">

              <PGReviewForm
                onSubmit={handleAddReview}
                loading={loadingReviews}
              />

            </div>
          )}

        </div>

      </div>

      {/* ================= CUSTOMER REVIEWS ================= */}
      <div
        id="customer-reviews"
        className="mt-8"
      >

        <div className="flex justify-between items-center mb-5">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Customer Reviews
            </h2>

            <p className="text-sm text-gray-500">
              {reviews.length} Review
              {reviews.length !== 1 && "s"}
            </p>
          </div>

        </div>

        {loadingReviews ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-10 text-center text-gray-500">
            Loading reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-12 text-center">

            <div className="text-5xl mb-3">
              💬
            </div>

            <h3 className="text-xl font-semibold">
              No Reviews Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Be the first to share your experience.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {reviews.map((review) => (
              <PGReviewCard
                key={review._id}
                review={review}
                currentUser={user}
                onLike={handleLike}
                onDislike={handleDislike}
                onDelete={handleDeleteReview}
                onUpdate={handleUpdateReview}
                onReply={handleReply}
                onDeleteReply={handleDeleteReply}
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

export default PGReviewSection;