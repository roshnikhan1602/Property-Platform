import { useState } from "react";
import Toast from "../common/Toast";

function BookVisitModal({
    isOpen,
    onClose,
    property,
}) {
    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    if (!isOpen) return null;

const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitDate || !visitTime) {
        setToast({
            show: true,
            message: "Please select visit date and time.",
            type: "error",
        });
        return;
    }

if (visitTime < "09:00" || visitTime > "19:00") {
    setToast({
        show: true,
        message: "Visit time must be between 9:00 AM and 7:00 PM.",
        type: "error",
    });
    return;
}

    // Prevent past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${visitDate}T00:00:00`);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        setToast({
            show: true,
            message: "Please select today or a future date.",
            type: "error",
        });
        return;
    }

    try {
        setLoading(true);

        const response = await fetch(
            "http://localhost:5000/api/visits/book",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: property._id,
                    visitDate,
                    visitTime,
                    message,
                }),
            }
        );

        const data = await response.json();

        if (data.success) {
            setToast({
                show: true,
                message: "Visit booked successfully!",
                type: "success",
            });

            setTimeout(() => {
                setVisitDate("");
                setVisitTime("");
                setMessage("");

                setToast({
                    show: false,
                    message: "",
                    type: "success",
                });

                onClose();
            }, 1200);
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

                <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

                  <div className="flex items-center justify-between p-6 border-b border-gray-300">
                        <h2 className="text-2xl font-bold">
                            📅 Book a Visit
                        </h2>

                        <button
                            onClick={onClose}
                            className="text-2xl hover:text-red-500"
                        >
                            ×
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="p-6 space-y-5"
                    >

                        <div className="flex items-center gap-4 bg-blue-50 border border-blue-100 rounded-xl p-4">
                            {property.images?.length > 0 && (
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                            )}

                            <div className="flex-1">
                                <h3 className="font-semibold text-lg">
                                    {property.title}
                                </h3>

                                <p className="text-sm text-gray-600">
                                    📍 {property.locality}, {property.city}
                                </p>

                                <p className="text-blue-600 font-bold mt-1">
                                    ₹ {property.price?.toLocaleString()}
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Choose your preferred date and time. The owner will review your request.
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Visit Date
                            </label>

                            <input
                                type="date"
                                value={visitDate}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                    setVisitDate(e.target.value)
                                }
                                required
                                className="w-full border border-gray-300 rounded-lg p-3"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Visit Time
                            </label>

                          <input
    type="time"
    value={visitTime}
    min="09:00"
    max="19:00"
    onChange={(e) =>
        setVisitTime(e.target.value)
    }
    required
    className="w-full border border-gray-300 rounded-lg p-3"
/>
                        </div>

                        <div>
                            <label className="block font-medium mb-2">
                                Message (Optional)
                            </label>

                            <textarea
                                rows={3}
                                value={message}
                                onChange={(e) =>
                                    setMessage(e.target.value)
                                }
                                placeholder="Example: Please call me before the visit."
                               className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                            />
                        </div>

                       <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">

                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-3 rounded-lg border border-gray-300"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                            >
                                {loading ? "Booking Visit..." : "Book Visit"}
                            </button>

                        </div>
                    </form>
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

export default BookVisitModal;