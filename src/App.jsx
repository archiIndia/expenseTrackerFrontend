import "./App.css";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {createBrowserRouter,RouterProvider, } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/sign_up",
      element: <SignUpPage />,
    },
    {
      path: "/sign_in",
      element: <LoginPage />,
    },
    {
      path: "/app",
      element: <HomePage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
