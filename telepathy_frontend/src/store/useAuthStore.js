import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand"

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/status");
            set({ authUser: response.data })
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null})
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (formData) => {
        try {
            set({ isSigningUp: true });
            await axiosInstance.post("/auth/register", formData);
            const response = await axiosInstance.post("/auth/login", { 
                "email": formData.email,
                "password": formData.password 
            });
            set({ authUser: response.data.email });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logIn: async (formData) => {
        try {
            set({ isLoggingIn: true })
            const response = await axiosInstance.post("/auth/login", formData);
            set({ authUser: response.data.email });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logOut: async () => {
        try {
            set({ isLoggingOut: true })
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.success(error.response.data.message)
        } finally {
            set({ isLoggingOut: false });
        }
    },
    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", formData);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        }
        catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message); 
        }
        finally {
            set({ isUpdatingProfile: false })
        }
    }
}));