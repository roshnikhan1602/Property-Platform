import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEye,
  FaPlus,
  FaTrash,
  FaEdit,
  FaExternalLinkAlt,
  FaBed,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function MyPGs() {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const fetchMyPGs = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/pgs/my-pgs/${user._id}`
      );

      const data = await response.json();

      if (data.success) {
        setPgs(data.pgs);
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to load PGs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyPGs();
    }
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this PG?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/pgs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (data.success) {
        setPgs(
          pgs.filter((pg) => pg._id !== id)
        );

        setSuccessMessage(
          "PG deleted successfully"
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to delete PG"
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-4xl font-bold">
            My PGs
          </h1>

          <Link
            to="/add-pg"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
          >
            <FaPlus />
            Add PG
          </Link>

        </div>

        {successMessage && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
            {errorMessage}
          </div>
        )}

        {loading ? (
          <h2 className="text-center text-gray-500">
            Loading...
          </h2>
        ) : pgs.length === 0 ? (
          <div className="text-center py-16">

            <h2 className="text-2xl font-semibold text-gray-700">
              No PGs Found
            </h2>

            <p className="text-gray-500 mt-2">
              Start by adding your first PG.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pgs.map((pg) => (
              <div
                key={pg._id}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition"
              >

                <div className="h-52 rounded-xl overflow-hidden mb-4">

                  {pg.images && pg.images.length > 0 ? (
                    <img
                      src={pg.images[0]}
                      alt={pg.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <FaBed className="text-5xl text-blue-600" />
                    </div>
                  )}

                </div>

                <h2 className="text-xl font-bold text-gray-800">
                  {pg.title}
                </h2>

                <p className="text-gray-500 mt-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  {pg.city}, {pg.state}
                </p>

                <div className="mt-4">

                  <p className="text-green-600 font-bold text-2xl">
                    ₹ {pg.rent?.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    Deposit: ₹{" "}
                    {pg.depositAmount?.toLocaleString() || 0}
                  </p>

                  <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                    <FaEye />
                    {pg.views || 0} Views
                  </p>

                </div>

                <div className="flex gap-2 mt-5">

                  <Link
                    to={`/pgs/${pg._id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    View
                  </Link>
                  <Link
                    to={`/edit-pg/${pg._id}`}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg text-sm hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                  >
                    <FaEdit />
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      handleDelete(pg._id)
                    }
                    className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg text-sm hover:bg-red-200 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FaTrash />
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

export default MyPGs;