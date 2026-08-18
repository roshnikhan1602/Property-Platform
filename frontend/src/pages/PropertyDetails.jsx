import { useEffect, useState } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Toast from "../components/common/Toast";
import ShareModal from "../share/ShareModal";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewSection from "../components/reviews/ReviewSection";
import ElevatePropertyModal from "../components/ai/ElevatePropertyModal";
import BookVisitModal from "../components/visits/BookVisitModal";
import {
  addReview,
  getPropertyReviews,
  likeReview,
  dislikeReview,
  deleteReview,
  replyToReview,
} from "../services/reviewService";

import {
  FaStar,
  FaSwimmingPool,
  FaDumbbell,
  FaBolt,
  FaBuilding,
  FaCar,
  FaTree,
  FaHome,
  FaBed,
FaBath,
FaRulerCombined,
FaCouch,
FaCompass,
FaCalendarAlt,
FaEye,
FaClock,
} from "react-icons/fa";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
  checkWishlistStatus,
} from "../services/wishlistService";


import { MdElevator } from "react-icons/md";
import { FaShieldAlt } from "react-icons/fa";


function PropertyDetails({
  setShowLoginModal,
}) {

  const amenityIcons = {
    Gym: <FaDumbbell />,
    "Swimming Pool": <FaSwimmingPool />,
    Lift: <MdElevator />,
    "Power Backup": <FaBolt />,
    "Club House": <FaBuilding />,
    Parking: <FaCar />,
    Garden: <FaTree />,
    Security: <FaShieldAlt />,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [property, setProperty] = useState(null);
  const [contactAvailable, setContactAvailable] = useState(true);
  const [listingAvailable, setListingAvailable] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showFullImage, setShowFullImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showElevateModal, setShowElevateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showBookVisitModal, setShowBookVisitModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleNextImage = () => {
    const currentIndex =
      property.images.indexOf(selectedImage);

    const nextIndex =
      (currentIndex + 1) %
      property.images.length;

    setSelectedImage(
      property.images[nextIndex]
    );
  };

  const handlePreviousImage = () => {
    const currentIndex =
      property.images.indexOf(selectedImage);

    const previousIndex =
      (currentIndex -
        1 +
        property.images.length) %
      property.images.length;

    setSelectedImage(
      property.images[previousIndex]
    );
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleWishlist = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    try {
      setWishlistLoading(true);

      let response;

      if (isWishlisted) {
        response = await removeFromWishlist(
          property._id,
          "Property"
        );
      } else {
        response = await addToWishlist(
          property._id,
          "Property"
        );
      }

      if (response.success) {
        setIsWishlisted(!isWishlisted);

        setToast({
          show: true,
          message: isWishlisted
            ? "Removed from wishlist"
            : "Added to wishlist",
          type: "success",
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setWishlistLoading(false);
    }
  };
  const loadReviews = async () => {
    try {
      setLoadingReviews(true);

      const data = await getPropertyReviews(id);

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load reviews.",
        type: "error",
      });
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async ({
    rating,
    comment,
  }) => {
    if (!user) {
      setToast({
        show: true,
        message: "Please login first.",
        type: "error",
      });
      return;
    }

    const data = await addReview({
      propertyId: property._id,
      userId: user._id,
      userName:
        user.name ||
        `${user.firstName} ${user.lastName}`,
      userProfileImage:
        user.profileImage || "",
      rating,
      comment,
    });

    if (data.success) {
      setToast({
        show: true,
        message: "Review added successfully!",
        type: "success",
      });

      loadReviews();
    } else {
      setToast({
        show: true,
        message: data.message,
        type: "error",
      });
    }
  };
  const handleDeleteReview = async (
    reviewId
  ) => {

    const data = await deleteReview(reviewId);

    if (data.success) {
      setToast({
        show: true,
        message: "Review deleted successfully!",
        type: "success",
      });

      loadReviews();
    } else {
      setToast({
        show: true,
        message: data.message,
        type: "error",
      });
    }
  };

  const handleReply = async (
    reviewId,
    ownerReply
  ) => {
    const data = await replyToReview(
      reviewId,
      ownerReply
    );

    if (data.success) {
      setToast({
        show: true,
        message: "Reply added successfully!",
        type: "success",
      });

      loadReviews();
    } else {
      setToast({
        show: true,
        message: data.message,
        type: "error",
      });
    }
  };

  const handleLike = async (reviewId) => {
    if (!user) {
      setToast({
        show: true,
        message: "Please login first.",
        type: "error",
      });
      return;
    }

    await likeReview(reviewId);
    loadReviews();
  };

  const handleDislike = async (reviewId) => {
    if (!user) {
      setToast({
        show: true,
        message: "Please login first.",
        type: "error",
      });
      return;
    }

    await dislikeReview(reviewId);
    loadReviews();
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

    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/properties/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setProperty(data.property);
          console.log(data.property.amenities);
          console.log(data.property.highlights);

          setContactAvailable(
            data.contactAvailable ?? true
          );

          setListingAvailable(
            data.listingAvailable ?? true
          );

          if (
            data.property.images &&
            data.property.images.length > 0
          ) {
            setSelectedImage(
              data.property.images[0]
            );
          }

          await fetch(
            `http://localhost:5000/api/properties/${id}/view`,
            {
              method: "PUT",
              credentials: "include",
            }
          );

          // Recently Viewed Properties
          // Recently Viewed (Properties + PGs)
          const recentlyViewed =
            JSON.parse(
              localStorage.getItem("recentlyViewed")
            ) || [];

          const filteredItems =
            recentlyViewed.filter(
              (item) => item._id !== data.property._id
            );

          const updatedItems = [
            {
              ...data.property,
              itemType: "property",
            },
            ...filteredItems,
          ].slice(0, 5);

          localStorage.setItem(
            "recentlyViewed",
            JSON.stringify(updatedItems)
          );
        }
      } catch (error) {
        console.error(
          "Error fetching property:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    const loadWishlistStatus = async () => {
      try {
        const data = await checkWishlistStatus(
          id,
          "Property"
        );

        if (data.success) {
          setIsWishlisted(data.isWishlisted);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchProperty();
    loadReviews();
    loadWishlistStatus();
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
          <h2 className="text-xl text-gray-600">
            Loading property details...
          </h2>
        </div>
        <Footer />

      </>
    );
  }

  if (
    property &&
    !listingAvailable
  ) {
    return (
      <>
        <Navbar
          setShowLoginModal={
            setShowLoginModal
          }
        />

        <div className="max-w-3xl mx-auto py-24 px-6">
          <div className="bg-white rounded-2xl shadow-lg border text-center p-10">
            <div className="text-6xl mb-5">
              🔒
            </div>

            <h2 className="text-3xl font-bold text-gray-800">
              Listing Temporarily Unavailable
            </h2>

            <p className="text-gray-600 mt-5">
              This property is currently
              unavailable because the owner's
              subscription has expired.
            </p>

            <p className="text-gray-600 mt-2">
              Please check back once the owner
              renews the subscription.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Back to Properties
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Navbar
          setShowLoginModal={
            setShowLoginModal
          }
        />
        <div className="text-center py-20">
          <h2 className="text-xl text-gray-600">
            Property not found.
          </h2>
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

      <section className="max-w-7xl mx-auto px-6 py-10">
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
       {/* ================= TOP SECTION ================= */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

  {/* ================= IMAGE GALLERY ================= */}
  <div>

    <div className="relative h-[430px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

      {selectedImage ? (
        <>
          <img
  src={selectedImage}
  alt={property.title}
  onClick={() => setShowFullImage(true)}
  className="w-full h-full object-cover cursor-pointer"
/>

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 shadow-sm flex items-center justify-center hover:scale-105 transition cursor-pointer"
          >
            {isWishlisted ? (
              <FaHeart className="text-red-500 text-lg" />
            ) : (
              <FaRegHeart className="text-gray-600 text-lg" />
            )}
          </button>

          {/* Previous */}
          {property.images && property.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePreviousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:bg-white transition"
              >
                ‹
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:bg-white transition"
              >
                ›
              </button>
            </>
          )}

          {/* Image Count */}
          {property.images && property.images.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs">
              {property.images.indexOf(selectedImage) + 1} /{" "}
              {property.images.length}
            </div>
          )}
        </>
      ) : (
        <div className="h-full flex items-center justify-center bg-blue-50 text-gray-500">
          No Image Available
        </div>
      )}

    </div>

    {/* THUMBNAILS */}
    {property.images && property.images.length > 1 && (
      <div className="flex gap-3 mt-3 overflow-x-auto pb-1">

        {property.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Property ${index + 1}`}
            onClick={() => setSelectedImage(image)}
            className={`w-24 h-16 rounded-lg object-cover cursor-pointer border-2 flex-shrink-0 transition ${
              selectedImage === image
                ? "border-blue-600"
                : "border-gray-200 hover:border-gray-400"
            }`}
          />
        ))}

      </div>
    )}

  </div>

  {/* ================= PROPERTY INFORMATION ================= */}
  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

    <div className="flex justify-between items-start gap-5">

      <div>

        {/* Listing Type */}
        <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          {property.listingType}
        </span>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900">
          {property.title}
        </h1>

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-500 mt-3">

          <span className="text-blue-600">
            📍
          </span>

          <span>
            {property.locality}, {property.city},{" "}
            {property.state}
          </span>

        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">

          <FaStar className="text-yellow-500" />

          <span className="font-semibold text-gray-900">
            {property.averageRating?.toFixed(1) || "0.0"}
          </span>

          <span className="text-sm text-blue-600">
            ({property.totalReviews || 0} Reviews)
          </span>

        </div>

      </div>

      {/* Share */}
      <button
        type="button"
        onClick={handleShare}
        className="border border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition flex-shrink-0"
      >
        <span className="text-blue-600 mr-1">
          ↗
        </span>
        Share
      </button>

    </div>

    {/* PRICE */}
    <div className="mt-7 pt-6 border-t border-gray-100">

      <p className="text-sm text-gray-500">
        {property.listingType === "Rent"
          ? "Monthly Rent"
          : "Property Price"}
      </p>

      <div className="flex items-end gap-2">

        <h2 className="text-4xl font-bold text-blue-600">
          ₹ {property.price?.toLocaleString()}
        </h2>

        {property.listingType === "Rent" && (
          <span className="text-gray-500 mb-1">
            / month
          </span>
        )}

      </div>

    </div>

    {/* OVERVIEW */}
    <div className="grid grid-cols-2 gap-3 mt-7">

      {/* Property Type */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">

        <p className="text-xs text-gray-500">
          Property Type
        </p>

        <p className="font-semibold text-gray-900 mt-1">
          {property.propertyType}
        </p>

      </div>

      {/* Listing Type */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">

        <p className="text-xs text-gray-500">
          Listing Type
        </p>

        <p className="font-semibold text-gray-900 mt-1">
          {property.listingType}
        </p>

      </div>

      {/* Area */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">

        <p className="text-xs text-gray-500">
          Area
        </p>

        <p className="font-semibold text-gray-900 mt-1">
          {property.area} sq.ft
        </p>

      </div>

      {/* Furnishing */}
      <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">

        <p className="text-xs text-gray-500">
          Furnishing
        </p>

        <p className="font-semibold text-blue-600 mt-1">
          {property.furnishing}
        </p>

      </div>

    </div>

  </div>

</div>

        <div className="mt-10">

  {/* ================= DESCRIPTION + HIGHLIGHTS + AMENITIES ================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

  {/* ================= DESCRIPTION ================= */}
  <div>
    <h2 className="text-xl font-bold text-gray-900 mb-3">
      About this Property
    </h2>

    <p className="text-gray-600 leading-7">
      {property.description ||
        "No description available."}
    </p>
  </div>

  {/* ================= HIGHLIGHTS ================= */}
  {property.highlights?.length > 0 && (
    <div className="mt-7 pt-6 border-t border-gray-200">

      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Highlights
      </h3>

      <div className="flex flex-wrap gap-2">

        {property.highlights
          .flatMap((item) => item.split(","))
          .map((item, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium"
            >
              {item.trim()}
            </span>
          ))}

      </div>

    </div>
  )}

  {/* ================= AMENITIES ================= */}
  {property.amenities?.length > 0 && (
    <div className="mt-7 pt-6 border-t border-gray-200">

      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Amenities
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">

        {property.amenities
          .flatMap((item) => item.split(","))
          .map((item, index) => {

            const amenity = item.trim();

            return (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-gray-50 border border-gray-200 hover:bg-blue-50 transition"
              >

                <span className="text-blue-600 text-base">
                  {amenityIcons[amenity] || <FaHome />}
                </span>

                <span className="text-sm font-medium text-gray-700">
                  {amenity}
                </span>

              </div>
            );
          })}

      </div>

    </div>
  )}

</div>
        </div>
      {/* ================= ADDITIONAL DETAILS ================= */}
{/* ================= ADDITIONAL DETAILS ================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-10">

  <div className="mb-6">
    <h2 className="text-xl font-bold text-gray-900">
      Additional Details
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      More information about this property.
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

    {/* Bedrooms */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaBed />
        </div>

        <div>
          <p className="text-xs text-gray-500">Bedrooms</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.bedrooms || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Bathrooms */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaBath />
        </div>

        <div>
          <p className="text-xs text-gray-500">Bathrooms</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.bathrooms || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Area */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaRulerCombined />
        </div>

        <div>
          <p className="text-xs text-gray-500">Area</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.area ? `${property.area} sq.ft` : "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Furnishing */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaCouch />
        </div>

        <div>
          <p className="text-xs text-gray-500">Furnishing</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.furnishing || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Floor */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaBuilding />
        </div>

        <div>
          <p className="text-xs text-gray-500">Floor</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.floor || "-"} / {property.totalFloors || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Facing */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaCompass />
        </div>

        <div>
          <p className="text-xs text-gray-500">Facing</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.facing || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Parking */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaCar />
        </div>

        <div>
          <p className="text-xs text-gray-500">Parking</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.parking || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Available From */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaCalendarAlt />
        </div>

        <div>
          <p className="text-xs text-gray-500">Available From</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.availableFrom
              ? new Date(property.availableFrom).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Property Age */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaClock />
        </div>

        <div>
          <p className="text-xs text-gray-500">Property Age</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.ageOfProperty || "-"}
          </p>
        </div>
      </div>
    </div>

    {/* Views */}
    <div className="rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-200 hover:bg-blue-50/30 transition">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <FaEye />
        </div>

        <div>
          <p className="text-xs text-gray-500">Views</p>
          <p className="font-semibold text-gray-900 mt-1">
            {property.views || 0}
          </p>
        </div>
      </div>
    </div>

    {/* Status */}
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500 mb-2">
        Status
      </p>

      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
          property.isActive
            ? "bg-green-50 text-green-700 border border-green-100"
            : "bg-red-50 text-red-700 border border-red-100"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            property.isActive ? "bg-green-500" : "bg-red-500"
          }`}
        />
        {property.isActive ? "Active" : "Inactive"}
      </span>
    </div>

    {/* Approval */}
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs text-gray-500 mb-2">
        Approval
      </p>

      <span
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${
          property.isApproved
            ? "bg-blue-50 text-blue-700 border border-blue-100"
            : "bg-yellow-50 text-yellow-700 border border-yellow-100"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            property.isApproved
              ? "bg-blue-500"
              : "bg-yellow-500"
          }`}
        />
        {property.isApproved ? "Approved" : "Pending"}
      </span>
    </div>

  </div>
</div>


        {/* ================= OWNER CONTACT ================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-7">

  <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_260px] gap-5 items-center">

    {/* ================= OWNER DETAILS ================= */}
    <div>

      <h2 className="text-xl font-bold text-gray-900 mb-5">
        Owner Contact
      </h2>

      {user ? (
        contactAvailable ? (
          <div className="flex items-center gap-5">

            {/* PROFILE + NAME */}
            <div className="flex items-center gap-4 min-w-[250px]">

              <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-50 border border-gray-200 flex-shrink-0">

                {property.owner?.profileImage ? (
                  <img
                    src={property.owner.profileImage}
                    alt={property.owner.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-600">
                      {property.ownerName?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                )}

              </div>

              <div>

                <div className="flex items-center gap-2">

                  <h3 className="text-lg font-bold text-gray-900">
                    {property.ownerName || "Owner"}
                  </h3>

                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                    Property Owner
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Property Owner since{" "}
                  {property.owner?.createdAt
                    ? new Date(
                        property.owner.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </p>

              </div>

            </div>

            {/* SEPARATOR */}
            <div className="hidden sm:block h-14 w-px bg-gray-200"></div>

            {/* CONTACT INFORMATION */}
            <div className="space-y-2 min-w-0">

              <p className="text-sm text-gray-700 whitespace-nowrap">
                <span className="mr-2">📞</span>
                <span className="font-medium">
                  Phone:
                </span>{" "}
                {property.ownerPhone || "Not Available"}
              </p>

              <p className="text-sm text-gray-700 whitespace-nowrap">
                <span className="mr-2">✉️</span>
                <span className="font-medium">
                  Email:
                </span>{" "}
                {property.ownerEmail || "Not Available"}
              </p>

            </div>

          </div>
        ) : (

          /* CONTACT UNAVAILABLE */
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">

            <div className="text-3xl mb-3">
              🔒
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              Contact Details Unavailable
            </h3>

            <p className="text-sm text-gray-600 mt-2">
              The owner's subscription has expired.
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Contact details will become available once
              the subscription is renewed.
            </p>

          </div>

        )
      ) : (

        /* LOGIN REQUIRED */
        <div className="text-center py-5">

          <p className="text-sm text-gray-600 mb-3">
            Login to view owner details
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>

        </div>

      )}

    </div>


    {/* ================= CONTACT BUTTONS ================= */}
    {user && contactAvailable && (
      <div className="flex flex-col gap-3 self-center">

        <a
          href={`tel:${property.ownerPhone}`}
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-blue-700 transition whitespace-nowrap"
        >
          📞 Call Owner
        </a>

        <a
          href={`mailto:${property.ownerEmail}`}
          className="w-full border border-gray-200 text-blue-600 px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-blue-50 transition whitespace-nowrap"
        >
          ✉️ Email Owner
        </a>

      </div>
    )}


    {/* ================= VERIFIED PROPERTY ================= */}
    {user && contactAvailable && (
      <div className="bg-blue-50/60 border border-gray-200 rounded-xl p-5 self-center">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">
              🛡️
            </span>
          </div>

          <div>

            <h3 className="font-bold text-gray-900">
              Verified Property
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              Trusted listing
            </p>

          </div>

        </div>

        <div className="space-y-3">

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-700">
              Identity Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-700">
              Property Verified
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-700">
              Trusted Listing
            </span>
          </div>

        </div>

      </div>
    )}

  </div>

</div>

       {/* ================= PROPERTY LOCATION ================= */}
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-10">

  <div className="mb-5">
    <h2 className="text-xl font-bold text-gray-900">
      Property Location
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      View the property location on the map.
    </p>
  </div>

  {/* Map */}
  <div className="overflow-hidden rounded-xl border border-gray-200">

    <iframe
      title="Property Location"
      width="100%"
      height="350"
      loading="lazy"
      allowFullScreen
      src={`https://maps.google.com/maps?q=${encodeURIComponent(
        `${property.address}, ${property.locality}, ${property.city}, ${property.state}`
      )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
    ></iframe>

  </div>

  {/* Address + Button */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">

    <div className="flex items-start gap-2">

      <span className="text-blue-600 text-lg">
        📍
      </span>

      <p className="text-sm text-gray-600">
        {property.address}, {property.locality},{" "}
        {property.city}, {property.state}
      </p>

    </div>

    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${property.address}, ${property.locality}, ${property.city}, ${property.state}`
      )}`}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition whitespace-nowrap"
    >
      Open in Google Maps
    </a>

  </div>

</div>

    {/* ================= PROPERTY ACTIONS ================= */}
<div className="mt-8 flex flex-wrap justify-center gap-3">

  {/* Similar Properties */}
  <button
    onClick={() =>
      navigate(
        `/properties?type=${property.propertyType}&listingType=${property.listingType}`
      )
    }
    className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition"
  >
    <span>🏠</span>
    View Similar Properties
  </button>



  {/* Book Visit */}
  {String(user?._id) !== String(property?.owner) && (
    <button
      onClick={() => {
        if (!user) {
          setShowLoginModal(true);
          return;
        }

        setShowBookVisitModal(true);
      }}
      className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
    >
      <span>📅</span>
      Book Visit
    </button>
  )}

 

</div>
        <ReviewSection
          property={property}
          user={user}
          reviews={reviews}
          loadingReviews={loadingReviews}
          handleAddReview={handleAddReview}
          handleDeleteReview={handleDeleteReview}
          handleLike={handleLike}
          handleDislike={handleDislike}
          handleReply={handleReply}
          canReply={
            user &&
            user.role === "owner" &&
            String(property.owner) === String(user._id)
          }
          isOwner={
            user &&
            String(property.owner) === String(user._id)
          }
          loadReviews={loadReviews}
        />
      </section>
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}

<BookVisitModal
  isOpen={showBookVisitModal}
  onClose={() => setShowBookVisitModal(false)}
  property={property}
/>

      <ShareModal
        isOpen={showShareModal}
        onClose={() =>
          setShowShareModal(false)
        }
        title={property.title}
        location={`${property.locality}, ${property.city}, ${property.state}`}
        price={property.price}
        url={window.location.href}
      />
      <ElevatePropertyModal
        isOpen={showElevateModal}
        onClose={() =>
          setShowElevateModal(false)
        }
        propertyImage={selectedImage}
      />
      {showFullImage && selectedImage && (
  <div
    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
    onClick={() => setShowFullImage(false)}
  >
    <button
      type="button"
      onClick={() => setShowFullImage(false)}
      className="absolute top-5 right-6 text-white text-3xl hover:text-gray-300"
    >
      ×
    </button>

    <img
      src={selectedImage}
      alt={property.title}
      onClick={(e) => e.stopPropagation()}
      className="max-w-full max-h-[90vh] object-contain rounded-lg"
    />
  </div>
)}
      <Footer />
    </>
  );
}

export default PropertyDetails;