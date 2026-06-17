import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function OwnerDashboard() {
  const [user, setUser] = useState(null);

  const [totalProperties, setTotalProperties] =
    useState(0);

  const [totalViews, setTotalViews] =
    useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (loggedInUser) {
      setUser(loggedInUser);

      fetch(
        `http://localhost:5000/api/properties/my-properties/${loggedInUser._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotalProperties(
              data.properties.length
            );

            const views =
              data.properties.reduce(
                (total, property) =>
                  total +
                  (property.views || 0),
                0
              );

            setTotalViews(views);
          }
        })
        .catch((err) =>
          console.error(err)
        );
    }
  }, []);

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-2">
          Owner Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          Welcome back, {user?.name} 👋
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-lg text-gray-500">
              Total Properties Posted
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-3">
              {totalProperties}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-lg text-gray-500">
              Total Views
            </h2>

            <p className="text-5xl font-bold text-green-600 mt-3">
              {totalViews}
            </p>
          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-10">

          <Link
            to="/my-properties"
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium text-center hover:bg-blue-700 transition"
          >
            My Properties
          </Link>

          <Link
            to="/add-property"
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-center hover:bg-green-700 transition"
          >
            Add Property
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default OwnerDashboard;