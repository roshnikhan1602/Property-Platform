import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PlanCard from "../components/subscription/PlanCard";
import Toast from "../components/common/Toast";

function Subscription() {
  const location = useLocation();
  const [plans, setPlans] = useState([]);

  const [currentPlan, setCurrentPlan] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  useEffect(() => {
  fetchPlans();
  fetchCurrentPlan();

  if (location.state?.message) {
    setToast({
      show: true,
      message: location.state.message,
      type: "error",
    });

    window.history.replaceState({}, document.title);
  }
}, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/subscriptions/plans"
      );

      const data = await response.json();

      if (data.success) {
        setPlans(data.plans);
      } else {
        setToast({
          show: true,
          message:
            "Failed to load subscription plans.",
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Failed to load subscription plans.",
        type: "error",
      });
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/subscriptions/current",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setCurrentPlan(data.subscription);
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          "Unable to fetch current subscription.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDaysRemaining = () => {
    if (
      !currentPlan?.endDate ||
      currentPlan.plan === "Free"
    )
      return null;

    const today = new Date();

    const expiry = new Date(
      currentPlan.endDate
    );

    const diff = Math.ceil(
      (expiry - today) /
        (1000 * 60 * 60 * 24)
    );

    return diff;
  };

  const daysRemaining =
    getDaysRemaining();

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

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold">
            Subscription Plans
          </h1>

          <p className="text-gray-600 mt-4">
            Choose the perfect plan for your
            property business.
          </p>

          {currentPlan && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full font-medium">
                Current Plan :{" "}
                {currentPlan.plan}
              </div>

              <div
                className={`px-5 py-2 rounded-full font-medium ${
                  currentPlan.status ===
                  "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                Status :{" "}
                {currentPlan.status}
              </div>

              {currentPlan.plan !==
                "Free" &&
                currentPlan.endDate && (
                  <>
                    <div className="bg-purple-100 text-purple-700 px-5 py-2 rounded-full font-medium">
                      {currentPlan.status ===
                      "Active"
                        ? "Expires"
                        : "Expired On"}
                      {" : "}
                      {new Date(
                        currentPlan.endDate
                      ).toLocaleDateString()}
                    </div>

                    {currentPlan.status ===
                      "Active" && (
                      <div
                        className={`px-5 py-2 rounded-full font-medium ${
                          daysRemaining > 7
                            ? "bg-green-100 text-green-700"
                            : daysRemaining > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {daysRemaining > 0
                          ? `${daysRemaining} days left`
                          : "Expired"}
                      </div>
                    )}
                  </>
                )}
            </div>
          )}
        </div>

        {loading ? (
          <p className="text-center mt-16">
            Loading...
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {plans.map((plan) => (
              <PlanCard
                key={plan.name}
                plan={plan}
                currentPlan={currentPlan}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Subscription;