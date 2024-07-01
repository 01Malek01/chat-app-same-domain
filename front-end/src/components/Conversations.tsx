import toast from "react-hot-toast";
import { useGetConversations } from "../ApiHooks/useGetConversations";
import Conversation from "./Conversation";

export type ConversationUserType = {
  name: string;
  displayName: string;
  email: string;
  gender: string;
  profilePic: string;
  _id: string;
  updatedAt?: string;
  _v?: number;
};
export default function Conversations() {
  const { conversations, loading } = useGetConversations();
  return (
    <div className="py-2 flex flex-col overflow-auto ">
      {loading ? toast.loading("Loading...") : null}
      {conversations.map(
        (conversation: ConversationUserType, index: number) => (
          <Conversation
            isLastIndex={index === conversations.length - 1}
            key={conversation._id}
            conversation={conversation}
          />
        )
      )}
    </div>
  );
}
