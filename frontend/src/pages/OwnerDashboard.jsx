import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function OwnerDashboard() {
  const [user, setUser] = useState(null);

  const [totalProperties, setTotalProperties] =
    useState(0);

  const [totalPGs, setTotalPGs] =
    useState(0);

  const [totalViews, setTotalViews] =
    useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (!loggedInUser) return;

    setUser(loggedInUser);

    fetchDashboardData(loggedInUser._id);
  }, []);

  const fetchDashboardData = async (
    userId
  ) => {
    try {
      const [
        propertyResponse,
        pgResponse,
      ] = await Promise.all([
        fetch(
          `http://localhost:5000/api/properties/my-properties/${userId}`
        ),
        fetch(
          `http://localhost:5000/api/pgs/my-pgs/${userId}`
        ),
      ]);

      const propertyData =
        await propertyResponse.json();

      const pgData =
        await pgResponse.json();

      let properties = [];
      let pgs = [];

      if (propertyData.success) {
        properties =
          propertyData.properties || [];
      }

      if (pgData.success) {
        pgs = pgData.pgs || [];
      }

      setTotalProperties(
        properties.length
      );

      setTotalPGs(pgs.length);

      const propertyViews =
        properties.reduce(
          (total, property) =>
            total +
            (property.views || 0),
          0
        );

      const pgViews = pgs.reduce(
        (total, pg) =>
          total + (pg.views || 0),
        0
      );

      setTotalViews(
        propertyViews + pgViews
      );
    } catch (error) {
      console.error(error);
    }
  };

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

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-lg text-gray-500">
              Total Properties
            </h2>

            <p className="text-5xl font-bold text-blue-600 mt-3">
              {totalProperties}
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-8">
            <h2 className="text-lg text-gray-500">
              Total PGs
            </h2>

            <p className="text-5xl font-bold text-purple-600 mt-3">
              {totalPGs}
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
            to="/my-pgs"
            className="bg-purple-600 text-white px-8 py-4 rounded-xl font-medium text-center hover:bg-purple-700 transition"
          >
            My PGs
          </Link>

          <Link
            to="/add-property"
            className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium text-center hover:bg-green-700 transition"
          >
            Add Property
          </Link>

          <Link
            to="/add-pg"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-center hover:bg-indigo-700 transition"
          >
            Add PG
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default OwnerDashboard;