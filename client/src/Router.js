import { createBrowserRouter } from "react-router-dom";
import { ProductList } from "./pages/products/ProductList";
import { AboutPage } from "./pages/about/AboutPage";
import { Contact } from "./pages/contact/Contact";
import {App} from "./App";
import { NotFound } from "./shared/NotFound";
import {LoginPage} from "./pages/login/LoginPage";
import { ProductInfoPage } from "./pages/products/ProductInfoPage";
import { SignupPage } from "./pages/signup/SignupPage";
import { QuestionEditingList } from "./pages/questionsEditingList/QuestionsEditingList";
import QuestionForm from "./pages/questionForm/QuestionForm";
import InActiveUser from "./pages/userHome/InActiveUser";
import ActiveUserHome from "./pages/userHome/ActiveUserHome";
import AdminHome from "./pages/adminHome/AdminHome";

export const router = createBrowserRouter([
  { path:'',
    element: <App/>,
    //nesting routes
    children:[
        {
          path: "/",
          element: <ProductList/>,
        },
        {
          path: "/product-info/:id",
          element: <ProductInfoPage/>,
        },
        {
            path: "/about",
            element: <AboutPage/>,
          },
          {
            path: "/contact",
            element: <Contact/>,
          },
          {
            path: "/login",
            element: <LoginPage/>,
          },
          {
            path: "/signup",
            element: <SignupPage/>,
          },

          {
            path: "/question-editing",
            element: <QuestionEditingList/>,
          },
          {
            path: "/question-form",
            element: <QuestionForm />,
          },
          {
            path: "/:username/pending",
            element: <InActiveUser />,
          },
          {
            path: "/:username",
            element: <ActiveUserHome/>,
          },
          {
            path: "/:username/admin",
            element: <AdminHome />,
          },
          {
            //wild card route
            path: '*',
            element: <NotFound/>,
          }, ]},]);