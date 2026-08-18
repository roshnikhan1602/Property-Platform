import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ShareModal from "../share/ShareModal";

import {
  FaBed,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWifi,
  FaUtensils,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaDumbbell,
  FaSwimmingPool,
  FaParking,
  FaBath,
} from "react-icons/fa";

import {
  MdElevator,
  MdLocalLaundryService,
  MdPower,
  MdDesk,
} from "react-icons/md";

import { PiDoorOpenFill } from "react-icons/pi";

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

function PGDetails({ setShowLoginModal }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [pg, setPg] = useState(null);
  const [contactAvailable, setContactAvailable] = useState(true);
  const [listingAvailable, setListingAvailable] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [showFullImage, setShowFullImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [user, setUser] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleNextImage = () => {
    const currentIndex = pg.images.indexOf(selectedImage);

    const nextIndex =
      (currentIndex + 1) % pg.images.length;

    setSelectedImage(pg.images[nextIndex]);
  };

  const handlePreviousImage = () => {
    const currentIndex = pg.images.indexOf(selectedImage);

    const previousIndex =
      (currentIndex - 1 + pg.images.length) %
      pg.images.length;

    setSelectedImage(pg.images[previousIndex]);
  };

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);

      const data = await getPGReviews(id);

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingReviews(false);
    }
  };

  const handleAddReview = async (reviewData) => {
    try {
      const data = await addReview({
        pgId: id,
        ...reviewData,
      });

      if (data.success) {
        loadReviews();

        const response = await fetch(
          `http://localhost:5000/api/pgs/${id}`
        );

        const result = await response.json();

        if (result.success) {
          setPg(result.pg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const data = await deleteReview(reviewId);

      if (data.success) {
        loadReviews();

        const response = await fetch(
          `http://localhost:5000/api/pgs/${id}`
        );

        const result = await response.json();

        if (result.success) {
          setPg(result.pg);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReply = async (reviewId, ownerReply) => {
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

  const handleDeleteReply = async (reviewId) => {
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

  const handleLike = async (reviewId) => {
    try {
      await toggleLike(reviewId);
      loadReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislike = async (reviewId) => {
    try {
      await toggleDislike(reviewId);
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

        const data = await response.json();

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

          setContactAvailable(
            data.contactAvailable
          );

          setListingAvailable(
            data.listingAvailable
          );

          loadReviews();

          if (
            data.pg.images &&
            data.pg.images.length > 0
          ) {
            setSelectedImage(data.pg.images[0]);
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
          setShowLoginModal={setShowLoginModal}
        />

        <div className="text-center py-20 text-gray-600">
          Loading PG Details...
        </div>

        <Footer />
      </>
    );
  }

  if (pg && !listingAvailable) {
    return (
      <>
        <Navbar
          setShowLoginModal={setShowLoginModal}
        />

        <div className="max-w-3xl mx-auto py-24 px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 text-center p-10">
            <div className="text-6xl mb-5">
              🔒
            </div>

            <h2 className="text-3xl font-bold">
              Listing Temporarily Unavailable
            </h2>

            <p className="text-gray-600 mt-4">
              This PG listing is currently unavailable
              because the owner's subscription has expired.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Back to PG Listings
            </button>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (!pg) {
    return (
      <>
        <Navbar
          setShowLoginModal={setShowLoginModal}
        />

        <div className="text-center py-20">
          PG Not Found
        </div>

        <Footer />
      </>
    );
  }

  const amenities = [
    {
      name: "WiFi",
      available: pg.wifiAvailable,
      icon: <FaWifi />,
    },
    {
      name: "AC",
      available: pg.acAvailable,
      icon: <FaSnowflake />,
    },
    {
      name: "Food",
      available: pg.foodAvailable,
      icon: <FaUtensils />,
    },
    {
      name: "TV",
      available: pg.tvAvailable,
      icon: <FaTv />,
    },
    {
      name: "Gym",
      available: pg.gymAvailable,
      icon: <FaDumbbell />,
    },
    {
      name: "Swimming Pool",
      available: pg.swimmingPoolAvailable,
      icon: <FaSwimmingPool />,
    },
    {
      name: "Parking",
      available: pg.parkingAvailable,
      icon: <FaParking />,
    },
    {
      name: "Lift",
      available: pg.liftAvailable,
      icon: <MdElevator />,
    },
    {
      name: "CCTV",
      available: pg.cctvAvailable,
      icon: <FaShieldAlt />,
    },
    {
      name: "Geyser",
      available: pg.geyserAvailable,
      icon: <MdPower />,
    },
    {
      name: "Laundry",
      available: pg.laundryAvailable,
      icon: <MdLocalLaundryService />,
    },
    {
      name: "Housekeeping",
      available: pg.housekeepingAvailable,
      icon: <FaBed />,
    },
    {
      name: "Power Backup",
      available: pg.powerBackupAvailable,
      icon: <MdPower />,
    },
    {
      name: "Study Table",
      available: pg.studyTableAvailable,
      icon: <MdDesk />,
    },
    {
      name: "Cupboard",
      available: pg.cupboardAvailable,
      icon: <PiDoorOpenFill />,
    },
    {
      name: "Attached Bathroom",
      available: pg.attachedBathroom,
      icon: <FaBath />,
    },
  ];

  const isOwner =
    user &&
    pg.owner &&
    String(pg.owner) === String(user._id);

  return (
    <>
      <Navbar
        setShowLoginModal={setShowLoginModal}
      />

      <main className="bg-gray-50 min-h-screen">
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-12">

          {/* BACK BUTTON */}
          <button
            onClick={() => {
              if (location.state?.fromAdmin) {
                navigate("/admin-dashboard");
              } else {
                navigate(-1);
              }
            }}
            className="mb-6 text-sm font-medium text-gray-600 hover:text-blue-600 transition"
          >
            ← Back to PGs
          </button>

          {/* ================= TOP SECTION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* IMAGE GALLERY */}
            <div>
              <div className="relative h-[430px] bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">

                {selectedImage ? (
                  <>
                    <img
                      src={selectedImage}
                      alt={pg.title}
                      onClick={() => setShowFullImage(true)}
                      className="w-full h-full object-cover cursor-pointer"
                    />

                    {pg.images &&
                      pg.images.length > 1 && (
                        <>
                          <button
                            onClick={handlePreviousImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:bg-white transition"
                          >
                            ‹
                          </button>

                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-xl hover:bg-white transition"
                          >
                            ›
                          </button>
                        </>
                      )}

                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                      {pg.images.indexOf(selectedImage) + 1} /{" "}
                      {pg.images.length}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center bg-blue-50 text-blue-600">
                    <FaBed className="text-6xl" />

                    <p className="mt-4 text-gray-600">
                      PG Image Coming Soon
                    </p>
                  </div>
                )}
              </div>

              {/* THUMBNAILS */}
              {pg.images &&
                pg.images.length > 1 && (
                  <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                    {pg.images.map(
                      (image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`PG ${index + 1}`}
                          onClick={() =>
                            setSelectedImage(image)
                          }
                          className={`w-24 h-16 rounded-lg object-cover cursor-pointer border-2 flex-shrink-0 transition ${selectedImage === image
                              ? "border-blue-600"
                              : "border-gray-200"
                            }`}
                        />
                      )
                    )}
                  </div>
                )}
            </div>

            {/* PG INFORMATION */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

              <div className="flex justify-between items-start gap-5">

                <div>
                  <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                    PG for{" "}
                    {pg.genderPreference ===
                      "Unisex"
                      ? "Co-live"
                      : pg.genderPreference}
                  </span>

                  <h1 className="text-4xl font-bold text-gray-900">
                    {pg.title}
                  </h1>

                  <div className="flex items-center gap-2 text-gray-500 mt-3">
                    <FaMapMarkerAlt className="text-blue-600 flex-shrink-0" />

                    <span>
                      {pg.locality},{" "}
                      {pg.city},{" "}
                      {pg.state}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-yellow-500">
                      ★
                    </span>

                    <span className="font-semibold">
                      {pg.averageRating?.toFixed(1) ||
                        "0.0"}
                    </span>

                    <span className="text-sm text-blue-600">
                      ({pg.totalReviews || 0} Reviews)
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowShareModal(true)}
                  className="border border-gray-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 transition"
                >
                  <span className="text-blue-600 text-base">↗</span>
                  Share
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Monthly Rent
                </p>

                <div className="flex items-end gap-2">
                  <h2 className="text-4xl font-bold text-blue-600">
                    ₹ {pg.rent?.toLocaleString()}
                  </h2>

                  <span className="text-gray-500 mb-1">
                    / month
                  </span>
                </div>
              </div>

              {/* ================= OVERVIEW ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">

                {/* Gender */}
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">
                    Gender
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {pg.genderPreference === "Unisex"
                      ? "Co-live"
                      : pg.genderPreference}
                  </p>
                </div>

                {/* Sharing */}
                <div className="rounded-xl bg-gray-50 border border-gray-200 p-4">
                  <p className="text-xs text-gray-500">
                    Sharing
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {pg.sharingType}
                  </p>
                </div>

                {/* Deposit */}
                <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
                  <p className="text-xs text-gray-500">
                    Deposit
                  </p>

                  <p className="font-semibold text-blue-600 mt-1">
                    ₹ {pg.depositAmount?.toLocaleString() || 0}
                  </p>
                </div>

              </div>
            </div>
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              About this PG
            </h2>

            <p className="text-gray-600 leading-7">
              {pg.description}
            </p>
          </div>
          {/* ================= AMENITIES ================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8">

            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Amenities & Facilities
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Everything available at this PG
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

              {amenities.map(
                (amenity, index) => (
                  <div
                    key={amenity.name}
                    className={`flex items-center gap-4 p-4 border-gray-100 ${index % 4 !== 3
                        ? "lg:border-r"
                        : ""
                      } ${index < 12
                        ? "border-b"
                        : ""
                      }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
                      {amenity.icon}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">
                        {amenity.name}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`w-2 h-2 rounded-full ${amenity.available
                              ? "bg-green-500"
                              : "bg-red-500"
                            }`}
                        />

                        <span
                          className={`text-xs font-medium ${amenity.available
                              ? "text-green-600"
                              : "text-red-600"
                            }`}
                        >
                          {amenity.available
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* ================= LOCATION ================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  PG Location
                </h2>

                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <FaMapMarkerAlt className="text-blue-600" />

                  <span>
                    {pg.locality},{" "}
                    {pg.city},{" "}
                    {pg.state}{" "}
                    {pg.pincode}
                  </span>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${pg.locality}, ${pg.city}, ${pg.state}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-5 py-2.5 rounded-lg text-sm font-medium transition text-center"
              >
                View on Google Maps ↗
              </a>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200">
              <iframe
                title="PG Location"
                width="100%"
                height="350"
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  `${pg.locality}, ${pg.city}, ${pg.state}`
                )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              />
            </div>
          </div>

          {/* ================= OWNER CONTACT ================= */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mt-7">

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px_260px] gap-5 items-start">

              {/* ================= OWNER DETAILS ================= */}
              <div>

                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Owner Contact
                </h2>

                {user ? (
                  contactAvailable ? (
                    <div className="flex items-center gap-5">

                      {/* PROFILE + NAME */}
                      <div className="flex items-center gap-4 min-w-[250px]">

                        <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-50 border border-gray-200 flex-shrink-0">

                          {pg.owner?.profileImage ? (
                            <img
                              src={pg.owner.profileImage}
                              alt={pg.owner.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-2xl font-bold text-blue-600">
                                {pg.ownerName?.charAt(0)?.toUpperCase()}
                              </span>
                            </div>
                          )}

                        </div>

                        <div>

                          <div className="flex items-center gap-2">

                            <h3 className="text-lg font-bold text-gray-900">
                              {pg.ownerName}
                            </h3>

                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap">
                              PG Owner
                            </span>

                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            PG Owner since{" "}
                            {pg.owner?.createdAt
                              ? new Date(pg.owner.createdAt).toLocaleDateString("en-US", {
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
                          <FaPhoneAlt className="inline mr-2 text-gray-700" />

                          <span className="font-medium">
                            Phone:
                          </span>{" "}
                          {pg.ownerPhone}
                        </p>

                        <p className="text-sm text-gray-700 whitespace-nowrap">
                          <FaEnvelope className="inline mr-2 text-gray-700" />

                          <span className="font-medium">
                            Email:
                          </span>{" "}
                          {pg.ownerEmail}
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
                        Contact details will become available once the
                        subscription is renewed.
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
                    href={`tel:${pg.ownerPhone}`}
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-blue-700 transition whitespace-nowrap"
                  >
                    <FaPhoneAlt className="inline mr-2" />
                    Call Owner
                  </a>

                  <a
                    href={`mailto:${pg.ownerEmail}`}
                    className="w-full border border-gray-200 text-blue-600 px-4 py-3 rounded-lg text-sm font-semibold text-center hover:bg-blue-50 transition whitespace-nowrap"
                  >
                    <FaEnvelope className="inline mr-2" />
                    Email Owner
                  </a>

                </div>
              )}


              {/* ================= VERIFIED PG ================= */}
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
                        Verified PG
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
        </section>
        {/* ================= REVIEWS ================= */}
        <div className="max-w-7xl mx-auto px-6 pb-12">
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
            canReply={isOwner}
            isOwner={isOwner}
            loadReviews={loadReviews}
          />
        </div>

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
              alt={pg.title}
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        )}

      </main>

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