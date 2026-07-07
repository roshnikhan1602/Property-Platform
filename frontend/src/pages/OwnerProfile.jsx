import { useEffect, useRef, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FaCamera } from "react-icons/fa";

function OwnerProfile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [totalProperties, setTotalProperties] =
    useState(0);

  const [totalViews, setTotalViews] =
    useState(0);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [errorMessage, setErrorMessage] =
    useState("");
  const [profileImage, setProfileImage] =
    useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
   const fetchUser = async () => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.success) {
      setUser(data.user);
      setName(data.user.name || "");
      setEmail(data.user.email || "");
      setProfileImage(data.user.profileImage || "");
    }
  } catch (error) {
    console.error(error);
  }
};

fetchUser(); 

   
  }, []);

  const handleUpdateProfile = async (
    e
  ) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
  `http://localhost:5000/api/auth/profile/${user._id}`,
  {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
    }),
  }
);

      const data =
        await response.json();

      if (data.success) {
       setUser(data.user);

setProfileImage(
  data.user.profileImage || ""
);

if (fileInputRef.current) {
  fileInputRef.current.value = "";
}

setSuccessMessage(
  "Profile updated successfully."
);
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setErrorMessage(
          "Failed to update profile."
        );

        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error(error);

      setErrorMessage(
        "Failed to update profile."
      );

      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 pt-28 pb-10">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="flex flex-col items-center text-center border-b pb-8">

            <div className="relative">

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  const formData = new FormData();

                  formData.append(
                    "profileImage",
                    file
                  );

                  try {
                    const response = await fetch(
  `http://localhost:5000/api/auth/profile-image/${user._id}`,
  {
    method: "PUT",
    credentials: "include",
    body: formData,
  }
);

                    const data =
                      await response.json();

                    if (data.success) {
                      setProfileImage(
                        data.user.profileImage
                      );

                      setUser(data.user);
                    
                      if (fileInputRef.current) {
  fileInputRef.current.value = "";
}
                      setSuccessMessage(
                        "Profile image updated successfully."
                      );

                      setTimeout(() => {
                        setSuccessMessage("");
                      }, 3000);
                    } else {
                      setErrorMessage(
                        "Failed to upload image."
                      );

                      setTimeout(() => {
                        setErrorMessage("");
                      }, 3000);

                    }
                  } catch (error) {
                    console.error(error);

                    setErrorMessage(
                      "Failed to upload image."
                    );

                    setTimeout(() => {
                      setErrorMessage("");
                    }, 3000);

                  }
                }}
              />

              <div
                onClick={() => {
                  if (user) {
                    fileInputRef.current.click();
                  }
                }}
                className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer border-4 border-blue-500 group"
              >

                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                    {name?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <FaCamera className="text-white text-2xl" />
                </div>

              </div>

            </div>
            <h1 className="text-3xl font-bold mt-4">
              {name}
            </h1>

            <span className="mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
              {user?.role || "user"}
            </span>

          </div>

          {successMessage && (
            <div className="mt-6 bg-green-100 text-green-700 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mt-6 bg-red-100 text-red-700 px-4 py-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={
              handleUpdateProfile
            }
            className="mt-8 space-y-6"
          >

            <div>
              <label className="block text-gray-600 mb-2">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Mobile Number
              </label>

              <input
                type="text"
                value={
                  user?.mobileNumber ||
                  ""
                }
                disabled
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Email (Optional)
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {user?.role === "owner" && (
              <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-gray-50 border rounded-2xl p-6">
                  <p className="text-gray-500">
                    Total Properties
                  </p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {totalProperties}
                  </h2>
                </div>

                <div className="bg-gray-50 border rounded-2xl p-6">
                  <p className="text-gray-500">
                    Total Views
                  </p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    {totalViews}
                  </h2>
                </div>

              </div>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition font-medium cursor-pointer"
            >
              Update Profile
            </button>

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default OwnerProfile;