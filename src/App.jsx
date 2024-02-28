import "./App.css";
import HomePage from "./HomePage.jsx";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Expense from "@/Expense.jsx";
import NotFoundPage from "@/NotFoundPage.jsx";
import ComingSoonPage from "@/ComingSoonPage.jsx";
import DashboardPage from "@/Dashboard/DashboardPage.jsx";

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
          path: "/app/home",
          element: <DashboardPage/>
        },
        {
          path: "/app/expenses",
          index: true,
          element: <Expense />,
        },
        {
          path: "/app/reports",
          index: true,
          element: <ComingSoonPage />,
        },
        {
          // any route that is not defined
          // will be redirected to this route.
          path: "*",
          element: <NotFoundPage />,
        },
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
