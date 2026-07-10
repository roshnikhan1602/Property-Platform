import { useEffect, useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaCheckCircle,
  FaHistory,
} from "react-icons/fa";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Toast from "../components/common/Toast";

import { getSubscriptionHistory } from "../services/subscriptionService";

function SubscriptionHistory() {
  const [history, setHistory] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data =
        await getSubscriptionHistory();

      if (data.success) {
        setHistory(data.history);
      } else {
        setToast({
          show: true,
          message:
            "Failed to load subscription history.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Failed to load subscription history.",
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
              ...toast,
              show: false,
            })
          }
        />
      )}

      <section className="max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* Header */}

        <div className="text-center mb-14">

          <div className="flex justify-center mb-5">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
              <FaHistory className="text-4xl text-indigo-600" />
            </div>
          </div>

          <h1 className="text-5xl font-bold text-gray-900">
            Subscription History
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-7">
            Track every subscription upgrade and
            downgrade you've made on PropertyHub.
            View payment records, subscription
            changes and activity history all in
            one place.
          </p>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center py-20">
            <p className="text-lg text-gray-600">
              Loading subscription history...
            </p>
          </div>
        ) : history.length === 0 ? (

          /* Empty State */

          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-12 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              No Subscription History
            </h2>

            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Your subscription upgrades and
              downgrades will appear here once
              you change your subscription plan.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {history.map((item) => (

              <div
                key={item._id}
                className="bg-white border border-gray-200 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-7"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                  {/* Left */}

                  <div>

                    <div className="flex items-center gap-3">

                      {item.action === "Upgrade" ? (

                        <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                          <FaArrowUp />

                          Upgrade

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold">

                          <FaArrowDown />

                          Downgrade

                        </span>

                      )}

                    </div>

                    <div className="mt-6">

                      <h3 className="text-2xl font-bold text-gray-900">

                        {item.previousPlan}

                        <span className="mx-3 text-gray-400">
                          →
                        </span>

                        {item.newPlan}

                      </h3>

                      <p className="text-gray-500 mt-2">
                        Subscription Plan Updated
                      </p>

                    </div>

                  </div>

                  {/* Right */}

                  <div className="text-left md:text-right">

                    <p className="text-sm text-gray-500">
                      Amount
                    </p>

                    <h2 className="text-4xl font-bold text-indigo-600 mt-1">

                      ₹{item.amount}

                    </h2>

                  </div>

                </div>

                {/* Footer */}

                <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div>

                    <p className="text-sm text-gray-500">
                      Date & Time
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {new Date(
                        item.createdAt
                      ).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Payment Status
                    </p>

                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold mt-1">

                      <FaCheckCircle />

                      {item.payment
                        ? item.payment.status
                        : "Success"}

                    </span>

                  </div>

                  <div>

                    <p className="text-sm text-gray-500">
                      Payment Method
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">

                      {item.payment
                        ? "Online Payment"
                        : "No Payment"}

                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      <Footer />
    </>
  );
}

export default SubscriptionHistory;