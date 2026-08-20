import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import { FaTimes } from "react-icons/fa";

function EditPG() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    depositAmount: "",
    maintenanceCharges: "",

    sharingType: "",
    genderPreference: "",

    totalBeds: "",
    availableBeds: "",
    availableNow: true,

    foodAvailable: false,
    wifiAvailable: false,
    acAvailable: false,
    gymAvailable: false,
    swimmingPoolAvailable: false,
    tvAvailable: false,
    cctvAvailable: false,

    attachedBathroom: false,
    laundryAvailable: false,
    housekeepingAvailable: false,
    liftAvailable: false,
    geyserAvailable: false,
    parkingAvailable: false,
    powerBackupAvailable: false,
    studyTableAvailable: false,
    cupboardAvailable: false,

    smokingAllowed: false,
    petsAllowed: false,
    visitorsAllowed: true,

    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",

    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
  });

  const [images, setImages] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    const fetchPG = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pgs/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (data.success) {
          setFormData({
            title: data.pg.title || "",
            description: data.pg.description || "",
            rent: data.pg.rent || "",
            depositAmount: data.pg.depositAmount || "",
            maintenanceCharges:
              data.pg.maintenanceCharges || "",

            sharingType: data.pg.sharingType || "",
            genderPreference:
              data.pg.genderPreference || "",

            totalBeds: data.pg.totalBeds || "",
            availableBeds:
              data.pg.availableBeds || "",
            availableNow:
              data.pg.availableNow ?? true,

            foodAvailable:
              data.pg.foodAvailable ?? false,
            wifiAvailable:
              data.pg.wifiAvailable ?? false,
            acAvailable:
              data.pg.acAvailable ?? false,
            gymAvailable:
              data.pg.gymAvailable ?? false,
            swimmingPoolAvailable:
              data.pg.swimmingPoolAvailable ?? false,
            tvAvailable:
              data.pg.tvAvailable ?? false,
            cctvAvailable:
              data.pg.cctvAvailable ?? false,

            attachedBathroom:
              data.pg.attachedBathroom ?? false,
            laundryAvailable:
              data.pg.laundryAvailable ?? false,
            housekeepingAvailable:
              data.pg.housekeepingAvailable ?? false,
            liftAvailable:
              data.pg.liftAvailable ?? false,
            geyserAvailable:
              data.pg.geyserAvailable ?? false,
            parkingAvailable:
              data.pg.parkingAvailable ?? false,
            powerBackupAvailable:
              data.pg.powerBackupAvailable ?? false,
            studyTableAvailable:
              data.pg.studyTableAvailable ?? false,
            cupboardAvailable:
              data.pg.cupboardAvailable ?? false,

            smokingAllowed:
              data.pg.smokingAllowed ?? false,
            petsAllowed:
              data.pg.petsAllowed ?? false,
            visitorsAllowed:
              data.pg.visitorsAllowed ?? true,

            address: data.pg.address || "",
            locality: data.pg.locality || "",
            city: data.pg.city || "",
            state: data.pg.state || "",
            pincode: data.pg.pincode || "",

            ownerName: data.pg.ownerName || "",
            ownerPhone: data.pg.ownerPhone || "",
            ownerEmail: data.pg.ownerEmail || "",
          });

          if (data.pg.images) {
            setImages(data.pg.images);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPG();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    if (
      !formData.title ||
      !formData.rent ||
      !formData.sharingType ||
      !formData.genderPreference ||
      !formData.address ||
      !formData.locality ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.ownerName ||
      !formData.ownerPhone ||
      !formData.ownerEmail ||
      images.length === 0
    ) {
      setSubmitting(false);

      setToast({
        show: true,
        message:
          "Please fill all required fields and keep at least one image",
        type: "error",
      });

      return;
    }

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    const existingImages = images.filter(
      (image) => typeof image === "string"
    );

    form.append(
      "existingImages",
      JSON.stringify(existingImages)
    );

    images.forEach((image) => {
      if (typeof image !== "string") {
        form.append("images", image);
      }
    });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pgs/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: form,
        }
      );

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "PG updated successfully",
          type: "success",
        });

        setTimeout(() => {
          navigate("/my-pgs");
        }, 1200);
      } else {
        setSubmitting(false);

        setToast({
          show: true,
          message:
            data.message || "Failed to update PG",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setSubmitting(false);

      setToast({
        show: true,
        message: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <>
      <Navbar />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({
              show: false,
              message: "",
              type: "success",
            })
          }
        />
      )}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-8 sm:pb-10">
        <div className="bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Edit PG
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            <span className="text-red-500">*</span>{" "}
            indicates required fields
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 sm:mt-8"
          >
            {/* BASIC DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              <div>
                <label className="block mb-2 font-medium">
                  PG Title{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Monthly Rent{" "}
                  <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Security Deposit
                </label>

                <input
                  type="number"
                  name="depositAmount"
                  value={formData.depositAmount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Maintenance Charges
                </label>

                <input
                  type="number"
                  name="maintenanceCharges"
                  value={formData.maintenanceCharges}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Sharing Type{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="sharingType"
                  value={formData.sharingType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white outline-none focus:border-gray-300 focus:ring-0 rounded-lg px-4 py-3"
                >
                  <option value="">
                    Select Sharing Type
                  </option>
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Triple">Triple</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Gender Preference{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="genderPreference"
                  value={formData.genderPreference}
                  onChange={handleChange}
                  className="w-full border border-gray-300 bg-white outline-none focus:border-gray-300 focus:ring-0 rounded-lg px-4 py-3"
                >
                  <option value="">
                    Select Gender
                  </option>
                  <option value="Boys">Boys</option>
                  <option value="Girls">Girls</option>
                  <option value="Co-live">Co-live</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Total Beds
                </label>

                <input
                  type="number"
                  name="totalBeds"
                  value={formData.totalBeds}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Available Beds
                </label>

                <input
                  type="number"
                  name="availableBeds"
                  value={formData.availableBeds}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* AMENITIES */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-4">
                {[
                  ["foodAvailable", "Food"],
                  ["wifiAvailable", "WiFi"],
                  ["acAvailable", "AC"],
                  ["gymAvailable", "Gym"],
                  [
                    "swimmingPoolAvailable",
                    "Swimming Pool",
                  ],
                  ["tvAvailable", "TV"],
                  ["cctvAvailable", "CCTV"],
                  [
                    "attachedBathroom",
                    "Attached Bathroom",
                  ],
                  [
                    "laundryAvailable",
                    "Laundry",
                  ],
                  [
                    "housekeepingAvailable",
                    "Housekeeping",
                  ],
                  ["liftAvailable", "Lift"],
                  ["geyserAvailable", "Geyser"],
                  [
                    "parkingAvailable",
                    "Parking",
                  ],
                  [
                    "powerBackupAvailable",
                    "Power Backup",
                  ],
                  [
                    "studyTableAvailable",
                    "Study Table",
                  ],
                  [
                    "cupboardAvailable",
                    "Cupboard",
                  ],
                ].map(([name, label]) => (
                  <label
                    key={name}
                    className="flex items-center gap-2 cursor-pointer text-sm sm:text-base"
                  >
                    <input
                      type="checkbox"
                      name={name}
                      checked={
                        formData[name] || false
                      }
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Address{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 mt-6">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="Locality"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            {/* PG RULES */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                PG Rules
              </h2>

              <div className="flex flex-wrap gap-x-5 sm:gap-x-6 gap-y-4">
                <label className="flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    name="availableNow"
                    checked={formData.availableNow}
                    onChange={handleChange}
                  />
                  Available Now
                </label>

                <label className="flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    name="smokingAllowed"
                    checked={formData.smokingAllowed}
                    onChange={handleChange}
                  />
                  Smoking Allowed
                </label>

                <label className="flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    name="petsAllowed"
                    checked={formData.petsAllowed}
                    onChange={handleChange}
                  />
                  Pets Allowed
                </label>

                <label className="flex items-center gap-2 text-sm sm:text-base">
                  <input
                    type="checkbox"
                    name="visitorsAllowed"
                    checked={formData.visitorsAllowed}
                    onChange={handleChange}
                  />
                  Visitors Allowed
                </label>
              </div>
            </div>

            {/* OWNER INFORMATION */}
            <div className="mt-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Owner Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Owner Name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />

                <input
                  type="tel"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />

                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* IMAGES */}
            <div className="mt-8">
              <label className="block mb-2 font-medium">
                PG Images{" "}
                <span className="text-red-500">*</span>
              </label>

              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  setImages((prevImages) => [
                    ...prevImages,
                    ...Array.from(e.target.files),
                  ])
                }
                className="w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-3 text-sm sm:text-base"
              />

              <p className="text-sm text-gray-500 mt-2">
                Upload new images or remove existing ones before updating.
              </p>

              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      <img
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`PG ${index + 1}`}
                        className="w-24 h-20 sm:w-28 sm:h-20 rounded-lg object-cover border"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setImages((prevImages) =>
                            prevImages.filter(
                              (_, i) => i !== index
                            )
                          )
                        }
                        className="absolute top-1 right-1 sm:top-2 sm:right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full mt-8 py-3.5 sm:py-4 rounded-xl font-medium transition ${
                submitting
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              } text-white`}
            >
              {submitting
                ? "Updating..."
                : "Update PG"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default EditPG;