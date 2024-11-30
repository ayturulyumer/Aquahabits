
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./scss/App.scss"

import Home from "./pages/Home/Home.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />

  </>
)
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

