import bcrypt from "bcryptjs";
import passport from "passport";
import User from '../models/userModels.js';

export const authRegister = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({ message: "All field are required." });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ firstname, lastname, email, password: hashedPassword });
        const result = await newUser.save();

        res.status(201).json({ message: "Registration successful!", email: result.email, firstname: result.firstname, lastname: result.lastname });
    } catch (error) {
        console.error("Registration error!:", error);
        res.status(500).json({ message: "An error occurred while creating your account." });
    }
};

export const authLogin = (req, res, next) => {
    passport.authenticate("local", (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(401).json({ message: info.message }); 

        req.logIn(user, (error) => {
            if (error) return next(error);
            return res.json({ message: "Login successful", firstname: user.firstname, lastname: user.lastname, email: user.email, createdAt: user.createdAt });
        });
    })(req, res, next);
};

export const authStatus = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: "Authenticated", firstname: req.user.firstname, lastname: req.user.lastname, email: req.user.email, createdAt: req.user.createdAt });
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};

export const authLogout = (req, res) => {
    req.logout((error) => {
        if (error) {
            console.error("Logout failed:", error);
            return res.status(500).json({ message: "Logout failed. Try again." });
        }
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            console.log("User logged out.");
            res.status(200).json({ message: "You have been logged out successfully." });
        });
    });
};

export const authSetup2fa = async () => {};

export const authVerify2fa = async () => {};

export const authReset2fa = async () => {};