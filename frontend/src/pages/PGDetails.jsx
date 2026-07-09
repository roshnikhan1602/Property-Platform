import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShareModal from "../share/ShareModal";
import {
  FaBed,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import PGReviewSection from "../components/reviews/PGReviewSection";

import {
  getPGReviews,
  addReview,
  deleteReview,
  updateReview,
  replyToReview,
  deleteReply,
  toggleLike,
  toggleDislike,
} from "../services/pgReviewService";

function PGDetails({
  setShowLoginModal,
}) {
  const { id } = useParams();

  const navigate = useNavigate();
const location = useLocation();
  const [pg, setPg] = useState(null);
  const [selectedImage, setSelectedImage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

    const [reviews, setReviews] =
  useState([]);

const [loadingReviews, setLoadingReviews] =
  useState(false);
const [user, setUser] = useState(null);
const [showShareModal, setShowShareModal] =
  useState(false);

  const handleNextImage = () => {
    const currentIndex =
      pg.images.indexOf(selectedImage);

    const nextIndex =
      (currentIndex + 1) %
      pg.images.length;

    setSelectedImage(
      pg.images[nextIndex]
    );
  };

  const handlePreviousImage = () => {
    const currentIndex =
      pg.images.indexOf(selectedImage);

    const previousIndex =
      (currentIndex -
        1 +
        pg.images.length) %
      pg.images.length;

    setSelectedImage(
      pg.images[previousIndex]
    );
  };
  
  const loadReviews = async () => {
  try {
    setLoadingReviews(true);

    const data =
      await getPGReviews(id);

    if (data.success) {
      setReviews(data.reviews);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoadingReviews(false);
  }
};

const handleAddReview =
  async (reviewData) => {
    try {
      const data =
        await addReview({
          pgId: id,
          ...reviewData,
        });

      if (data.success) {
        loadReviews();

        const response =
          await fetch(
            `http://localhost:5000/api/pgs/${id}`
          );

        const result =
          await response.json();

        if (result.success) {
          setPg(result.pg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

const handleDeleteReview =
  async (reviewId) => {
    try {
      const data =
        await deleteReview(
          reviewId
        );

      if (data.success) {
        loadReviews();

        const response =
          await fetch(
            `http://localhost:5000/api/pgs/${id}`
          );

        const result =
          await response.json();

        if (result.success) {
          setPg(result.pg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleReply = async (
  reviewId,
  ownerReply
) => {
  try {
    const data = await replyToReview(
      reviewId,
      ownerReply
    );

    if (data.success) {
      loadReviews();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleDeleteReply = async (
  reviewId
) => {
  try {
    const data = await deleteReply(reviewId);

    if (data.success) {
      loadReviews();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleUpdateReview = async (
  reviewId,
  reviewData
) => {
  try {
    const data = await updateReview(
      reviewId,
      reviewData
    );

    if (data.success) {
      loadReviews();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleLike = async (
  reviewId
) => {
  try {
    await toggleLike(reviewId);

    loadReviews();
  } catch (error) {
    console.error(error);
  }
};

const handleDislike = async (
  reviewId
) => {
  try {
    await toggleDislike(
      reviewId
    );

    loadReviews();
  } catch (error) {
    console.error(error);
  }
};
  
  useEffect(() => {
    const fetchUser = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.success) {
      setUser(data.user);
    }
  } catch (error) {
    console.error(error);
  }
};

    const fetchPG = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pgs/${id}`
        );

        const data =
          await response.json();

        if (data.success) {
          const recentlyViewed =
              JSON.parse(
                localStorage.getItem("recentlyViewed")
              ) || [];

            const filteredItems =
              recentlyViewed.filter(
                (item) => item._id !== data.pg._id
              );

            const updatedItems = [
              {
                ...data.pg,
                itemType: "pg",
              },
              ...filteredItems,
            ].slice(0, 5);

            localStorage.setItem(
              "recentlyViewed",
              JSON.stringify(updatedItems)
            );
          setPg(data.pg);

          loadReviews();

          if (
            data.pg.images &&
            data.pg.images.length > 0
          ) {
            setSelectedImage(
              data.pg.images[0]
            );
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
fetchPG();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar
          setShowLoginModal={
            setShowLoginModal
          }
        />
        <div className="text-center py-20">
          Loading PG Details...
        </div>
        <Footer />
      </>
    );
  }

  if (!pg) {
    return (
      <>
        <Navbar
          setShowLoginModal={
            setShowLoginModal
          }
        />
        <div className="text-center py-20">
          PG Not Found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar
        setShowLoginModal={
          setShowLoginModal
        }
      />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">
<div className="mb-6">
  <button
    onClick={() => {
      if (location.state?.fromAdmin) {
        navigate("/admin-dashboard");
      } else {
        navigate(-1);
      }
    }}
    className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-lg font-medium transition"
  >
    ← Back
  </button>
</div>
        <div className="relative h-[500px] rounded-2xl overflow-hidden border">

          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt={pg.title}
                className="w-full h-full object-contain"
              />

              {pg.images &&
                pg.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-2xl transition"
                    >
                      ‹
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/80 hover:bg-white shadow-lg flex items-center justify-center text-2xl transition"
                    >
                      ›
                    </button>
                  </>
                )}
            </>
          ) : (
            <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex flex-col items-center justify-center">

              <div className="text-7xl">
                <FaBed />
              </div>

              <p className="mt-4 text-gray-600 text-lg">
                PG Image Coming Soon
              </p>

            </div>
          )}

        </div>
        {pg.images &&
          pg.images.length > 1 && (
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {pg.images.map(
                (image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`PG ${index + 1}`}
                    onClick={() =>
                      setSelectedImage(image)
                    }
                    className={`w-28 h-20 rounded-lg object-cover cursor-pointer border-2 transition ${selectedImage === image
                        ? "border-blue-600"
                        : "border-transparent"
                      }`}
                  />
                )
              )}
            </div>
          )}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              {pg.title}
            </h1>

            <p className="text-gray-600 mt-2">
              <FaMapMarkerAlt /> {pg.locality},{" "}
              {pg.city},{" "}
              {pg.state}
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              ₹ {pg.rent?.toLocaleString()}
            </h2>

            <p className="text-gray-500 text-sm">
              Per Month
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Gender
            </p>

            <h3 className="font-semibold">
              {pg.genderPreference ===
                "Unisex"
                ? "Co-live"
                : pg.genderPreference}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Sharing
            </p>

            <h3 className="font-semibold">
              {pg.sharingType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              City
            </p>

            <h3 className="font-semibold">
              {pg.city}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Pincode
            </p>

            <h3 className="font-semibold">
              {pg.pincode}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Deposit
            </p>

            <h3 className="font-semibold text-blue-600">
              ₹{" "}
              {pg.depositAmount?.toLocaleString() ||
                0}
            </h3>
          </div>

        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-4">
            Description
          </h2>

          <p className="text-gray-700">
            {pg.description}
          </p>

        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Amenities
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

            <div>
              <p className="text-gray-500">
                WiFi
              </p>

              <p className="font-semibold">
                {pg.wifiAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                AC
              </p>

              <p className="font-semibold">
                {pg.acAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>

            <div>
              <p className="text-gray-500">
                Food
              </p>

              <p className="font-semibold">
                {pg.foodAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>

 <div>
              <p className="text-gray-500">
                Gym
              </p>

              <p className="font-semibold">
                {pg.gymAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
             <div>
              <p className="text-gray-500">
              Swimming Pool
              </p>

              <p className="font-semibold">
                {pg.swimmingPoolAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
             <div>
              <p className="text-gray-500">
                TV
              </p>

              <p className="font-semibold">
                {pg.tvAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
             <div>
              <p className="text-gray-500">
                CCTV
              </p>

              <p className="font-semibold">
                {pg.cctvAvailable
                  ? "Available"
                  : "Not Available"}
              </p>
            </div>
          </div>

        </div>
        <div className="bg-white shadow rounded-2xl p-6 mt-10">

         <h2 className="text-2xl font-bold mb-6">
  <FaMapMarkerAlt /> PG Location
</h2>

<div className="overflow-hidden rounded-xl border">

  <iframe
    title="PG Location"
    width="100%"
    height="400"
    loading="lazy"
    allowFullScreen
    src={`https://maps.google.com/maps?q=${encodeURIComponent(
      `${pg.locality}, ${pg.city}, ${pg.state}`
    )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
  ></iframe>

</div>

          <div className="mt-4 text-center">

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${pg.locality}, ${pg.city}, ${pg.state}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Open in Google Maps
            </a>

          </div>

        </div>

        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Owner Contact
          </h2>

          {user ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <p className="text-gray-500">
                    Owner Name
                  </p>

                  <p className="font-semibold">
                    {pg.ownerName}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Phone
                  </p>

                  <p className="font-semibold">
                    {pg.ownerPhone}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">
                    Email
                  </p>

                  <p className="font-semibold break-all">
                    {pg.ownerEmail}
                  </p>
                </div>

              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-8">

                <a
                  href={`tel:${pg.ownerPhone}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition"
                >
                <FaPhoneAlt className="inline mr-2" />
Call Owner  
                </a>

                <a
                  href={`mailto:${pg.ownerEmail}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition"
                >
                 <FaEnvelope className="inline mr-2" />
Email Owner
                </a>

              </div>
            </>
          ) : (
            <div className="text-center py-4">

              <p className="text-gray-600 mb-4">
                Login to view owner details
              </p>

              <button
                onClick={() =>
                  navigate("/")
                }
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
              >
                Login
              </button>

            </div>
          )}

        </div>
      <div className="mt-10 flex justify-center">
  <button
    onClick={() =>
      setShowShareModal(true)
    }
    className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition"
  >
    🔗 Share PG
  </button>
</div>
      </section>
<PGReviewSection
  pg={pg}
  user={user}
  reviews={reviews}
  loadingReviews={loadingReviews}
  handleAddReview={handleAddReview}
  handleDeleteReview={handleDeleteReview}
  handleUpdateReview={handleUpdateReview}
  handleLike={handleLike}
  handleDislike={handleDislike}
  handleReply={handleReply}
  handleDeleteReply={handleDeleteReply}
  canReply={
    user &&
    pg &&
    pg.owner &&
    pg.owner.toString() === user._id
  }
  loadReviews={loadReviews}
/>
<ShareModal
  isOpen={showShareModal}
  onClose={() =>
    setShowShareModal(false)
  }
  title={pg.title}
  location={`${pg.locality}, ${pg.city}, ${pg.state}`}
  price={pg.rent}
  url={window.location.href}
/>
      <Footer />
    </>
  );
}

export default PGDetails;