import { create } from "zustand";
import { ConversationUserType } from "../components/Conversations";
import { Message } from "../ApiHooks/useGetMessages";

interface ConversationState {
  selectedConversation: ConversationUserType | null;
  setSelectedConversation: (selectedConversation: ConversationUserType | null) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (
    selectedConversation: ConversationUserType | null
  ) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
}));

export default useConversation;
