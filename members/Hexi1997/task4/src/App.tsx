import { RouterProvider } from "react-router-dom";
import { routers } from "./pages/routes";
function App() {
  return <RouterProvider router={routers} />;
}

export default App;
