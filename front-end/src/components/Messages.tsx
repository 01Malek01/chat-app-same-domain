import { useEffect, useRef } from "react";
import { useGetMessages } from "../ApiHooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import useListenMessages from "../ApiHooks/useListenMessages";

const Messages: React.FC = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef<HTMLDivElement>(null);
  useListenMessages();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <MessageSkeleton />
      ) : (
        messages.map((message) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
