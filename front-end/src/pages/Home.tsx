import MessagesContainer from "../components/MessagesContainer";
import Sidebar from "../components/Sidebar";


export default function Home() {
  return (
    //By applying the bg-clip-padding class to an element, you can ensure that the background color or image is confined within the padding area of the element, and doesn't extend into the margin or border areas.
    <div className="flex smh-[450px] md:[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10">
      <Sidebar />
      <MessagesContainer />
    </div>
  );
}
