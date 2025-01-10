
import { createBrowserRouter, RouterProvider, Outlet, useLocation, Navigate } from "react-router-dom";
import "./scss/App.scss"

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

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
import MyQuests from "./pages/MyQuests/MyQuests.jsx";
import MyAquarium from "./pages/MyAquarium/MyAquarium.jsx";


const queryClient = new QueryClient();

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
            { index: true, element: <Navigate to="my-habits" /> },
            { path: "my-habits", element: <MyHabits /> },
            { path: "my-quests", element: <MyQuests /> },
            { path: "my-aquarium", element: <MyAquarium /> },
          ],
        },
        { path: "/signup", element: <Register /> },
        { path: "/login", element: <Login /> },
      ],
    },
  ]);
  /// NEED TO IMPLEMENT REACT QUERY
  return <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>;
}

export default App;

