import { createContext, useContext, useEffect, useState } from "react";
const fetchUrlLink = "http://localhost:9000";

const citiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, isLoading] = useState(false);
  const [currentCity,setCurrentCity] = useState({})
  useEffect(function () {
    async function fetchCities() {
      try {
        isLoading(true);
        const res = await fetch(`${fetchUrlLink}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("error");
      } finally {
        isLoading(false);
      }
    }
    fetchCities();
  }, []);
 async function getCity(id){
    try {
      isLoading(true);
      const res = await fetch(`${fetchUrlLink}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("error");
    } finally {
      isLoading(false);
    }
  }
  return (
    <citiesContext.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCity
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCities(){
  const context = useContext(citiesContext)
  if(context === undefined)throw new Error ("citiesContext was used outside the cityprovider")
  return context
}
export { CitiesProvider,useCities };
