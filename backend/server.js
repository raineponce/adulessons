// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const rateLimit = require("express-rate-limit");
const path = require("path");
const connectDB = require("./config/db");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// --- Middleware ---
// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));
// Serve manual API test pages on same origin for session/cookie testing
app.use("/tests", express.static(path.join(__dirname, "../tests")));

// Configure session with MongoDB store (1-week cookie)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);

// General API rate limiter: 200 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

// --- Routes ---
app.use("/auth", require("./routes/auth"));
app.use("/lessons", apiLimiter, require("./routes/lessons"));
app.use("/prizes", apiLimiter, require("./routes/prizes"));
app.use("/codes", apiLimiter, require("./routes/codes"));
app.use("/profile", apiLimiter, profileRoutes);
app.use("/api/profile", apiLimiter, profileRoutes);

// Shortcut route for the manual backend test harness
app.get("/user-progress-test.html", (req, res) => {
  res.sendFile(path.join(__dirname, "../tests/user-progress-test.html"));
});

// Fallback: serve index.html for any unmatched routes (SPA-style)
app.get("*", apiLimiter, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`AduLessons server running on port ${PORT}`);
});
