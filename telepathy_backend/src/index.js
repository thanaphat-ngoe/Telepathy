import express, { json, urlencoded } from "express";
import session from "express-session";
import passport from "passport";
import dotenv from "dotenv";
import cors from "cors";
import MongoStore from "connect-mongo";
import databaseConfig from "./config/databaseConfig.js";
import authRoutes from "./routes/authRoutes.js";
import "./config/passportConfig.js"

dotenv.config();
databaseConfig();

const app = express();

// CORS configuration
app.use(cors({
    origin: ["http://localhost:3001"], // Frontend domain
    credentials: true // Allow sending cookies with API requests
}));

// Middleware
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ limit: "100mb", extended: true }));

// Secure Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: "session",
        ttl: 24 * 60 * 60, // 1 day (86400 seconds)
        autoRemove: "interval",
        autoRemoveInterval: 10 // Cleanup expired sessions every 10 minutes
    }),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 1 day (86400000 ms)
        // Disable secure in development (HTTP only)
        secure: process.env.NODE_ENV === "production",
        // Prevents JavaScript access to cookies
        httpOnly: true, 
        // Allows cross-site cookies in development
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax" 
    }
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// Start Application
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
});