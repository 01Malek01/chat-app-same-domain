import { useEffect } from "react";
import { useSocket } from "../Context/SocketContext";
import useConversation from "../zustand/useConversations";
import { ConversationUserType } from "./Conversations";

type Props = {
  conversation: ConversationUserType;
  isLastIndex: boolean;
};
export default function Conversation({ conversation, isLastIndex }: Props) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocket() ?? {};
  const isOnline = onlineUsers?.includes(conversation?._id);

  useEffect(() => {
    console.log(isOnline);
  }, [isOnline]);
  return (
    <>
      <div
        onClick={() => setSelectedConversation(conversation)}
        className={` ${
          isSelected ? "bg-sky-500" : ""
        } flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}></div>
        <div className="w-12 rounded-full">
          <span className={`${isOnline ? "text-green-500" : "text-red-500"}`}>
            {isOnline ? "Online" : "Offline"}
          </span>
          <img src={conversation.profilePic} alt="avatar" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between gap-3">
            <p className="font-bold">{conversation.displayName}</p>
            <span className="badge badge-secondary text-xl">🗨️</span>
          </div>
        </div>
      </div>
      {!isLastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}
