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
            //wild card route
            path: '*',
            element: <NotFound/>,
          }, ]},]);