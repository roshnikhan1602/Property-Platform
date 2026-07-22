import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";
import RejectVisitModal from "../components/visits/RejectVisitModal";
import RescheduleVisitModal from "../components/visits/RescheduleVisitModal";

function MyVisitRequests() {
const [visits, setVisits] = useState([]);
const [loading, setLoading] = useState(true);
const [showRejectModal, setShowRejectModal] = useState(false);
const [selectedVisit, setSelectedVisit] = useState(null);
const [showRescheduleModal, setShowRescheduleModal] = useState(false);
const [toast, setToast] = useState({
  show: false,
  message: "",
  type: "success",
});
const fetchVisitRequests = async () => {
  try {
    setLoading(true);

    const response = await fetch(
      "http://localhost:5000/api/visits/owner",
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.success) {
      setVisits(data.visits);
    } else {
      setToast({
        show: true,
        message: data.message,
        type: "error",
      });
    }
  } catch (error) {
    console.error(error);

    setToast({
      show: true,
      message: "Failed to load visit requests.",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

const updateVisitStatus = async (
  visitId,
  action,
  body = {}
) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/visits/${action}/${visitId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (data.success) {
      setToast({
        show: true,
        message: data.message,
        type: "success",
      });

      fetchVisitRequests();
    } else {
      setToast({
        show: true,
        message: data.message,
        type: "error",
      });
    }
  } catch (error) {
    console.error(error);

    setToast({
      show: true,
      message: "Something went wrong.",
      type: "error",
    });
  }
};

useEffect(() => {
  fetchVisitRequests();
}, []);

if (loading) {
  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-semibold">
          Loading visit requests...
        </h2>
      </div>

      <Footer />
    </>
  );
}
return (
  <>
    <Navbar />

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Visit Requests
      </h1>

      {visits.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">

          <div className="text-6xl mb-4">
            📅
          </div>

          <h2 className="text-2xl font-semibold">
            No Visit Requests Yet
          </h2>

          <p className="text-gray-500 mt-3">
            New visit requests from users will appear here.
          </p>

        </div>
      ) : (

        <div className="grid gap-6">

  {visits.map((visit) => (

    <div
      key={visit._id}
      className="bg-white rounded-2xl shadow-md p-6"
    >

      <div className="flex flex-col lg:flex-row justify-between gap-6">

        {/* Left */}
        <div className="flex gap-5">

          <img
            src={
              visit.property?.images?.[0] ||
              visit.pg?.images?.[0] ||
              visit.propertyImage
            }
            alt={visit.propertyTitle}
            className="w-32 h-32 rounded-xl object-cover"
          />

          <div>

            <h2 className="text-2xl font-bold">
              {visit.propertyTitle}
            </h2>

            <p className="text-gray-600 mt-1">
              📍 {visit.propertyAddress},{" "}
              {visit.propertyCity}
            </p>

            <div className="mt-4 space-y-1">

              <p>
                <strong>User:</strong>{" "}
                {visit.user?.name}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {visit.user?.mobileNumber}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {visit.user?.email}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  visit.visitDate
                ).toLocaleDateString()}
              </p>

              <p>
                <strong>Time:</strong>{" "}
                {visit.visitTime}
              </p>

            </div>

            {visit.message && (

              <div className="mt-4 bg-gray-100 rounded-lg p-3">

                <p className="text-sm text-gray-700">
                  <strong>Message:</strong>{" "}
                  {visit.message}
                </p>

              </div>

            )}

          </div>

        </div>

        {/* Right */}
        <div className="flex flex-col justify-between items-end">

          <span
            className={`px-4 py-2 rounded-full font-semibold
            ${
              visit.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : visit.status === "Approved"
                ? "bg-green-100 text-green-700"
                : visit.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : visit.status === "Completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {visit.status}
          </span>

         <div className="mt-5 flex flex-col gap-3 w-44">

  {visit.status === "Pending" && (
    <>
      <button
        onClick={() =>
          updateVisitStatus(
            visit._id,
            "approve"
          )
        }
        className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition"
      >
        ✅ Approve
      </button>

    <button
  onClick={() => {
    setSelectedVisit(visit);
    setShowRejectModal(true);
  }}
  className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition"
>
  ❌ Reject
</button>
    </>
  )}

  {visit.status === "Approved" && (
    <>
      <button
        onClick={() =>
          updateVisitStatus(
            visit._id,
            "complete"
          )
        }
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
      >
        ✔ Mark Completed
      </button>

     <button
  onClick={() => {
    setSelectedVisit(visit);
    setShowRescheduleModal(true);
  }}
  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
>
  📅 Reschedule
</button>
    </>
  )}

</div>

        </div>

      </div>

    </div>

  ))}

</div>

      )}

    </div>

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

<RejectVisitModal
  isOpen={showRejectModal}
  onClose={() => {
    setShowRejectModal(false);
    setSelectedVisit(null);
  }}
  visit={selectedVisit}
  onRejected={fetchVisitRequests}
/>

<RescheduleVisitModal
  isOpen={showRescheduleModal}
  onClose={() => {
    setShowRescheduleModal(false);
    setSelectedVisit(null);
  }}
  visit={selectedVisit}
  onRescheduled={fetchVisitRequests}
/>

    <Footer />
  </>
);
}

export default MyVisitRequests;