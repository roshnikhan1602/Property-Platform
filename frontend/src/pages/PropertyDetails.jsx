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
} from "react-icons/fa";
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
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [showElevateModal, setShowElevateModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showShareModal, setShowShareModal] =
    useState(false);
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

    fetchUser();
    fetchProperty();
    loadReviews();
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
        <div className="rounded-2xl overflow-hidden">

          <div className="relative h-[650px] rounded-2xl overflow-hidden shadow-lg">
            {selectedImage ? (
              <>
                <img
                  src={selectedImage}
                  alt={property.title}
                  className="w-full h-full object-contain"
                />

                {property.images &&
                  property.images.length > 1 && (
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
              <div className="h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <p className="text-lg text-gray-600">
                  No Image Available
                </p>
              </div>
            )}
          </div>

          {property.images &&
            property.images.length > 1 && (

              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

                {property.images.map(
                  (image, index) => (

                    <img
                      key={index}
                      src={image}
                      alt={`Property ${index + 1}`}
                      onClick={() =>
                        setSelectedImage(image)
                      }
                      className={`w-28 h-20 rounded-lg object-cover cursor-pointer border-2 transition ${selectedImage === image
                        ? "border-blue-600"
                        : "border-transparent hover:border-gray-300"
                        }`}
                    />

                  )
                )}

              </div>

            )}

        </div>

        <div className="mt-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              {property.title}
            </h1>

            <p className="text-gray-600 mt-2">
              📍 {property.locality}, {property.address}, {property.city}, {property.state}
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              ₹{" "}
              {property.price.toLocaleString()}
            </h2>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Property Type
            </p>
            <h3 className="font-semibold">
              {property.propertyType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Listing Type
            </p>
            <h3 className="font-semibold">
              {property.listingType}
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Area
            </p>
            <h3 className="font-semibold">
              {property.area} sq.ft
            </h3>
          </div>

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Furnishing
            </p>
            <h3 className="font-semibold">
              {property.furnishing}
            </h3>
          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-10">

          {/* Description */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold mb-5">
              Description
            </h2>

            <p className="text-gray-700 leading-8">
              {property.description ||
                "No description available."}
            </p>

            {property.highlights?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6">
                {property.highlights
                  .flatMap((item) => item.split(","))
                  .map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm"
                    >
                      {item}
                    </span>
                  )
                  )}
              </div>
            )}
          </div>

          {/* Highlights */}
          {/* Highlights */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <FaStar className="text-yellow-500" />
              Highlights
            </h2>

            {property.amenities?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

                {property.amenities
                  .flatMap((item) => item.split(","))
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center border rounded-xl p-5 hover:bg-blue-50 transition"
                    >
                      <div className="text-3xl text-blue-600 mb-3">
                        {amenityIcons[item] || <FaHome />}
                      </div>

                      <p className="font-medium text-center">
                        {item}
                      </p>
                    </div>
                  ))}

              </div>
            ) : (
              <p className="text-gray-500">
                No highlights available.
              </p>
            )}
          </div>

        </div>
        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-8">
            Additional Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6">

            <div>
              <p className="text-sm text-gray-500">Bedrooms</p>
              <p className="font-semibold text-lg">
                {property.bedrooms}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Bathrooms</p>
              <p className="font-semibold text-lg">
                {property.bathrooms}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Area</p>
              <p className="font-semibold text-lg">
                {property.area} sq.ft
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Furnishing</p>
              <p className="font-semibold text-lg">
                {property.furnishing}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Floor</p>
              <p className="font-semibold text-lg">
                {property.floor || "-"} /
                {property.totalFloors || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Facing</p>
              <p className="font-semibold text-lg">
                {property.facing || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Parking</p>
              <p className="font-semibold text-lg">
                {property.parking || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Available From</p>
              <p className="font-semibold text-lg">
                {property.availableFrom || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Age of Property</p>
              <p className="font-semibold text-lg">
                {property.ageOfProperty || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Views</p>
              <p className="font-semibold text-lg">
                {property.views}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${property.isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
                  }`}
              >
                {property.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div>
              <p className="text-sm text-gray-500">Approval</p>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-semibold ${property.isApproved
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {property.isApproved ? "Approved" : "Pending"}
              </span>
            </div>

          </div>

        </div>


        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Owner Contact Details
          </h2>

          {user ? (
            contactAvailable ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-500">
                      Owner Name
                    </p>
                    <p className="font-semibold text-lg">
                      {property.ownerName ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Phone Number
                    </p>
                    <p className="font-semibold text-lg">
                      {property.ownerPhone ||
                        "Not Available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">
                      Email Address
                    </p>
                    <p className="font-semibold text-lg break-all">
                      {property.ownerEmail ||
                        "Not Available"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-8">
                  <a
                    href={`tel:${property.ownerPhone}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-green-700 transition"
                  >
                    📞 Call Owner
                  </a>

                  <a
                    href={`mailto:${property.ownerEmail}`}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-blue-700 transition"
                  >
                    ✉️ Email Owner
                  </a>
                </div>
              </>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                <div className="text-5xl mb-4">
                  🔒
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  Contact Details Unavailable
                </h3>

                <p className="text-gray-600 mt-3">
                  The owner's subscription has
                  expired.
                </p>

                <p className="text-gray-600">
                  Contact details will be available
                  again once the subscription is
                  renewed.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-6">
              <p className="text-lg text-gray-600 mb-4">
                Login to view owner contact
                details
              </p>

              <button
                onClick={() => {
                  window.location.href = "/";
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Login
              </button>
            </div>
          )}

        </div>

        {/* Location Map */}
        <div className="bg-white shadow rounded-2xl p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            📍 Property Location
          </h2>

          <div className="overflow-hidden rounded-xl border">

            <iframe
              title="Property Location"
              width="100%"
              height="400"
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                `${property.address}, ${property.locality}, ${property.city}, ${property.state}`
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            ></iframe>

          </div>

          <div className="mt-4 text-center">

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${property.address}, ${property.locality}, ${property.city}, ${property.state}`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Open in Google Maps
            </a>

          </div>

        </div>

        {/* Similar Properties + Share */}

        {/* Property Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <button
            onClick={() =>
              navigate(
                `/properties?type=${property.propertyType}&listingType=${property.listingType}`
              )
            }
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-indigo-700 transition"
          >
            View Similar Properties
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="bg-green-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-green-700 transition"
          >
            🔗 Share Property
          </button>

          <button
            onClick={() => navigate(`/property-ai/${property._id}`)}
            className="bg-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-purple-700 transition"
          >
            ✨ Elevate This Property
          </button>

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
      <Footer />
    </>
  );
}

export default PropertyDetails;