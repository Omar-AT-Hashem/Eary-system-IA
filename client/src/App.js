
import { Outlet } from "react-router-dom";
import { Footer } from "./shared/Footer";
import { Header } from "./shared/Header";
import "./style/App.css";
import LandingNavBar from "./components/navBars/LandingNavBar";
 export const App =() => {
  return ( 
    <div>
      <Outlet/>
    </div>
  )
}
