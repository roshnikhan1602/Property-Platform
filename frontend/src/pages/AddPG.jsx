import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Toast from "../components/common/Toast";
import { FaTimes } from "react-icons/fa";
function AddPG() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rent: "",
    depositAmount: "",
    sharingType: "",
    genderPreference: "",
    foodAvailable: false,
    wifiAvailable: false,
    acAvailable: false,
    address: "",
    city: "",
    state: "",
    pincode: "",
    locality: "",
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

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
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
      !formData.city ||
      !formData.locality ||
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
          "Please fill all required fields and upload at least one image",
        type: "error",
      });

      return;
    }

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    images.forEach((image) => {
      form.append("images", image);
    });
    try {
      const response = await fetch(
  "http://localhost:5000/api/pgs",
  {
    method: "POST",
    credentials: "include",
    body: form,
  }
);

      const data =
        await response.json();

      if (data.success) {
        setToast({
          show: true,
          message:
            "PG added successfully",
          type: "success",
        });

        setFormData({
          title: "",
          description: "",
          rent: "",
          depositAmount: "",
          sharingType: "",
          genderPreference: "",
          foodAvailable: false,
          wifiAvailable: false,
          acAvailable: false,
          address: "",
          city: "",
          state: "",
          pincode: "",
          locality: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
        });

        setTimeout(() => {
          navigate(
            "/owner-dashboard"
          );
        }, 1500);
      } else {
        setSubmitting(false);

         setToast({
    show: true,
    message:
      data.message || "Failed to add PG",
    type: "error",
  });
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setToast({
        show: true,
        message:
          "Something went wrong",
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

      <section className="max-w-5xl mx-auto px-6 pt-28 pb-10">

        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            Add PG Accommodation
          </h1>

          <p className="mt-2 text-gray-600">
            List your PG on
            PropertyHub.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium">
                  PG Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Monthly Rent *
                </label>

                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={
                    handleChange
                  }
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
                  placeholder="Enter Deposit Amount"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Sharing Type *
                </label>

                <select
                  name="sharingType"
                  value={
                    formData.sharingType
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">
                    Select Sharing
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

              <div>
                <label className="block mb-2 font-medium">
                  Gender Preference *
                </label>

                <select
                  name="genderPreference"
                  value={
                    formData.genderPreference
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">
                    Select
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
              </div>

            </div>

            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={
                  formData.description
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="mt-6">

              <h2 className="text-xl font-semibold mb-4">
                Amenities
              </h2>

              <div className="flex flex-wrap gap-6">

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="foodAvailable"
                    checked={
                      formData.foodAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  Food
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="wifiAvailable"
                    checked={
                      formData.wifiAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  WiFi
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="acAvailable"
                    checked={
                      formData.acAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  AC
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="gymAvailable"
                    checked={
                      formData.gymAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  Gym
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="swimmingPoolAvailable"
                    checked={
                      formData.swimmingPoolAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  Swimming Pool
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="tvAvailable"
                    checked={
                      formData.tvAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  TV
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="cctvAvailable"
                    checked={
                      formData.cctvAvailable
                    }
                    onChange={
                      handleChange
                    }
                  />
                  CCTV
                </label>
              </div>

            </div>

            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Address *
              </label>

              <input
                type="text"
                name="address"
                value={
                  formData.address
                }
                onChange={
                  handleChange
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={
                  handleChange
                }
                placeholder="City"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="locality"
                value={
                  formData.locality
                }
                onChange={
                  handleChange
                }
                placeholder="Locality"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="state"
                value={
                  formData.state
                }
                onChange={
                  handleChange
                }
                placeholder="State"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="pincode"
                value={
                  formData.pincode
                }
                onChange={
                  handleChange
                }
                placeholder="Pincode"
                className="border border-gray-300 rounded-lg px-4 py-3"
              />

            </div>

            <div className="mt-8">

              <h2 className="text-2xl font-semibold mb-4">
                Owner Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <input
                  type="text"
                  name="ownerName"
                  value={
                    formData.ownerName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Owner Name"
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />

                <input
                  type="tel"
                  name="ownerPhone"
                  value={
                    formData.ownerPhone
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Phone Number"
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />

                <input
                  type="email"
                  name="ownerEmail"
                  value={
                    formData.ownerEmail
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Email"
                  className="border border-gray-300 rounded-lg px-4 py-3"
                />

              </div>

            </div>
            <div className="mt-8">
              <label className="block mb-2 font-medium">
                PG Images <span className="text-red-500">*</span>
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <p className="text-sm text-gray-500 mt-2">
                You can select multiple images.
              </p>

              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative"
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`PG ${index + 1}`}
                        className="w-28 h-20 rounded-lg object-cover border"
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
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all duration-200"
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
              className={`w-full mt-8 py-4 rounded-xl font-medium transition ${submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                } text-white`}
            >
              {submitting ? "Submitting..." : "Submit PG"}
            </button>
          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default AddPG;