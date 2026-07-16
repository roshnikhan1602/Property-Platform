const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load .env FIRST
dotenv.config();

const connectDB = require("./config/db");

const pgRoutes = require("./routes/pgRoutes");
const pgReviewRoutes = require("./routes/pgReviewRoutes");
const chatRoutes = require("./routes/chatRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const shareRoutes = require("./routes/shareRoutes");

require("./jobs/subscriptionReminder");
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use(
  "/api/properties",
  require("./routes/propertyRoutes")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/wishlist",
  require("./routes/wishlistRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/support",
  require("./routes/supportRoutes")
);

app.use(
  "/api/reviews",
  require("./routes/reviewRoutes")
);

app.use(
  "/api/pg-reviews",
  pgReviewRoutes
);

app.use(
  "/api/pgs",
  pgRoutes
);

app.use(
  "/api/chatbot",
  chatRoutes
);

app.use(
  "/api/stats",
  require("./routes/statsRoutes")
);

// Notification Routes
app.use(
  "/api/notifications",
  notificationRoutes
);

app.use(
  "/api/subscriptions",
  subscriptionRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

// NEW Share Route
app.use(
  "/api/share",
  shareRoutes
);

app.get("/", (req, res) => {
  res.send("Property Platform Backend 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});