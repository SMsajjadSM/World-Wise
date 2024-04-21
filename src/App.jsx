import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product"
import Homepages from "./pages/Homepage"
import Pricing from "./pages/Pricing"
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import CityList from "../components/CityList";
import { useEffect, useState } from "react";
import CountryList from "../components/CountryList";
import City from "./components/City"
const fetchUrlLink = "http://localhost:9000"
export default function App(){
  const [cities,setCities] = useState([])
  const [ loading , isLoading ] = useState(false)

  useEffect(function(){    
async function fetchCities (){
try{
  isLoading(true)
  const res = await fetch(`${fetchUrlLink}/cities`)
  console.log(res);
  const data = await res.json()
setCities(data)}
catch{
  alert('error')
}finally{
  isLoading(false)
}}
fetchCities()
 },[])

  return <BrowserRouter>
  
  <Routes>
    <Route path="Login" element={<Login/>}/> 
    <Route  path="product" element={<Product/>  }/>
    <Route  path="Pricing" element={<Pricing/>}/>
    <Route  path="app" element={<AppLayout />}>

      <Route index  element={<CityList cities={cities} isLoading={isLoading}/>} />
      <Route path="cities/:id" element={<City/>}/>
      <Route  path="Cities" element={<CityList cities={cities} loading={loading}/> } />
      <Route path="Countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
      <Route path="Form" element={<p>Form</p>}/>

    </Route>
    <Route index element={<Homepages/>}/>
    <Route  path="*" element={<Pagenotfound/>}/>
  </Routes>

  </BrowserRouter>
}
