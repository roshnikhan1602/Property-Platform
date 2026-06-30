import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PGCard from "../components/pg/PGCard";
import {
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
} from "react-icons/fa";

function PGListing({
  setShowLoginModal,
}) {
  const [pgs, setPgs] = useState([]);
  const [filteredPgs, setFilteredPgs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [city, setCity] = useState("");
  const [gender, setGender] =
    useState("");
  const [sharingType, setSharingType] =
    useState("");

  useEffect(() => {
    fetchPGs();
  }, []);

  const fetchPGs = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/pgs"
      );

      const data = await response.json();

      if (data.success) {
        setPgs(data.pgs);
        setFilteredPgs(data.pgs);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    let result = [...pgs];

    if (city.trim()) {
      result = result.filter((pg) =>
        pg.city
          ?.trim()
          .toLowerCase()
          .includes(
            city.trim().toLowerCase()
          )
      );
    }

    if (gender) {
      result = result.filter(
        (pg) =>
          pg.genderPreference
            ?.trim()
            .toLowerCase() ===
          gender.trim().toLowerCase()
      );
    }

    if (sharingType) {
      result = result.filter(
        (pg) =>
          pg.sharingType
            ?.trim()
            .toLowerCase() ===
          sharingType
            .trim()
            .toLowerCase()
      );
    }

    setFilteredPgs(result);
  };

  const handleClearFilters = () => {
    setCity("");
    setGender("");
    setSharingType("");

    setFilteredPgs(pgs);
  };

  return (
    <>
      <Navbar
  setShowLoginModal={
    setShowLoginModal
  }
/>

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-10">

        <h1 className="text-4xl font-bold">
          PG Listings
        </h1>

        <p className="text-gray-600 mt-2">
          Find the best PG accommodation.
        </p>

        <div className="bg-white shadow rounded-2xl p-6 mt-8">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) =>
                setCity(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3"
            />

            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">
                Gender Preference
              </option>

              <option value="Boys">
                Boys
              </option>

              <option value="Girls">
                Girls
              </option>

              <option value="Unisex">
                Co-live
              </option>
            </select>

            <select
              value={sharingType}
              onChange={(e) =>
                setSharingType(
                  e.target.value
                )
              }
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">
                Sharing Type
              </option>

              <option value="Single">
                Single
              </option>

              <option value="Double">
                Double
              </option>

              <option value="Triple">
                Triple
              </option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition cursor-pointer"
            >
              Search PG
            </button>

          </div>

        </div>

        {(city || gender || sharingType) && (
          <div className="flex flex-wrap gap-3 mt-6">

            {city && (
              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                <FaMapMarkerAlt className="inline mr-2" />
                {city}
              </span>
            )}

            {gender && (
              <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm">
                <FaBed className="inline mr-2" />
                {gender === "Unisex"
                  ? "Co-live"
                  : gender}
              </span>
            )}

            {sharingType && (
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                <FaUsers className="inline mr-2" />
                {sharingType}
              </span>
            )}

            <button
              onClick={handleClearFilters}
              className="bg-red-100 text-red-600 px-5 py-2 rounded-full hover:bg-red-200 transition cursor-pointer"
            >
              Clear Filters
            </button>

          </div>
        )}

        {loading ? (
          <p className="text-center mt-10">
            Loading PGs...
          </p>
        ) : filteredPgs.length === 0 ? (
          <div className="text-center mt-16">

            <div className="text-6xl">
              <FaBed className="inline mr-2" />
            </div>

            <h2 className="text-2xl font-bold mt-4">
              No PG Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your filters.
            </p>

          </div>
        ) : (
          <>
            <p className="mt-8 text-gray-600 font-medium">
              {filteredPgs.length} PGs Found
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

              {filteredPgs.map((pg) => (
                <PGCard
                  key={pg._id}
                  pg={pg}
                />
              ))}

            </div>
          </>
        )}

      </section>

      <Footer />
    </>
  );
}

export default PGListing;