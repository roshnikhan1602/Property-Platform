import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import { FaTimes } from "react-icons/fa";
function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      setToast({
        show: true,
        message: "Please login first",
        type: "error",
      });
      navigate("/");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    listingType: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnishing: "Unfurnished",
    address: "",
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
    const fetchProperty = async () => {
      try {
        const response = await fetch(
  `http://localhost:5000/api/properties/${id}`,
  {
    credentials: "include",
  }
);

        const data = await response.json();

        if (data.success) {
          setFormData(data.property);

          if (data.property.images) {
            setImages(data.property.images);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    setSubmitting(true);

    if (
      !formData.title ||
      !formData.price ||
      !formData.listingType ||
      !formData.propertyType ||
      !formData.area ||
      !formData.address ||
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
      if (
        ![
          "images",
          "owner",
          "_id",
          "__v",
          "reviews",
          "averageRating",
          "totalReviews",
          "views",
          "createdAt",
          "updatedAt",
        ].includes(key)
      ) {
        form.append(key, formData[key]);
      }
    });


    images.forEach((image) => {
      if (typeof image !== "string") {
        form.append("images", image);
      }
    });
    try {
     const response = await fetch(
  `http://localhost:5000/api/properties/${id}`,
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
          message: "Property updated successfully",
          type: "success",
        });

        setFormData({
          title: "",
          description: "",
          price: "",
          listingType: "",
          propertyType: "",
          bedrooms: "",
          bathrooms: "",
          area: "",
          furnishing: "Unfurnished",
          address: "",
          city: "",
          state: "",
          pincode: "",
          ownerName: "",
          ownerPhone: "",
          ownerEmail: "",
        });

        setTimeout(() => {
          navigate("/my-properties");
        }, 1200);
      } else {
        setSubmitting(false);
        setToast({
          show: true,
          message: "Failed to update property",
          type: "error",
        });
      }
    } catch (error) {
      setSubmitting(false);
      console.error(error);
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
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            Edit Property
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            <span className="text-red-500">*</span> indicates required fields
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label className="block mb-2 font-medium">
                  Property Title <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter property title"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Price <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Listing Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="listingType"
                  value={formData.listingType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select Listing Type</option>
                  <option value="Rent">Rent</option>
                  <option value="Sale">Sale</option>
                  <option value="Lease">Lease</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Property Type <span className="text-red-500">*</span>
                </label>

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select Property Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Bedrooms
                </label>

                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  placeholder="Enter bedrooms"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Bathrooms
                </label>

                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  placeholder="Enter bathrooms"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Area (sq.ft) <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  placeholder="Enter area"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Furnishing
                </label>

                <select
                  name="furnishing"
                  value={formData.furnishing}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="Furnished">Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
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
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter property description"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="mt-6">
              <label className="block mb-2 font-medium">
                Address <span className="text-red-500">*</span>
              </label>

              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

              <div>
                <label className="block mb-2 font-medium">
                  City <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  State <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Pincode <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                />
              </div>

            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">
                Owner Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label className="block mb-2 font-medium">
                    Owner Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="Enter owner name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="tel"
                    name="ownerPhone"
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="email"
                    name="ownerEmail"
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="Enter email address"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

              </div>
            </div>
            <div className="mt-8">
              <label className="block mb-2 font-medium">
                Property Images <span className="text-red-500">*</span>
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
                        alt={`Property ${index + 1}`}
                        className="w-28 h-20 rounded-lg object-cover border"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setImages((prevImages) =>
                            prevImages.filter((_, i) => i !== index)
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
              {submitting ? "Updating..." : "Update Property"}
            </button>

          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default EditProperty;