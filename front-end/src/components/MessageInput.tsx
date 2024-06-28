import { BiSend } from "react-icons/bi";

export default function MessageInput() {
  return (
    <form className="px-4 my-3 ">
      <div className="w-full relative">
        <input
          type="text"
          className="input  input-bordered w-full text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 text-white"
       placeholder="Type your message here..."
       />
       <button type="submit" className=" rounded-lg absolute inset-y-0 end-0 flex items-center px-3">
        <BiSend className="text-2xl text-gray-300" />
       </button>
      </div>
    </form>
  );
}
