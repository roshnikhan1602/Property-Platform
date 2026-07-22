import { useState } from "react";
import Toast from "../common/Toast";

function RescheduleVisitModal({
  isOpen,
  onClose,
  visit,
  onRescheduled,
}) {
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  if (!isOpen || !visit) return null;

  const handleReschedule = async () => {
    if (!visitDate || !visitTime) {
      setToast({
        show: true,
        message: "Please select date and time.",
        type: "error",
      });
      return;
    }

    try {
  setLoading(true);

  const response = await fetch(
    `http://localhost:5000/api/visits/reschedule/${visit._id}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        visitDate,
        visitTime,
        reason,
      }),
    }
  );

  const data = await response.json();

  if (data.success) {
    setToast({
      show: true,
      message: "Visit rescheduled successfully.",
      type: "success",
    });

    setTimeout(() => {
      setVisitDate("");
      setVisitTime("");
      setReason("");
      onRescheduled();
      onClose();
    }, 1000);
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
} finally {
  setLoading(false);
}
  };

  return (
  <>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6 overflow-y-auto">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">

        <div className="flex justify-between items-center border-b p-5">
          <h2 className="text-2xl font-bold">
            📅 Reschedule Visit
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-5">

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">

            <h3 className="font-semibold text-lg">
              {visit.propertyTitle}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              Current Schedule
            </p>

            <p className="font-medium mt-1">
              {new Date(
                visit.visitDate
              ).toLocaleDateString()} • {visit.visitTime}
            </p>

          </div>

          <div>
            <label className="block font-medium mb-2">
              New Visit Date
            </label>

            <input
              type="date"
              value={visitDate}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) =>
                setVisitDate(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              New Visit Time
            </label>

            <input
              type="time"
              value={visitTime}
              onChange={(e) =>
                setVisitTime(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Reason (Optional)
            </label>

            <textarea
              rows={3}
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Reason for rescheduling..."
              className="w-full border rounded-lg p-3 resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">

            <button
              onClick={onClose}
              className="border px-5 py-3 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleReschedule}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
            >
              {loading
                ? "Rescheduling..."
                : "Reschedule Visit"}
            </button>

          </div>

        </div>

      </div>

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
  </>
);
}

export default RescheduleVisitModal;