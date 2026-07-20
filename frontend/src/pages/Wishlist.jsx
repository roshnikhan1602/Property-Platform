import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaHome,
  FaBed,
} from "react-icons/fa";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/wishlist",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setWishlist(data.wishlist);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (wishlistId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${wishlistId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setWishlist(
          wishlist.filter(
            (item) => item._id !== wishlistId
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20">
          Loading wishlist...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <FaArrowLeft className="inline mr-2" />
          Back
        </button>

        <h1 className="text-4xl font-bold">
          My Wishlist ❤️
        </h1>

        <p className="mt-2 text-gray-600">
          Your saved Properties & PGs
        </p>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No saved items yet.
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {wishlist.map((item) => {
              const listing = item.itemId;

              if (!listing) return null;

              return (
                <div
                  key={item._id}
                 className={`bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 ${
  listing.isActive && listing.listingAvailable
    ? "hover:shadow-xl"
    : "border-2 border-red-200 opacity-90"
}`}
                >

                  <div className="h-56 overflow-hidden">
                    {listing.images &&
                      listing.images.length > 0 ? (
                      <img
                        src={listing.images[0]}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                        {item.itemType === "Property" ? (
                          <FaHome className="text-5xl text-blue-600" />
                        ) : (
                          <FaBed className="text-5xl text-blue-600" />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="p-5">

                    <div className="flex justify-between items-start">

                      <h3 className="text-xl font-bold">
                        {listing.title}
                      </h3>

                      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                        {item.itemType}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-red-500" />
                      {listing.city}, {listing.state}
                    </p>

                    <div className="mt-3 h-24">
                      {listing.isActive &&
listing.listingAvailable ? (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 h-full">
                          <p className="text-green-600 font-semibold">
                            🟢 Available
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            Ready for booking/contact.
                          </p>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 h-full">
                         <p className="text-red-600 font-semibold">
  🔒 Listing Unavailable
</p>

<p className="text-sm text-gray-600 mt-1">
  {listing.listingAvailable
    ? `Reason: ${listing.deactivationReason}`
    : "Owner subscription has expired. The listing will become available once the subscription is renewed."}
</p>
                        </div>
                      )}
                    </div>

                    {item.itemType === "Property" ? (
                      <h4 className="text-2xl font-bold text-blue-600 mt-5">
                        ₹ {listing.price?.toLocaleString()}
                      </h4>
                    ) : (
                      <h4 className="text-2xl font-bold text-blue-600 mt-5">
                        ₹ {listing.rent?.toLocaleString()} / month
                      </h4>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-6">

                     <button
  disabled={
    !listing.isActive ||
    !listing.listingAvailable
  }
  onClick={() =>
    listing.isActive &&
    listing.listingAvailable &&
    navigate(
      item.itemType === "Property"
        ? `/properties/${listing._id}`
        : `/pgs/${listing._id}`
    )
  }
  className={`py-3 rounded-xl transition ${
    listing.isActive &&
    listing.listingAvailable
      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`}
>
  {listing.isActive &&
  listing.listingAvailable
    ? "View"
    : "Unavailable"}
</button>

                      <button
                        onClick={() =>
                          removeFromWishlist(item._id)
                        }
                        className="border border-red-500 text-red-500 py-3 rounded-xl hover:bg-red-500 hover:text-white transition cursor-pointer"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}

export default Wishlist;