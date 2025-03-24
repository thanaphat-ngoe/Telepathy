import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { create } from "zustand"
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async () => {
        try {
            const response = await axiosInstance.get("/auth/status");
            set({ authUser: response.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null});
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    signUp: async (formData) => {
        set({ isSigningUp: true });
        try {
            await axiosInstance.post("/auth/register", formData);
            const response = await axiosInstance.post("/auth/login", { 
                "email": formData.email,
                "password": formData.password 
            });
            set({ authUser: response.data.email });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    logIn: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosInstance.post("/auth/login", formData);
            set({ authUser: response.data.email });
            toast.success("Logged in successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logOut: async () => {
        set({ isLoggingOut: true });
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.success(error.response.data.message);
        } finally {
            set({ isLoggingOut: false });
        }
    },
    updateProfile: async (formData) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.put("/auth/update-profile", formData);
            set({ authUser: response.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error(error.response.data.message); 
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    connectSocket: () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io("http://localhost:3000", {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket: socket });
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },
    disconnectSocket: () => {
        if (get().socket?.connected) get().socket.disconnect(); 
    }
}));