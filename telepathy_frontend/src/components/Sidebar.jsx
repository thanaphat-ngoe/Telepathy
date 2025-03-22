import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Users } from "lucide-react";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";

const Sidebar = () => {
    const { getChats, chats, selectedChat, setSelectedChat, isChatsLoading } = useChatStore();
    const { onlineUsers } = useAuthStore();

    useEffect(() => {
        getChats();
    }, [getChats]);

    if (isChatsLoading) return <SidebarSkeleton />;

    return (
        <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
                <div className="flex items-center gap-2">
                    <Users className="size-6" />
                    <span className="font-medium hidden lg:block">Contacts</span>
                </div>
                {/* TODO: Online filter toggle */}
            </div>
            
            <div className="overflow-y-auto w-full py-3">
                {chats.map((chat) => (
                    <button
                        key={chat.participants._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`
                            w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors
                            ${selectedChat?.participants._id === chat.participants._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                        `}
                    >
                        <div className="relative mx-auto lg:mx-0">
                            <img
                                src={chat.participants.profilePic || "/avatar.png"}
                                alt={chat.participants.name}
                                className="size-12 object-cover rounded-full"
                            />
                            {onlineUsers.includes(chat.participants._id) && (
                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                            )}
                        </div>

                        {/* User info - only visible on larger screens */}
                        <div className="hidden lg:block text-left min-w-0">
                            <div className="font-medium truncate">{chat.participants.firstname} {chat.participants.lastname}</div>
                            <div className="text-sm text-zinc-400">
                                {onlineUsers.includes(chat.participants._id) ? "Online" : "Offline"}
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    ) 
};

export default Sidebar;