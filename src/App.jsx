import "./App.css";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import {createBrowserRouter,RouterProvider, } from "react-router-dom";
import Expense from "@/Expense.jsx";
import NotFoundPage from "@/NotFoundPage.jsx";

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
      children: [
        {
          path: "/app",
          element: <Expense />,
        },
        {
          path: "/app/expenses",
          element: <Expense />,
        },
        {
          // any route that is not defined
          // will be redirected to this route.
          path: "*",
          element: <NotFoundPage/>
        }
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
