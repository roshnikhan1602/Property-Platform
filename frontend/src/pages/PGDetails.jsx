import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function PGDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pg, setPg] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pgs/${id}`
        );

        const data =
          await response.json();

        if (data.success) {
          setPg(data.pg);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPG();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
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
        <Navbar />
        <div className="text-center py-20">
          PG Not Found
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <div className="h-96 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex flex-col items-center justify-center">

          <div className="text-7xl">
            🛏️
          </div>

          <p className="mt-4 text-gray-600 text-lg">
            PG Image Coming Soon
          </p>

        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              {pg.title}
            </h1>

            <p className="text-gray-600 mt-2">
              📍 {pg.locality},{" "}
              {pg.city},{" "}
              {pg.state}
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-green-600">
              ₹ {pg.rent?.toLocaleString()}
            </h2>

            <p className="text-gray-500 text-sm">
              Per Month
            </p>
          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">
              Gender
            </p>

            <h3 className="font-semibold">
              {pg.genderPreference}
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
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-center hover:bg-green-700 transition"
                >
                  📞 Call Owner
                </a>

                <a
                  href={`mailto:${pg.ownerEmail}`}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg text-center hover:bg-blue-700 transition"
                >
                  ✉️ Email Owner
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

      </section>

      <Footer />
    </>
  );
}

export default PGDetails;