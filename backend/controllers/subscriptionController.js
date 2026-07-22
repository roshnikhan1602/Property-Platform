const Subscription = require("../models/Subscription");
const SubscriptionHistory = require("../models/SubscriptionHistory");
const Property = require("../models/Property");
const PG = require("../models/PG");
const PDFDocument = require("pdfkit");
const User = require("../models/User");
const path = require("path");

const plans = [
  {
    name: "Free",
    price: 0,
    propertyLimit: 2,
    pgLimit: 1,
    features: [
      "2 Property Listings",
      "1 PG Listing",
      "Basic Support",
    ],
  },
  {
    name: "Premium",
    price: 299,
    propertyLimit: 10,
    pgLimit: 10,
    features: [
      "10 Property Listings",
      "10 PG Listings",
      "Priority Listing",
      "Premium Badge",
    ],
  },
  {
    name: "Elite",
    price: 999,
    propertyLimit: -1,
    pgLimit: -1,
    features: [
      "Unlimited Properties",
      "Unlimited PGs",
      "Highest Priority Listing",
      "Elite Badge",
    ],
  },
];

const getPlans = async (req, res) => {
  res.json({
    success: true,
    plans,
  });
};

const getCurrentSubscription = async (
  req,
  res
) => {
  try {
    const currentUser = await User.findById(req.user.id);

if (currentUser?.role === "admin") {
  let adminSubscription = await Subscription.findOne({
    user: req.user.id,
  }).sort({ createdAt: -1 });

  if (!adminSubscription) {
    adminSubscription = await Subscription.create({
      user: req.user.id,
      plan: "Elite",
      amount: 0,
      propertyLimit: -1,
      pgLimit: -1,
      status: "Active",
    });
  } else {
    adminSubscription.plan = "Elite";
    adminSubscription.amount = 0;
    adminSubscription.propertyLimit = -1;
    adminSubscription.pgLimit = -1;
    adminSubscription.status = "Active";

    await adminSubscription.save();
  }

  return res.json({
    success: true,
    subscription: adminSubscription,
  });
}

// Find the latest subscription
let subscription =
  await Subscription.findOne({
    user: req.user.id,
  }).sort({ createdAt: -1 });

// Brand new user -> create Free subscription
if (!subscription) {
  subscription =
    await Subscription.create({
      user: req.user.id,
      plan: "Free",
      amount: 0,
      propertyLimit: 2,
      pgLimit: 1,
      status: "Active",
    });
}

// Automatically expire subscription
if (
  subscription.status === "Active" &&
  subscription.endDate &&
  new Date(subscription.endDate) < new Date()
) {
  subscription.status = "Expired";
  await subscription.save();
}

    res.json({
      success: true,
      subscription,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to fetch subscription.",
    });
  }
};

const downgradeSubscription = async (
  req,
  res
) => {
  try {
    const { plan } = req.body;

    // Prevent paid users from switching to Free plan
const currentSubscription =
  await Subscription.findOne({
    user: req.user.id,
    status: "Active",
  });


if (
  currentSubscription &&
  currentSubscription.plan !== "Free" &&
  plan === "Free"
) {
  return res.status(400).json({
    success: false,
    message:
      "Paid subscriptions cannot be downgraded to Free plan.",
  });
}

    const selectedPlan = plans.find(
      (p) => p.name === plan
    );

    if (!selectedPlan) {
      return res.status(400).json({
        success: false,
        message: "Invalid subscription plan.",
      });
    }

    const subscription =
      await Subscription.findOne({
        user: req.user.id,
        status: "Active",
      });

    const previousPlan =
      subscription?.plan || "Free";

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found.",
      });
    }

    const propertyCount =
      await Property.countDocuments({
        owner: req.user.id,
      });

    const pgCount =
      await PG.countDocuments({
        owner: req.user.id,
      });

    if (
      selectedPlan.propertyLimit !== -1 &&
      propertyCount >
        selectedPlan.propertyLimit
    ) {
      return res.status(400).json({
        success: false,
        message: `You currently have ${propertyCount} properties. Reduce them to ${selectedPlan.propertyLimit} before downgrading.`,
      });
    }

    if (
      selectedPlan.pgLimit !== -1 &&
      pgCount >
        selectedPlan.pgLimit
    ) {
      return res.status(400).json({
        success: false,
        message: `You currently have ${pgCount} PG listings. Reduce them to ${selectedPlan.pgLimit} before downgrading.`,
      });
    }

    subscription.plan =
      selectedPlan.name;
    subscription.amount =
      selectedPlan.price;
    subscription.propertyLimit =
      selectedPlan.propertyLimit;
    subscription.pgLimit =
      selectedPlan.pgLimit;

    await subscription.save();

    await SubscriptionHistory.create({
      user: req.user.id,
      previousPlan,
      newPlan: selectedPlan.name,
      action: "Downgrade",
      amount: 0,
      payment: null,
    });

    res.json({
      success: true,
      message:
        "Subscription updated successfully.",
      subscription,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update subscription.",
    });
  }
};

