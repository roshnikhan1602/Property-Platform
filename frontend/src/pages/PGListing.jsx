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
    gymAvailable,
    swimmingPoolAvailable,
    tvAvailable,
    cctvAvailable,
    parkingAvailable,
    laundryAvailable,
    housekeepingAvailable,
    attachedBathroom,
    liftAvailable,
    geyserAvailable,
    powerBackupAvailable,
    studyTableAvailable,
    cupboardAvailable,
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
      if (swimmingPoolAvailable)
        params.append(
          "swimmingPoolAvailable",
          swimmingPoolAvailable
        );
      if (tvAvailable) params.append("tvAvailable", tvAvailable);
      if (cctvAvailable) params.append("cctvAvailable", cctvAvailable);
      if (attachedBathroom)
        params.append("attachedBathroom", attachedBathroom);
      if (laundryAvailable)
        params.append("laundryAvailable", laundryAvailable);
      if (housekeepingAvailable)
        params.append(
          "housekeepingAvailable",
          housekeepingAvailable
        );
      if (liftAvailable) params.append("liftAvailable", liftAvailable);
      if (geyserAvailable)
        params.append("geyserAvailable", geyserAvailable);
      if (parkingAvailable)
        params.append("parkingAvailable", parkingAvailable);
      if (powerBackupAvailable)
        params.append(
          "powerBackupAvailable",
          powerBackupAvailable
        );
      if (studyTableAvailable)
        params.append(
          "studyTableAvailable",
          studyTableAvailable
        );
      if (cupboardAvailable)
        params.append(
          "cupboardAvailable",
          cupboardAvailable
        );
      if (availableFrom)
        params.append("availableFrom", availableFrom);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pgs?${params.toString()}`
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

  const handleClearFilters = () => {
    setCity("");
    setGender("");
    setSharingType("");
    setMinRent("");
    setMaxRent("");

    setFoodAvailable("");
    setWifiAvailable("");
    setAcAvailable("");
    setGymAvailable("");
    setSwimmingPoolAvailable("");
    setTvAvailable("");
    setCctvAvailable("");
    setAttachedBathroom("");
    setLaundryAvailable("");
    setHousekeepingAvailable("");
    setLiftAvailable("");
    setGeyserAvailable("");
    setParkingAvailable("");
    setPowerBackupAvailable("");
    setStudyTableAvailable("");
    setCupboardAvailable("");

    setAvailableFrom("");

    setSearchParams({});
  };

  return (
    <>
      <Navbar
        setShowLoginModal={setShowLoginModal}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-6 sm:py-8 lg:py-10">

        {/* BACK BUTTON */}
        <div className="mb-5 sm:mb-8">
          <BackButton />
        </div>

        {/* PAGE TITLE */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">
            PG Listings
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Find the best PG accommodation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* =====================================================
              LEFT FILTER SIDEBAR
          ====================================================== */}

          <div className="lg:col-span-1 self-start w-full">

            <div className="lg:sticky lg:top-24 w-full">

              <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-xl p-4 sm:p-6 w-full">

                {/* FILTER HEADER */}

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-4 sm:-mx-6 -mt-4 sm:-mt-6 mb-5 sm:mb-6 px-4 sm:px-6 py-4 sm:py-5 rounded-t-2xl">

                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    🔍 Filters
                  </h2>

                  <p className="text-blue-100 text-xs sm:text-sm mt-1">
                    Find your perfect PG
                  </p>

                </div>

                {/* CITY */}

                <div className="mb-6 sm:mb-7">

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
                    className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  />

                </div>

                {/* GENDER */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold mb-3">
                    Gender Preference
                  </label>

                  <div className="grid grid-cols-2 gap-2">

                    <button
                      type="button"
                      onClick={() => setGender("")}
                      className={`rounded-xl py-2.5 sm:py-3 text-sm sm:text-base border transition font-medium cursor-pointer ${
                        gender === ""
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      All
                    </button>

                    <button
                      type="button"
                      onClick={() => setGender("Boys")}
                      className={`rounded-xl py-2.5 sm:py-3 text-sm sm:text-base border transition font-medium cursor-pointer ${
                        gender === "Boys"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Boys
                    </button>

                    <button
                      type="button"
                      onClick={() => setGender("Girls")}
                      className={`rounded-xl py-2.5 sm:py-3 text-sm sm:text-base border transition font-medium cursor-pointer ${
                        gender === "Girls"
                          ? "bg-pink-600 text-white border-pink-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Girls
                    </button>

                    <button
                      type="button"
                      onClick={() => setGender("Co-live")}
                      className={`rounded-xl py-2.5 sm:py-3 text-sm sm:text-base border transition font-medium cursor-pointer ${
                        gender === "Co-live"
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      Co-live
                    </button>

                  </div>

                </div>

                {/* SHARING */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold mb-2">
                    Sharing Type
                  </label>

                  <select
                    value={sharingType}
                    onChange={(e) =>
                      setSharingType(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-300 px-3 sm:px-4 py-3 text-sm sm:text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  >
                    <option value="">All</option>

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

                {/* BUDGET */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold mb-2">
                    Budget
                  </label>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">

                    <input
                      type="number"
                      placeholder="Min"
                      value={minRent}
                      onChange={(e) =>
                        setMinRent(e.target.value)
                      }
                      className="min-w-0 rounded-xl border border-gray-300 px-2 sm:px-4 py-3 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />

                    <input
                      type="number"
                      placeholder="Max"
                      value={maxRent}
                      onChange={(e) =>
                        setMaxRent(e.target.value)
                      }
                      className="min-w-0 rounded-xl border border-gray-300 px-2 sm:px-4 py-3 text-sm sm:text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    />

                  </div>

                </div>

                {/* AMENITIES */}

                <div className="mb-5">

                  <label className="block text-sm font-semibold mb-3">
                    Amenities
                  </label>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">

                    {/* WIFI */}

                    <button
                      type="button"
                      onClick={() =>
                        setWifiAvailable(
                          wifiAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        wifiAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaWifi className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        WiFi
                      </span>
                    </button>

                    {/* FOOD */}

                    <button
                      type="button"
                      onClick={() =>
                        setFoodAvailable(
                          foodAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        foodAvailable === "true"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white border-gray-300 hover:bg-orange-50"
                      }`}
                    >
                      <FaUtensils className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        Food
                      </span>
                    </button>

                    {/* AC */}

                    <button
                      type="button"
                      onClick={() =>
                        setAcAvailable(
                          acAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        acAvailable === "true"
                          ? "bg-cyan-600 text-white border-cyan-600"
                          : "bg-white border-gray-300 hover:bg-cyan-50"
                      }`}
                    >
                      <FaSnowflake className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        AC
                      </span>
                    </button>

                    {/* TV */}

                    <button
                      type="button"
                      onClick={() =>
                        setTvAvailable(
                          tvAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        tvAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaTv className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        TV
                      </span>
                    </button>

                    {/* PARKING */}

                    <button
                      type="button"
                      onClick={() =>
                        setParkingAvailable(
                          parkingAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        parkingAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaParking className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        Parking
                      </span>
                    </button>

                    {/* LAUNDRY */}

                    <button
                      type="button"
                      onClick={() =>
                        setLaundryAvailable(
                          laundryAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        laundryAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <MdLocalLaundryService className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        Laundry
                      </span>
                    </button>

                    {/* GYM */}

                    <button
                      type="button"
                      onClick={() =>
                        setGymAvailable(
                          gymAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        gymAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaDumbbell className="text-lg sm:text-xl mb-1" />
                      <span className="text-xs sm:text-sm">
                        Gym
                      </span>
                    </button>

                    {/* SWIMMING POOL */}

                    <button
                      type="button"
                      onClick={() =>
                        setSwimmingPoolAvailable(
                          swimmingPoolAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        swimmingPoolAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaSwimmingPool className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm text-center">
                        Swimming Pool
                      </span>
                    </button>

                    {/* CCTV */}

                    <button
                      type="button"
                      onClick={() =>
                        setCctvAvailable(
                          cctvAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        cctvAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaShieldAlt className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm">
                        CCTV
                      </span>
                    </button>

                    {/* LIFT */}

                    <button
                      type="button"
                      onClick={() =>
                        setLiftAvailable(
                          liftAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        liftAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <MdElevator className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm">
                        Lift
                      </span>
                    </button>

                    {/* GEYSER */}

                    <button
                      type="button"
                      onClick={() =>
                        setGeyserAvailable(
                          geyserAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        geyserAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <MdPower className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm">
                        Geyser
                      </span>
                    </button>

                    {/* HOUSEKEEPING */}

                    <button
                      type="button"
                      onClick={() =>
                        setHousekeepingAvailable(
                          housekeepingAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        housekeepingAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <FaBed className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm text-center">
                        Housekeeping
                      </span>
                    </button>

                    {/* POWER BACKUP */}

                    <button
                      type="button"
                      onClick={() =>
                        setPowerBackupAvailable(
                          powerBackupAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        powerBackupAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <MdPower className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm text-center">
                        Power Backup
                      </span>
                    </button>

                    {/* STUDY TABLE */}

                    <button
                      type="button"
                      onClick={() =>
                        setStudyTableAvailable(
                          studyTableAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        studyTableAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <MdDesk className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm text-center">
                        Study Table
                      </span>
                    </button>

                    {/* CUPBOARD */}

                    <button
                      type="button"
                      onClick={() =>
                        setCupboardAvailable(
                          cupboardAvailable === "true"
                            ? ""
                            : "true"
                        )
                      }
                      className={`h-20 rounded-xl border flex flex-col items-center justify-center transition cursor-pointer ${
                        cupboardAvailable === "true"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white border-gray-300 hover:bg-blue-50"
                      }`}
                    >
                      <PiDoorOpenFill className="text-lg sm:text-xl mb-1" />

                      <span className="text-xs sm:text-sm">
                        Cupboard
                      </span>
                    </button>

                  </div>

                </div>

                {/* CLEAR FILTERS */}

                <button
                  onClick={handleClearFilters}
                  className="w-full mt-5 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 font-semibold hover:bg-red-100 hover:border-red-400 hover:shadow-lg transition-all duration-300 cursor-pointer text-sm sm:text-base"
                >
                  🗑 Clear Filters
                </button>

              </div>

            </div>

          </div>

          {/* =====================================================
              RIGHT SIDE
          ====================================================== */}

          <div className="lg:col-span-3 min-w-0">

            {/* ACTIVE FILTERS */}

            {(city ||
              gender ||
              sharingType ||
              minRent ||
              maxRent ||
              foodAvailable ||
              wifiAvailable ||
              acAvailable) && (

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-6">

                {city && (
                  <span className="bg-blue-100 text-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    <FaMapMarkerAlt className="inline mr-1 sm:mr-2" />
                    {city}
                  </span>
                )}

                {gender && (
                  <span className="bg-purple-100 text-purple-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    <FaBed className="inline mr-1 sm:mr-2" />

                    {gender === "Unisex"
                      ? "Co-live"
                      : gender}
                  </span>
                )}

                {sharingType && (
                  <span className="bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    <FaUsers className="inline mr-1 sm:mr-2" />
                    {sharingType}
                  </span>
                )}

                {minRent && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    ₹ {minRent}+
                  </span>
                )}

                {maxRent && (
                  <span className="bg-yellow-100 text-yellow-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    Up to ₹{maxRent}
                  </span>
                )}

                {foodAvailable === "true" && (
                  <span className="bg-orange-100 text-orange-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    Food
                  </span>
                )}

                {wifiAvailable === "true" && (
                  <span className="bg-cyan-100 text-cyan-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    WiFi
                  </span>
                )}

                {acAvailable === "true" && (
                  <span className="bg-indigo-100 text-indigo-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm">
                    AC
                  </span>
                )}

              </div>
            )}

            {/* RESULTS HEADER */}

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-5 sm:mb-6">

              <h2 className="text-xl sm:text-2xl font-bold">
                Available PGs
              </h2>

              <span className="text-sm sm:text-base text-gray-600">
                {totalPGs} Results
              </span>

            </div>

            {/* LOADING */}

            {loading ? (

              <p className="text-center py-16 sm:py-20">
                Loading PGs...
              </p>

            ) : pgs.length === 0 ? (

              <div className="bg-white rounded-xl shadow text-center py-16 sm:py-20 px-4">

                <div className="text-5xl sm:text-6xl mb-4">
                  🛏️
                </div>

                <h2 className="text-xl sm:text-2xl font-bold">
                  No PG Found
                </h2>

                <p className="text-gray-500 mt-3 text-sm sm:text-base">
                  Try changing your filters.
                </p>

              </div>

            ) : (

              <>

                {/* PG CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">

                  {pgs.map((pg) => (
                    <PGCard
                      key={pg._id}
                      pg={pg}
                    />
                  ))}

                </div>

                {/* PAGINATION */}

                <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-8 sm:mt-10">

                  <button
                    disabled={page === 1}
                    onClick={() => {
                      const params =
                        new URLSearchParams(
                          searchParams
                        );

                      params.set(
                        "page",
                        page - 1
                      );

                      setSearchParams(params);
                    }}
                    className="px-3 sm:px-5 py-2 bg-gray-200 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition cursor-pointer text-sm sm:text-base"
                  >
                    Previous
                  </button>

                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    Page {page} of {totalPages}
                  </span>

                  <button
                    disabled={page === totalPages}
                    onClick={() => {
                      const params =
                        new URLSearchParams(
                          searchParams
                        );

                      params.set(
                        "page",
                        page + 1
                      );

                      setSearchParams(params);
                    }}
                    className="px-3 sm:px-5 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 hover:bg-blue-700 transition cursor-pointer text-sm sm:text-base"
                  >
                    Next
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default PGListing;