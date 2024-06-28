
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";
function App() {
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <AppRoutes />
    </div>
  );
}

export default App;
