import { useState } from "react";
import Toast from "../common/Toast";

function RejectVisitModal({
  isOpen,
  onClose,
  visit,
  onRejected,
}) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  if (!isOpen || !visit) return null;

  const handleReject = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:5000/api/visits/reject/${visit._id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rejectionReason: reason,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setToast({
          show: true,
          message: "Visit rejected successfully.",
          type: "success",
        });

        setTimeout(() => {
          setReason("");
          onRejected();
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
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">

          <div className="border-b p-5 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              ❌ Reject Visit
            </h2>

            <button
              onClick={onClose}
              className="text-2xl hover:text-red-500"
            >
              ×
            </button>
          </div>

          <div className="p-6">

            <p className="text-gray-600 mb-5">
              Please provide a reason for rejecting this visit.
            </p>

            <textarea
              rows={5}
              value={reason}
              onChange={(e) =>
                setReason(e.target.value)
              }
              placeholder="Reason (optional)"
              className="w-full border rounded-lg p-3 resize-none"
            />

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={onClose}
                className="border px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleReject}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
              >
                {loading
                  ? "Rejecting..."
                  : "Reject Visit"}
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

export default RejectVisitModal;