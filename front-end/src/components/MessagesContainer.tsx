import { SiImessage } from "react-icons/si";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

export default function MessagesContainer() {
  const noChatSelected = true;
  return (
    <div className="md:min-w-[450px] flex flex-col  ">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text mr-2">To</span>
            <span className="text-gray-900 font-bold">john wakanda</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
}

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
    <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
      <p>welcome 👋 name goes here </p>
      <p>select a chat to start messaging</p>
      <SiImessage className="text-3xl md:text-6xl txt-center" />
    </div>
    </div>
  );
};