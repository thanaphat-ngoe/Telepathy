import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const {
        authUser,
        checkAuth,
        isCheckingAuth,
        isLoggingOut,
        onlineUsers,
    } = useAuthStore();
    const { theme } = useThemeStore();

    console.log({ onlineUsers });

    useEffect(() => {
        checkAuth();
        console.log("Run use state");
    }, [checkAuth]);

    if ((isCheckingAuth && !authUser) || isLoggingOut) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div data-theme={theme}>
            <Navbar />
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/loginAuth" />} />
                <Route path="/registerAuth" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
                <Route path="/loginAuth" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/loginAuth" />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;