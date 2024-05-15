import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Homepages from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import {AuthProvider} from "../src/contexts/FakeAuthContext"
import { CitiesProvider } from "../src/contexts/CitiesContext";
export default function App() {
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="product" element={<Product />} />
          <Route path="Pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" replace />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="Cities" element={<CityList />} />
            <Route path="Countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route index element={<Homepages />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
  );
}
