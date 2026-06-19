import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

function OwnerProfile() {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [totalProperties, setTotalProperties] =
    useState(0);

  const [totalViews, setTotalViews] =
    useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(
      localStorage.getItem("user")
    );

    if (loggedInUser) {
      setUser(loggedInUser);
      setName(loggedInUser.name || "");
      setEmail(loggedInUser.email || "");

      fetch(
        `http://localhost:5000/api/properties/my-properties/${loggedInUser._id}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTotalProperties(
              data.properties.length
            );

            const views =
              data.properties.reduce(
                (total, property) =>
                  total +
                  (property.views || 0),
                0
              );

            setTotalViews(views);
          }
        })
        .catch((err) =>
          console.error(err)
        );
    }
  }, []);

  const handleUpdateProfile = async (
    e
  ) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/profile/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
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
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setUser(data.user);

        alert(
          "Profile updated successfully"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-4xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold mb-8">
          {user?.role === "admin"
            ? "Admin Profile"
            : "Owner Profile"}
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <form
            onSubmit={
              handleUpdateProfile
            }
            className="space-y-5"
          >
            <div>
              <p className="text-gray-500 mb-1">
                Name
              </p>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Mobile Number
              </p>

              <input
                type="text"
                value={
                  user?.mobileNumber ||
                  ""
                }
                disabled
                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
              />
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Email
              </p>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <p className="text-gray-500">
                Role
              </p>

              <h2 className="text-xl font-semibold capitalize">
                {user?.role ||
                  "user"}
              </h2>
            </div>

            {user?.role !==
              "admin" && (
              <>
                <div>
                  <p className="text-gray-500">
                    Total Properties
                  </p>

                  <h2 className="text-xl font-semibold">
                    {totalProperties}
                  </h2>
                </div>

                <div>
                  <p className="text-gray-500">
                    Total Views
                  </p>

                  <h2 className="text-xl font-semibold">
                    {totalViews}
                  </h2>
                </div>
              </>
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
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