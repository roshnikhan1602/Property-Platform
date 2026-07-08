import { useState } from "react";
import {
  createOrder,
  verifyPayment,
} from "../../services/subscriptionService";
import Toast from "../common/Toast";

function PlanCard({
  plan,
  currentPlan,
}) {
  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  const isCurrentPlan =
    currentPlan?.plan === plan.name;

  const handlePayment = async () => {
    if (plan.price === 0) return;

    try {
      setLoading(true);

      const orderResponse =
        await createOrder(
          plan.name,
          plan.price
        );

      if (!orderResponse.success) {
        setToast({
          show: true,
          message:
            "Unable to create payment order.",
          type: "error",
        });

        return;
      }
      const options = {
        key: import.meta.env
          .VITE_RAZORPAY_KEY_ID,

        amount:
          orderResponse.order.amount,

        currency:
          orderResponse.order.currency,

        name: "PropertyHub",

        description: `${plan.name} Subscription`,

        order_id:
          orderResponse.order.id,

        handler: async function (
          response
        ) {
          try {
            const verifyResponse =
              await verifyPayment({
                plan: plan.name,
                amount: plan.price,
                razorpay_order_id:
                  response.razorpay_order_id,
                razorpay_payment_id:
                  response.razorpay_payment_id,
                razorpay_signature:
                  response.razorpay_signature,
              });

            if (
              verifyResponse.success
            ) {
              setToast({
                show: true,
                message:
                  "Subscription activated successfully.",
                type: "success",
              });

              setTimeout(() => {
                window.location.reload();
              }, 1500);
            } else {
              setToast({
                show: true,
                message:
                  verifyResponse.message,
                type: "error",
              });
            }
          } catch (error) {
            console.error(error);

            setToast({
              show: true,
              message:
                "Payment verification failed.",
              type: "error",
            });
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

      razorpay.on(
        "payment.failed",
        function () {
          setToast({
            show: true,
            message:
              "Payment failed. Please try again.",
            type: "error",
          });
        }
      );
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Payment failed.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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

      <div
        className={`rounded-3xl shadow-lg border p-8 transition hover:shadow-2xl ${
          plan.name === "Premium"
            ? "border-blue-600 scale-105"
            : "border-gray-200"
        }`}
      >
        {plan.name ===
          "Premium" && (
          <div className="bg-blue-600 text-white text-center py-2 rounded-full mb-6 font-semibold">
            Most Popular
          </div>
        )}

        <h2 className="text-3xl font-bold text-center">
          {plan.name}
        </h2>

        <div className="text-center mt-6">
          <span className="text-5xl font-bold text-blue-600">
            ₹{plan.price}
          </span>

          {plan.price > 0 && (
            <span className="text-gray-500">
              {" "}
              /month
            </span>
          )}
        </div>

        <div className="mt-8 space-y-3">
          {plan.features.map(
            (
              feature,
              index
            ) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <span className="text-green-600">
                  ✓
                </span>

                <span>
                  {feature}
                </span>
              </div>
            )
          )}
        </div>

        <button
          disabled={
            isCurrentPlan ||
            loading
          }
          onClick={
            handlePayment
          }
          className={`w-full mt-10 py-3 rounded-xl font-semibold transition ${
            isCurrentPlan
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          }`}
        >
          {loading
            ? "Processing..."
            : isCurrentPlan
            ? "Current Plan"
            : plan.price ===
              0
            ? "Free Plan"
            : "Buy Now"}
        </button>
      </div>
    </>
  );
}

export default PlanCard;