import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import { FaTimes } from "react-icons/fa";
function EditPG() {
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
  rent: "",
  depositAmount: "",
  sharingType: "",
  genderPreference: "",

  foodAvailable: false,
  wifiAvailable: false,
  acAvailable: false,
  gymAvailable: false,
  swimmingPoolAvailable: false,
  tvAvailable: false,
  cctvAvailable: false,

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
  `http://localhost:5000/api/pgs/${id}`,
  {
    credentials: "include",
  }
);

        const data = await response.json();

  if (data.success) {
  setFormData(data.pg);

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
  !formData.locality ||
  !formData.city ||
  !formData.state ||
  !formData.pincode ||
  !formData.ownerName ||
  !formData.ownerPhone ||
  !formData.ownerEmail ||
  images.length === 0
){
  setSubmitting(false);
      setToast({
        show: true,
        message: "Please fill all required fields and keep at least one image",
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

// Send existing Cloudinary image URLs
const existingImages = images.filter(
  (image) => typeof image === "string"
);

form.append(
  "existingImages",
  JSON.stringify(existingImages)
);

// Upload only newly selected images
images.forEach((image) => {
  if (typeof image !== "string") {
    form.append("images", image);
  }
});
    try {
      const response = await fetch(
  `http://localhost:5000/api/pgs/${id}`,
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
          message: "Failed to update PG",
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
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        <div className="bg-white shadow-lg rounded-2xl p-8">

          <h1 className="text-4xl font-bold">
            Edit PG
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
      PG Title <span className="text-red-500">*</span>
    </label>

    <input
      type="text"
      name="title"
      value={formData.title}
      onChange={handleChange}
      placeholder="Enter PG title"
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    />
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Monthly Rent <span className="text-red-500">*</span>
    </label>

    <input
      type="number"
      name="rent"
      value={formData.rent}
      onChange={handleChange}
      placeholder="Enter monthly rent"
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    />
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Deposit Amount
    </label>

    <input
      type="number"
      name="depositAmount"
      value={formData.depositAmount}
      onChange={handleChange}
      placeholder="Enter deposit amount"
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    />
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Sharing Type <span className="text-red-500">*</span>
    </label>

    <select
      name="sharingType"
      value={formData.sharingType}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    >
      <option value="">Select Sharing Type</option>
      <option value="Single">Single</option>
      <option value="Double">Double</option>
      <option value="Triple">Triple</option>
    </select>
  </div>

  <div>
    <label className="block mb-2 font-medium">
      Gender Preference <span className="text-red-500">*</span>
    </label>

    <select
      name="genderPreference"
      value={formData.genderPreference}
      onChange={handleChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    >
      <option value="">Select Gender</option>
      <option value="Boys">Boys</option>
      <option value="Girls">Girls</option>
      <option value="Unisex">Co-live</option>
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
                placeholder="Enter PG description"
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">

  <div>
    <label className="block mb-2 font-medium">
      Locality <span className="text-red-500">*</span>
    </label>

    <input
      type="text"
      name="locality"
      value={formData.locality}
      onChange={handleChange}
      placeholder="Enter locality"
      className="w-full border border-gray-300 rounded-lg px-4 py-3"
    />
  </div>

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
    Amenities
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="wifiAvailable"
        checked={formData.wifiAvailable}
        onChange={handleChange}
      />
      WiFi
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="acAvailable"
        checked={formData.acAvailable}
        onChange={handleChange}
      />
      AC
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="foodAvailable"
        checked={formData.foodAvailable}
        onChange={handleChange}
      />
      Food
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="gymAvailable"
        checked={formData.gymAvailable}
        onChange={handleChange}
      />
      Gym
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="swimmingPoolAvailable"
        checked={formData.swimmingPoolAvailable}
        onChange={handleChange}
      />
      Swimming Pool
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="tvAvailable"
        checked={formData.tvAvailable}
        onChange={handleChange}
      />
      TV
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name="cctvAvailable"
        checked={formData.cctvAvailable}
        onChange={handleChange}
      />
      CCTV
    </label>

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
  className={`w-full mt-8 py-4 rounded-xl font-medium transition ${
    submitting
      ? "bg-blue-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
  } text-white`}
>
  {submitting ? "Updating..." : "Update PG"}
</button>
          </form>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default EditPG;