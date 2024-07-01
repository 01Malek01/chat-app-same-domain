import { Message as MessageType } from "../ApiHooks/useGetMessages";
import { useAuth } from "../Context/AuthContext";
import {  formatTimeFromMongoDate } from "../utils";
import useConversation from "../zustand/useConversations";

type Props = {
  message: MessageType;
};

export default function Message({ message }: Props) {
  const { user } = useAuth();
  const { selectedConversation } = useConversation();
  const fromMe = user?._id === message.sender;
  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start";
  const profilePic = fromMe ? user?.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-sky-500" : "bg-slate-500";
 

  return (
    <div className={chatClassName}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={profilePic || "default-profile-pic-url"} // Replace with a default profile picture URL if needed
            alt="Avatar"
          />
        </div>
      </div>
      <div className="chat-header">{fromMe ? "You" : message.sender}</div>
      <div className={`chat-bubble ${bubbleBgColor} pb-2 text-gray-700`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatTimeFromMongoDate(message.createdAt)}
      </div>
    </div>
  );
}
