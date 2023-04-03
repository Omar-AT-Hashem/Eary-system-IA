import { createBrowserRouter } from "react-router-dom";
import { ProductList } from "./pages/products/ProductList";
import { AboutPage } from "./pages/landingPages/about/AboutPage";
import { Contact } from "./pages/landingPages/contact/Contact";
import { App } from "./App";
import { NotFound } from "./shared/NotFound";
import { LoginPage } from "./pages/landingPages/login/LoginPage";
import { ProductInfoPage } from "./pages/products/ProductInfoPage";
import { SignupPage } from "./pages/landingPages/signup/SignupPage";
import { QuestionEditingList } from "./pages/adminPages/questionsEditingList/QuestionsEditingList";
import QuestionForm from "./pages/adminPages/questionForm/QuestionForm";
import InActiveUser from "./pages/userPages/userHome/InActiveUser";
import ActiveUserHome from "./pages/userPages/userHome/ActiveUserHome";
import AdminHome from "./pages/adminPages/adminHome/AdminHome";
import ActivateUsers from "./pages/adminPages/activateUsers/ActivateUsers";
import Landing from "./pages/landingPages/landing/Landing";

export const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    //nesting routes
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/product-info/:id",
        element: <ProductInfoPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        path: "/:username/admin/question-editing",
        element: <QuestionEditingList />,
      },
      {
        path: "/:username/admin/question-form",
        element: <QuestionForm />,
      },
      {
        path: "/:username/admin",
        element: <AdminHome />,
      },
      {
        path: "/:username/admin/activate-users",
        element: <ActivateUsers />,
      },
      {
        path: "/:username/pending",
        element: <InActiveUser />,
      },
      {
        path: "/:username",
        element: <ActiveUserHome />,
      },
     
      {
        //wild card route
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
