import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function ContactSupport() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
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

      const response =
        await fetch(
          "http://localhost:5000/api/support",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              formData
            ),
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

      <div className="min-h-screen bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">
              Contact & Support
            </h1>

            <p className="text-gray-600 mt-4">
              Need help? Our team is here
              to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white p-8 rounded-2xl shadow-md">

              <h2 className="text-2xl font-semibold mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">

                <div className="flex items-center gap-4">
                  <FaPhoneAlt className="text-blue-600 text-xl" />

                  <div>
                    <p className="font-medium">
                      Phone
                    </p>

                    <p className="text-gray-600">
                      +91 1234567890
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaEnvelope className="text-blue-600 text-xl" />

                  <div>
                    <p className="font-medium">
                      Email
                    </p>

                    <p className="text-gray-600">
                      support@propertyhub.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />

                  <div>
                    <p className="font-medium">
                      Address
                    </p>

                    <p className="text-gray-600">
                      Bengaluru,
                      Karnataka, India
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md">

              <h2 className="text-2xl font-semibold mb-6">
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
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
                >
                  {loading
                    ? "Sending..."
                    : "Submit"}
                </button>

              </form>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default ContactSupport;