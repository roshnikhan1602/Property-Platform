const crypto = require("crypto");

const razorpay = require("../config/razorpay");
const Payment = require("../models/Payment");
const Subscription = require("../models/Subscription");
const SubscriptionHistory = require("../models/SubscriptionHistory");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const subscriptionSuccessEmail = require("../templates/subscriptionSuccessEmail");

const createOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

if (user?.role === "admin") {
  return res.status(403).json({
    success: false,
    message: "Admin already has the Elite plan.",
  });
}
    const { plan, amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create order.",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
   const currentUser = await User.findById(req.user.id);

if (currentUser?.role === "admin") {
  return res.status(403).json({
    success: false,
    message: "Admin does not require a subscription.",
  });
}
    const {
      plan,
      amount,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        razorpay_order_id +
          "|" +
          razorpay_payment_id
      )
      .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    const limits = {
      Free: {
        propertyLimit: 2,
        pgLimit: 1,
      },
      Premium: {
        propertyLimit: 10,
        pgLimit: 10,
      },
      Elite: {
        propertyLimit: -1,
        pgLimit: -1,
      },
    };

   const startDate = new Date();

const endDate = new Date();

if (plan === "Free") {
  endDate.setDate(endDate.getDate() + 15);
} else if (plan === "Premium") {
  endDate.setMonth(endDate.getMonth() + 1);
} else if (plan === "Elite") {
  endDate.setMonth(endDate.getMonth() + 3);
}

    let subscription =
      await Subscription.findOne({
        user: req.user.id,
        status: "Active",
      });

    const previousPlan =
      subscription
        ? subscription.plan
        : "Free";

    if (subscription) {
      subscription.plan = plan;
      subscription.amount = amount;
      subscription.propertyLimit =
        limits[plan].propertyLimit;
      subscription.pgLimit =
        limits[plan].pgLimit;
      subscription.startDate =
        startDate;
      subscription.endDate = endDate;

      // Reset reminder flags for new subscription
      subscription.status = "Active";
      subscription.expiryReminderSent = false;
      subscription.expiredEmailSent = false;

      await subscription.save();
    } else {
      subscription =
        await Subscription.create({
          user: req.user.id,
          plan,
          amount,
          propertyLimit:
            limits[plan].propertyLimit,
          pgLimit:
            limits[plan].pgLimit,
          startDate,
          endDate,
          status: "Active",

          // Initialize flags
          expiryReminderSent: false,
          expiredEmailSent: false,
        });
    }

    const payment =
      await Payment.create({
        user: req.user.id,
        subscription:
          subscription._id,
        plan,
        amount,
        razorpayOrderId:
          razorpay_order_id,
        razorpayPaymentId:
          razorpay_payment_id,
        razorpaySignature:
          razorpay_signature,
        status: "Success",
      });

    await SubscriptionHistory.create({
      user: req.user.id,
      previousPlan,
      newPlan: plan,
      action: "Upgrade",
      amount,
      payment: payment._id,
    });

    const user =
      await User.findById(
        req.user.id
      );

    if (user.email) {
      await sendEmail(
        user.email,
        `Your PropertyHub ${plan} Plan is Activated 🎉`,
        subscriptionSuccessEmail(
          user.name,
          plan,
          amount,
          endDate
        )
      );
    }

    res.json({
      success: true,
      message:
        "Payment verified successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Payment verification failed.",
    });
  }
};

module.exports = {
  createOrder,
  verifyPayment,
};