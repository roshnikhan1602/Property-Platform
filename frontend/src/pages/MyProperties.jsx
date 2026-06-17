import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchMyProperties = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/my-properties/${user._id}`
      );

      const data = await response.json();

      if (data.success) {
        setProperties(data.properties);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyProperties();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Property deleted successfully");

        setProperties(
          properties.filter(
            (property) => property._id !== id
          )
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete property");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            My Properties
          </h1>

          <Link
            to="/add-property"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Add Property
          </Link>

        </div>

        {loading ? (
          <h2 className="text-center text-gray-500">
            Loading...
          </h2>
        ) : properties.length === 0 ? (
          <h2 className="text-center text-gray-500">
            No properties found.
          </h2>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-bold text-gray-800">
                  {property.title}
                </h2>

                <p className="text-gray-500 mt-2">
                  📍 {property.city}, {property.state}
                </p>

                <p className="text-blue-600 font-bold text-2xl mt-4">
                  ₹ {property.price.toLocaleString()}
                </p>

                <div className="flex gap-2 mt-5">

                  <Link
                    to={`/properties/${property._id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit-property/${property._id}`}
                    className="flex-1 bg-gray-100 text-gray-700 text-center py-2 rounded-lg text-sm hover:bg-gray-200 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        property._id
                      )
                    }
                    className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm hover:bg-red-200 transition"
                  >
                    Delete
                  </button>

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

export default MyProperties;