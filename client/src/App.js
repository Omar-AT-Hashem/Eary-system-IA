
import { Outlet } from "react-router-dom";
import { Footer } from "./shared/Footer";
import { Header } from "./shared/Header";
import "./style/App.css";
 export const App =() => {
  return ( 
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
