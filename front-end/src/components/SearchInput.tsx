import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import useConversation from "../zustand/useConversations";
import { useGetConversations } from "../ApiHooks/useGetConversations";
import toast from "react-hot-toast";

export type conversation = {
  _id : string,
  displayName : string,
  name: string,
  email: string,
  profilePic?: string,
  gender : string,
  _v?: number
}

export default function SearchInput() {
  const [value, setValue] = useState("");
  const {setSelectedConversation}  = useConversation();
  const {conversations} = useGetConversations();
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!value) return;
    if (value.length < 3) {
      toast.error("Search term must be at least 3 characters");
      return

    }
const conversation = conversations.find((conversation: conversation) => conversation.displayName.toLowerCase().includes(value.toLowerCase()));

if (conversation) {
  setSelectedConversation(conversation);
  setValue("");
  return

}else{
  toast.error("No conversation found");
  return
}
  }
  return (
    <form className=" flex items-center gap-2" onSubmit={handleSubmit}>
      <input value={value} onChange={(e) => setValue(e.target.value)} type="text" placeholder="Search" className="input input-bordered rounded  w-full" />
      <button type="submit" className="btn btn-primary"><BiSearch /></button>
    </form>
  )
}
