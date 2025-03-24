import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    messages: [],
    chats: [],
    selectedChat: null,
    isChatsLoading: false,
    isMessagesLoading: false,
    getChats: async () => {
        set({ isChatsLoading: true });
        try {
            const response = await axiosInstance.get("/chats/getChat");
            set({ chats: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isChatsLoading: false });
        }
    },
    getMessages: async (chatId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosInstance.get(`/messages/get/${chatId}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async (messageData) => {
        const { selectedChat, messages } = get();
        try {
            console.log(selectedChat.participants._id);
            const response = await axiosInstance.post(`/messages/send/${selectedChat.participants._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedChat } = get();
        if (!selectedChat) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if (newMessage.senderId !== selectedChat.participants._id) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    setSelectedChat: (selectedChat) => set({ selectedChat }),
}));