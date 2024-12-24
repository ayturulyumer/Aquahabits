
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";
import "./scss/App.scss"

import { AuthProvider } from "./context/authContext.jsx";

import Home from "./pages/Home/Home.jsx";
import NavbarTop from "./components/Navbar/NavbarTop.jsx";
import NavbarBottom from "./components/Navbar/NavbarBottom.jsx";
import { useScreenSize } from "./hooks/useScreenSize.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import MyHabits from "./pages/MyHabits/MyHabits.jsx";
import MyMissions from "./pages/MyMissions/MyMissions.jsx";
import DashboardHome from "./pages/Dashboard/DashboardHome.jsx";
import MyOcean from "./pages/MyOcean/MyOcean.jsx";

const Layout = () => {
  const isMobile = useScreenSize()
  const location = useLocation()

  // Check if the path starts with '/dashboard'
  const hideNavbarAndFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbarAndFooter && (isMobile ? <NavbarBottom /> : <NavbarTop />)}
      <Outlet />
      {!hideNavbarAndFooter && <Footer />}
    </>

  )
}
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/dashboard", element: <Dashboard />,
          children: [
            { index: true, element: <DashboardHome /> },
            { path: "my-habits", element: <MyHabits /> },
            { path: "my-missions", element: <MyMissions /> },
            { path: "my-ocean", element: <MyOcean /> },
          ],
        },
        { path: "/signup", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  return <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>;
}

export default App;

