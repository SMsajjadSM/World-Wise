import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product"
import Homepages from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "../components/CityList";
export default function App(){
 
  return <BrowserRouter>
  
  <Routes>
    <Route path="Login" element={<Login/>}/> 
    <Route  path="product" element={<Product/>  }/>
    <Route  path="Pricing" element={<Pricing/>}/>
    <Route  path="app" element={<AppLayout/>}>
    <Route index  element={<CityList/>} />

      <Route  path="Cities" element={<CityList/> } />
      <Route path="Countries" element={<p>Countries</p>}/>
      <Route path="Form" element={<p>Form</p>}/>
       </Route>
    <Route index element={<Homepages/>}/>
    <Route  path="*" element={<Pagenotfound/>}/>
  </Routes>
  </BrowserRouter>
}
