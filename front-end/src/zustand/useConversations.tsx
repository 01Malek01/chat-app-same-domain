import { create } from "zustand";
import { ConversationUserType } from "../components/Conversations";

interface ConversationState {
  selectedConversation: ConversationUserType | null;
  setSelectedConversation: (selectedConversation: ConversationUserType | null) => void;
  messages: string[];
  setMessages: (messages: string[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (
    selectedConversation: ConversationUserType | null
  ) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages: string[]) => set({ messages }),
}));

export default useConversation;
