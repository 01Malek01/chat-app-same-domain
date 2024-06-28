export default function Conversation() {
  return (
    <>
      <div className=" flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
        <div className="avatar online"></div>
        <div className="w-12 rounded-full">
          <img src="https://placeimg.com/192/192/people" alt="avatar" />
        </div>
        <div className="flex flex-col flex-1">
         <div className="flex justify-between gap-3">
          <p className="font-bold">name here of receiver</p>
          <span className="badge badge-secondary text-xl">🗨️</span>
         </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}
