import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/userModels.js";

passport.use(new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false, { message: "No account found with this email." });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return done(null, false, { message: "Incorrect password." });

        return done(null, user);
    } catch (error) {
        return done(error);
    }})
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findById(_id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});