const getSubscriptionHistory =
  async (req, res) => {
    try {
      const history =
        await SubscriptionHistory.find({
          user: req.user.id,
        })
          .populate("payment")
          .sort({
            createdAt: -1,
          });

      res.json({
        success: true,
        history,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch subscription history.",
      });
    }
  };

const downloadInvoice = async (req, res) => {
  try {
    const history =
      await SubscriptionHistory.findOne({
        _id: req.params.historyId,
        user: req.user.id,
      }).populate("payment");

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const user = await User.findById(req.user.id);

    const invoiceId = "INV-" + Date.now();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoiceId}.pdf`
    );


    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });


    doc.pipe(res);


    const logoPath = path.join(
      __dirname,
      "../assets/propertyhub-logo.png"
    );


    // ================= HEADER =================

    doc.image(
      logoPath,
      50,
      45,
      {
        width: 150,
      }
    );


    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(
        "PropertyHub Technologies",
        350,
        55,
        {
          width:200,
          align:"right",
        }
      );


    doc
      .fontSize(9)
      .font("Helvetica")
      .text(
        "Bangalore, Karnataka, India",
        350,
        72,
        {
          width:200,
          align:"right",
        }
      )
      .text(
        "support@propertyhub.com",
        350,
        87,
        {
          width:200,
          align:"right",
        }
      )
      .text(
        "+91 8310714096",
        350,
        102,
        {
          width:200,
          align:"right",
        }
      );



    // ================= TITLE =================


    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text(
        "INVOICE",
        50,
        160,
        {
          width:500,
          align:"center",
        }
      );



    // ================= INVOICE INFO =================


    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `Invoice Number : ${invoiceId}`,
        50,
        210
      )
      .text(
        `Invoice Date : ${
          new Date(
            history.createdAt
          ).toLocaleDateString("en-IN")
        }`,
        50,
        225
      );



    // ================= BILL TO =================


    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(
        "BILL TO",
        50,
        260
      );


    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `Name : ${user.name || "Customer"}`,
        50,
        285
      )
      .text(
        `Email : ${
          user.email || "Not Available"
        }`,
        50,
        300
      )
      .text(
        `Mobile : ${
          user.mobileNumber || "Not Available"
        }`,
        50,
        315
      );



    // ================= SUBSCRIPTION TABLE =================


    const tableY = 350;


    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(
        "SUBSCRIPTION DETAILS",
        50,
        330
      );


    doc
      .rect(
        50,
        tableY,
        500,
        30
      )
      .stroke();


    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text(
        "Description",
        60,
        tableY + 10
      )
      .text(
        "Plan",
        280,
        tableY + 10
      )
      .text(
        "Amount",
        450,
        tableY + 10
      );


    doc
      .moveTo(
        50,
        tableY + 30
      )
      .lineTo(
        550,
        tableY + 30
      )
      .stroke();


    doc
      .font("Helvetica")
      .text(
        "PropertyHub Subscription",
        60,
        tableY + 45
      )
      .text(
        history.newPlan,
        280,
        tableY + 45
      )
      .text(
        `₹${Number(
          history.amount
        ).toLocaleString("en-IN")}`,
        450,
        tableY + 45
      );



    // ================= TOTAL =================


    doc
      .fontSize(11)
      .font("Helvetica")
      .text(
        "Sub Total:",
        360,
        450
      )
      .text(
        `₹${Number(
          history.amount
        ).toLocaleString("en-IN")}`,
        480,
        450
      );


    doc
      .text(
        "GST:",
        360,
        470
      )
      .text(
        "₹0",
        480,
        470
      );


    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(
        "TOTAL:",
        360,
        500
      )
      .text(
        `₹${Number(
          history.amount
        ).toLocaleString("en-IN")}`,
        480,
        500
      );



    // ================= PAYMENT DETAILS =================


    doc
      .fontSize(13)
      .font("Helvetica-Bold")
      .text(
        "PAYMENT DETAILS",
        50,
        560
      );


    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        `Payment ID : ${
          history.payment?.razorpayPaymentId || "N/A"
        }`,
        50,
        585
      )
      .text(
        `Payment Status : ${
          history.payment?.status || "Success"
        }`,
        50,
        600
      )
      .text(
        "Payment Method : Razorpay Online Payment",
        50,
        615
      )
      .text(
        `Payment Date : ${
          history.payment
          ? new Date(
              history.payment.createdAt
            ).toLocaleDateString("en-IN")
          : "-"
        }`,
        50,
        630
      );



    // ================= FOOTER =================


    doc
      .fontSize(11)
      .font("Helvetica-Bold")
      .text(
        "Thank you for choosing PropertyHub",
        50,
        750,
        {
          width:500,
          align:"center",
        }
      );


    doc
      .fontSize(9)
      .font("Helvetica")
      .text(
        "This is a computer generated invoice and does not require signature.",
        50,
        765,
        {
          width:500,
          align:"center",
        }
      );


    doc.end();


  } catch(error){

    console.error(error);

    res.status(500).json({
      success:false,
      message:"Failed to generate invoice",
    });

  }
};

module.exports = {
  getPlans,
  getCurrentSubscription,
  downgradeSubscription,
  getSubscriptionHistory,
  downloadInvoice,
};