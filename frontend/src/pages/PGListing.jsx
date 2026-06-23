import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PGCard from "../components/pg/PGCard";

function PGListing() {
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

    if (city) {
      result = result.filter((pg) =>
        pg.city
          ?.toLowerCase()
          .includes(city.toLowerCase())
      );
    }

    if (gender) {
      result = result.filter(
        (pg) =>
          pg.genderPreference === gender
      );
    }

    if (sharingType) {
      result = result.filter(
        (pg) =>
          pg.sharingType === sharingType
      );
    }

    setFilteredPgs(result);
  };

  return (
    <>
      <Navbar />

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
                Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Any">
                Any
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
              className="bg-green-600 text-white rounded-lg px-6 py-3 hover:bg-green-700 transition"
            >
              Search PG
            </button>

          </div>

        </div>

        {loading ? (
          <p className="text-center mt-10">
            Loading PGs...
          </p>
        ) : filteredPgs.length === 0 ? (
          <div className="text-center mt-16">

            <div className="text-6xl">
              🛏️
            </div>

            <h2 className="text-2xl font-bold mt-4">
              No PG Found
            </h2>

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