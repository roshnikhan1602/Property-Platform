import { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ContactSupport({
  setShowLoginModal,
}) {
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  const [myTickets, setMyTickets] =
    useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const fetchMyTickets = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/support/user/${user._id}`,
        {
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setMyTickets(
          data.messages
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      return setToast({
        show: true,
        message:
          "Please fill all fields",
        type: "error",
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(
        formData.email
      )
    ) {
      return setToast({
        show: true,
        message:
          "Please enter a valid email",
        type: "error",
      });
    }

    if (
      formData.message.length < 10
    ) {
      return setToast({
        show: true,
        message:
          "Message must contain at least 10 characters",
        type: "error",
      });
    }

    try {
      setLoading(true);

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/support`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            ...formData,
          }),
        }
      );

      const data =
        await response.json();

      if (data.success) {
        setToast({
          show: true,
          message:
            "Message sent successfully",
          type: "success",
        });

        setFormData({
          name: "",
          email: "",
          message: "",
        });

        fetchMyTickets();
      } else {
        setToast({
          show: true,
          message:
            data.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Failed to send message",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTickets();
  }, []);

  return (
    <>
      <Navbar
        setShowLoginModal={
          setShowLoginModal
        }
      />

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

      <div className="min-h-screen bg-gray-50 py-8 sm:py-10 md:py-12 lg:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Contact & Support
            </h1>

            <p className="text-sm sm:text-base text-gray-600 mt-3 sm:mt-4 px-2">
              Need help? Our team is here
              to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">

            {/* Get In Touch */}
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-200 shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
                Get In Touch
              </h2>

              <div className="space-y-5 sm:space-y-6">

                <div className="flex items-start gap-3 sm:gap-4">
                  <FaPhoneAlt className="text-blue-600 text-lg sm:text-xl mt-1 shrink-0" />

                  <div className="min-w-0">
                    <p className="font-medium">
                      Phone
                    </p>

                    <p className="text-sm sm:text-base text-gray-600 break-words">
                      +91 1234567890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <FaEnvelope className="text-blue-600 text-lg sm:text-xl mt-1 shrink-0" />

                  <div className="min-w-0">
                    <p className="font-medium">
                      Email
                    </p>

                    <p className="text-sm sm:text-base text-gray-600 break-all">
                      support@propertyhub.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <FaMapMarkerAlt className="text-blue-600 text-lg sm:text-xl mt-1 shrink-0" />

                  <div className="min-w-0">
                    <p className="font-medium">
                      Address
                    </p>

                    <p className="text-sm sm:text-base text-gray-600">
                      Bengaluru,
                      Karnataka, India
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Send Message */}
            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-200 shadow-md">
              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
                Send a Message
              </h2>

              <form
                onSubmit={
                  handleSubmit
                }
                className="space-y-4"
              >
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Your Message"
                  value={
                    formData.message
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60 text-sm sm:text-base"
                >
                  {loading
                    ? "Sending..."
                    : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* My Support Tickets */}
        {myTickets && (
          <div className="max-w-6xl mx-auto px-0 sm:px-2 md:px-0 pt-6 sm:pt-8 pb-6 sm:pb-10">

            <div className="bg-white p-5 sm:p-6 md:p-8 rounded-2xl border border-gray-200 shadow-md">

              <h2 className="text-xl sm:text-2xl font-semibold mb-5 sm:mb-6">
                My Support Tickets
              </h2>

              {myTickets.length === 0 ? (
                <p className="text-sm sm:text-base text-gray-500">
                  No support tickets found.
                </p>
              ) : (
                <div className="overflow-x-auto w-full">

                  <table className="w-full min-w-[650px]">

                    <thead>
                      <tr className="border-b border-gray-200">

                        <th className="text-left py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                          Date
                        </th>

                        <th className="text-left py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                          Status
                        </th>

                        <th className="text-left py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                          Message
                        </th>

                        <th className="text-left py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                          Admin Reply
                        </th>

                      </tr>
                    </thead>

                    <tbody>
                      {myTickets.map(
                        (ticket) => (
                          <tr
                            key={
                              ticket._id
                            }
                            className="border-b border-gray-200"
                          >

                            <td className="py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                              {new Date(
                                ticket.createdAt
                              ).toLocaleDateString()}
                            </td>

                            <td className="py-3 px-2 text-sm sm:text-base whitespace-nowrap">
                              {ticket.status}
                            </td>

                            <td className="py-3 px-2 text-sm sm:text-base min-w-[220px]">
                              {ticket.message}
                            </td>

                            <td className="py-3 px-2 text-sm sm:text-base min-w-[220px]">
                              {ticket.reply ||
                                "-"}
                            </td>

                          </tr>
                        )
                      )}
                    </tbody>

                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ContactSupport;