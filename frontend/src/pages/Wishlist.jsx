import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "507f1f77bcf86cd799439011";

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishlist/${userId}`
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
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Property removed from wishlist");

        setWishlist(
          wishlist.filter(
            (item) => item._id !== wishlistId
          )
        );
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
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

  const validWishlist = wishlist.filter(
    (item) => item.propertyId
  );

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          My Wishlist ❤️
        </h1>

        <p className="mt-2 text-gray-600">
          Your saved properties
        </p>

        {validWishlist.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No saved properties yet.
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

            {validWishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >

                <div className="h-56 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-5xl">
                    🏠
                  </div>
                </div>

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {item.propertyId?.title}
                  </h3>

                  <p className="text-gray-500 mt-2">
                    📍 {item.propertyId?.city},{" "}
                    {item.propertyId?.state}
                  </p>

                  <h4 className="text-2xl font-bold text-blue-600 mt-4">
                    ₹ {item.propertyId?.price?.toLocaleString()}
                  </h4>

                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <button
                      onClick={() =>
                        navigate(
                          `/properties/${item.propertyId?._id}`
                        )
                      }
                      className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                    >
                      View
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
            ))}

          </div>
        )}

      </section>

      <Footer />
    </>
  );
}

export default Wishlist;