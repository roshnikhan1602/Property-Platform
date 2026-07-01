const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env FIRST
dotenv.config();

const connectDB = require("./config/db");
const pgRoutes = require("./routes/pgRoutes");
const chatRoutes = require("./routes/chatRoutes");
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
  "/api/pgs",
  pgRoutes
);

app.use(
  "/api/chatbot",
  chatRoutes
);

app.get("/", (req, res) => {
  res.send("Property Platform Backend 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});