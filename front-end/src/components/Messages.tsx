import Message from "./Message";

export default function Messages() {
  return (
   //overflow auto so if the messages exceed the height of the container, it will show scrollbar
    <div className="px-4 flex-1 overflow-auto">
      <Message />
      <Message />
      <Message />
      
    </div>
  )
}
