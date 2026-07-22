import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PGCard from "../components/pg/PGCard";

import {
  FaMapMarkerAlt,
  FaBed,
  FaUsers,
  FaWifi,
  FaParking,
  FaUtensils,
  FaSnowflake,
  FaTv,
  FaShieldAlt,
  FaDumbbell,
  FaSwimmingPool,
  FaChevronDown,
} from "react-icons/fa";

import {
  MdElevator,
  MdLocalLaundryService,
  MdPower,
  MdDesk,
  MdBathroom,
} from "react-icons/md";

import { PiDoorOpenFill } from "react-icons/pi";

import BackButton from "../components/common/BackButton";

function PGListing({
  setShowLoginModal,
}) {
  const [pgs, setPgs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [totalPGs, setTotalPGs] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const [searchParams, setSearchParams] =
    useSearchParams();
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [sharingType, setSharingType] = useState("");
  const [minRent, setMinRent] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [foodAvailable, setFoodAvailable] = useState("");
  const [wifiAvailable, setWifiAvailable] = useState("");
  const [acAvailable, setAcAvailable] = useState("");
  const [gymAvailable, setGymAvailable] = useState("");
  const [swimmingPoolAvailable, setSwimmingPoolAvailable] = useState("");
  const [tvAvailable, setTvAvailable] = useState("");
  const [cctvAvailable, setCctvAvailable] = useState("");
  const [attachedBathroom, setAttachedBathroom] = useState("");
  const [laundryAvailable, setLaundryAvailable] = useState("");
  const [housekeepingAvailable, setHousekeepingAvailable] = useState("");
  const [liftAvailable, setLiftAvailable] = useState("");
  const [geyserAvailable, setGeyserAvailable] = useState("");
  const [parkingAvailable, setParkingAvailable] = useState("");
  const [powerBackupAvailable, setPowerBackupAvailable] = useState("");
  const [studyTableAvailable, setStudyTableAvailable] = useState("");
  const [cupboardAvailable, setCupboardAvailable] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const page =
    Number(searchParams.get("page")) || 1;

  useEffect(() => {
    fetchPGs();
  }, [
    page,
    city,
    gender,
    sharingType,
    minRent,
    maxRent,
    foodAvailable,
    wifiAvailable,
    acAvailable,
    availableFrom,
  ]);

  const fetchPGs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      params.append("page", page);
      params.append("limit", 9);

      if (city) params.append("city", city);
      if (gender) params.append("gender", gender);
      if (sharingType) params.append("sharingType", sharingType);
      if (minRent) params.append("minRent", minRent);
      if (maxRent) params.append("maxRent", maxRent);
      if (foodAvailable) params.append("foodAvailable", foodAvailable);
      if (wifiAvailable) params.append("wifiAvailable", wifiAvailable);
      if (acAvailable) params.append("acAvailable", acAvailable);
      if (gymAvailable) params.append("gymAvailable", gymAvailable);
      if (swimmingPoolAvailable) params.append("swimmingPoolAvailable", swimmingPoolAvailable);
      if (tvAvailable) params.append("tvAvailable", tvAvailable);
      if (cctvAvailable) params.append("cctvAvailable", cctvAvailable);
      if (attachedBathroom) params.append("attachedBathroom", attachedBathroom);
      if (laundryAvailable) params.append("laundryAvailable", laundryAvailable);
      if (housekeepingAvailable) params.append("housekeepingAvailable", housekeepingAvailable);
      if (liftAvailable) params.append("liftAvailable", liftAvailable);
      if (geyserAvailable) params.append("geyserAvailable", geyserAvailable);
      if (parkingAvailable) params.append("parkingAvailable", parkingAvailable);
      if (powerBackupAvailable) params.append("powerBackupAvailable", powerBackupAvailable);
      if (studyTableAvailable) params.append("studyTableAvailable", studyTableAvailable);
      if (cupboardAvailable) params.append("cupboardAvailable", cupboardAvailable);
      if (availableFrom) params.append("availableFrom", availableFrom);

      const response = await fetch(
        `http://localhost:5000/api/pgs?${params.toString()}`
      );

      const data = await response.json();

      if (data.success) {
        setPgs(data.pgs);
        setTotalPGs(data.totalPGs);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (city) params.set("city", city);
    if (gender) params.set("gender", gender);
    if (sharingType) params.set("sharingType", sharingType);
    if (minRent) params.set("minRent", minRent);
    if (maxRent) params.set("maxRent", maxRent);
    if (foodAvailable) params.set("foodAvailable", foodAvailable);
    if (wifiAvailable) params.set("wifiAvailable", wifiAvailable);
    if (acAvailable) params.set("acAvailable", acAvailable);
    if (availableFrom) params.set("availableFrom", availableFrom);

    params.set("page", 1);

    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setCity("");
    setGender("");
    setSharingType("");
    setMinRent("");
    setMaxRent("");
    setFoodAvailable("");
    setWifiAvailable("");
    setAcAvailable("");
    setAvailableFrom("");
    setSearchParams({});
  };

  return (
    <>
      <Navbar
        setShowLoginModal={setShowLoginModal}
      />

      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-8">
          <BackButton />
        </div>

        <h1 className="text-4xl font-bold">
          PG Listings
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Find the best PG accommodation.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT FILTER SIDEBAR */}

          <div className="lg:col-span-1 self-start">
            <div className="sticky top-24">
              <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-xl p-6 max-w-[280px] w-full">

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 mb-6 px-6 py-5 rounded-t-2xl">
                  <h2 className="text-2xl font-bold text-white">
                    🔍 Filters
                  </h2>

                  <p className="text-blue-100 text-sm mt-1">
                    Find your perfect PG
                  </p>
                </div>

                {/* City */}
                <div className="mb-7">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />
                </div>

                {/* Gender */}

                <div className="mb-5">

                  <div>

                    <label className="block text-sm font-semibold mb-3">
                      Gender Preference
                    </label>

                    <div className="grid grid-cols-2 gap-2">

                      <button
                        type="button"
                        onClick={() => setGender("")}
                        className={`rounded-xl py-3 border transition font-medium cursor-pointer ${gender === ""
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white hover:bg-gray-50"
                          }`}
                      >
                        All
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("Boys")}
                        className={`rounded-xl py-3 border transition font-medium cursor-pointer ${gender === "Boys"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white hover:bg-gray-50"
                          }`}
                      >
                        Boys
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("Girls")}
                        className={`rounded-xl py-3 border transition font-medium cursor-pointer ${gender === "Girls"
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white hover:bg-gray-50"
                          }`}
                      >
                        Girls
                      </button>

                      <button
                        type="button"
                        onClick={() => setGender("Co-live")}
                        className={`rounded-xl py-3 border transition font-medium cursor-pointer ${gender === "Co-live"
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white hover:bg-gray-50"
                          }`}
                      >
                        Co-live
                      </button>

                    </div>

                  </div>
                </div>

                {/* Sharing */}

                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-2">
                    Sharing Type
                  </label>

                  <select
                    value={sharingType}
                    onChange={(e) =>
                      setSharingType(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  >
                    <option value="">
                      All
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
                </div>

                {/* Budget */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold mb-2">
                    Budget
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <input
                      type="number"
                      placeholder="Min"
                      value={minRent}
                      onChange={(e) =>
                        setMinRent(
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      value={maxRent}
                      onChange={(e) =>
                        setMaxRent(
                          e.target.value
                        )
                      }
                      className="rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />

                  </div>
                </div>

                {/* Amenities */}

                <div className="mb-5">
                  <label className="block text-sm font-semibold mb-3">
                    Amenities
                  </label>

                  <div className="grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setWifiAvailable(
                          wifiAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${wifiAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaWifi className="text-xl mb-1" />
                      <span className="text-sm">WiFi</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setFoodAvailable(
                          foodAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${foodAvailable === "true"
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white hover:bg-orange-50"
                        }`}
                    >
                      <FaUtensils className="text-xl mb-1" />
                      <span className="text-sm">Food</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setAcAvailable(
                          acAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${acAvailable === "true"
                        ? "bg-cyan-600 text-white border-cyan-600"
                        : "bg-white hover:bg-cyan-50"
                        }`}
                    >
                      <FaSnowflake className="text-xl mb-1" />
                      <span className="text-sm">AC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setTvAvailable(
                          tvAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${tvAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaTv className="text-lg" />
                      TV
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setParkingAvailable(
                          parkingAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${parkingAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaParking className="text-lg" />
                      Parking
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setLaundryAvailable(
                          laundryAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${laundryAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <MdLocalLaundryService className="text-lg" />
                      Laundry
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGymAvailable(
                          gymAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${gymAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaDumbbell className="text-lg" />
                      Gym
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setSwimmingPoolAvailable(
                          swimmingPoolAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${swimmingPoolAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaSwimmingPool className="text-lg" />
                      Swimming Pool
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setCctvAvailable(
                          cctvAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${cctvAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaShieldAlt className="text-lg" />
                      CCTV
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setLiftAvailable(
                          liftAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${liftAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <MdElevator className="text-lg" />
                      Lift
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setGeyserAvailable(
                          geyserAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${geyserAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <MdPower className="text-lg" />
                      Geyser
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setHousekeepingAvailable(
                          housekeepingAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${housekeepingAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaBed className="text-lg" />
                      House
                      keeping
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setParkingAvailable(
                          parkingAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${parkingAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <FaParking className="text-lg" />
                      Parking
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setPowerBackupAvailable(
                          powerBackupAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${powerBackupAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <MdPower className="text-lg" />
                      Power Backup
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setStudyTableAvailable(
                          studyTableAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${studyTableAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <MdDesk className="text-lg" />
                      Study Table
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setCupboardAvailable(
                          cupboardAvailable === "true" ? "" : "true"
                        )
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition cursor-pointer ${cupboardAvailable === "true"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white hover:bg-blue-50"
                        }`}
                    >
                      <PiDoorOpenFill className="text-lg" />
                      Cupboard
                    </button>

                  </div>
                </div>


                {/* Available From

              <div className="mb-6">

                <label className="block text-sm font-semibold mb-2">
                  Available From
                </label>

                <input
                  type="date"
                  value={availableFrom}
                  onChange={(e) =>
                    setAvailableFrom(
                      e.target.value
                    )
                  }
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div> */}

                <button
                  onClick={handleSearch}
                  className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                >
                  Apply Filters
                </button>
                <button
                  onClick={handleClearFilters}
                  className="w-full mt-5 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold hover:bg-red-100 hover:border-red-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  🗑 Clear Filters
                </button>
              </div>   {/* sticky */}
            </div>   {/* left sidebar */}
          </div>

          {/* RIGHT SIDE */}

          <div className="lg:col-span-3">

            {(city ||
              gender ||
              sharingType ||
              minRent ||
              maxRent ||
              foodAvailable ||
              wifiAvailable ||
              acAvailable) && (

                <div className="flex flex-wrap gap-3 mb-6">
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

                  {minRent && (
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
                      ₹ {minRent}+
                    </span>
                  )}

                  {maxRent && (
                    <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
                      Up to ₹{maxRent}
                    </span>
                  )}

                  {foodAvailable === "true" && (
                    <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm">
                      Food
                    </span>
                  )}

                  {wifiAvailable === "true" && (
                    <span className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm">
                      WiFi
                    </span>
                  )}

                  {acAvailable === "true" && (
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm">
                      AC
                    </span>
                  )}

                </div>
              )}

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Available PGs
              </h2>

              <span className="text-gray-600">
                {totalPGs} Results
              </span>

            </div>

            {loading ? (
              <p className="text-center py-20">
                Loading PGs...
              </p>
            ) : pgs.length === 0 ? (
              <div className="bg-white rounded-xl shadow text-center py-20">

                <div className="text-6xl mb-4">
                  🛏️
                </div>

                <h2 className="text-2xl font-bold">
                  No PG Found
                </h2>

                <p className="text-gray-500 mt-3">
                  Try changing your filters.
                </p>

              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {pgs.map((pg) => (
                    <PGCard
                      key={pg._id}
                      pg={pg}
                    />
                  ))}
                </div>

                <div className="flex justify-center items-center gap-3 mt-10">

                  <button
                    disabled={page === 1}
                    onClick={() => {
                      const params =
                        new URLSearchParams(searchParams);

                      params.set(
                        "page",
                        page - 1
                      );

                      setSearchParams(params);
                    }}
                    className="px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer"
                  >
                    Previous
                  </button>

                  <span className="font-semibold">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      const params =
                        new URLSearchParams(searchParams);

                      params.set(
                        "page",
                        page + 1
                      );

                      setSearchParams(params);
                    }}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition cursor-pointer"
                  >
                    Next
                  </button>

                </div>

              </>
            )}

          </div>

        </div>

      </section >

      <Footer />

    </>
  );
}

export default PGListing;