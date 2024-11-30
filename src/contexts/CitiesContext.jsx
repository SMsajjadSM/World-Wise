import { useCallback, useReducer } from "react";
import { createContext, useContext, useEffect } from "react";
const fetchUrlLink = "http://localhost:9000";

const citiesContext = createContext();
const initialsState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialsState
  );

  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${fetchUrlLink}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error for fetch cities" });
      }
    }
    fetchCities();
  }, []);
const getCity = useCallback(  async function getCity(id) {
  if(Number(id)===currentCity.id)return
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${fetchUrlLink}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error in show city from api" });
    }
  },[currentCity.id])
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${fetchUrlLink}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "content-Type": "application.json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating data",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${fetchUrlLink}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data",
      });
    }
  }
  return (
    <citiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </citiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("citiesContext was used outside the cityprovider");
  return context;
}
export { CitiesProvider, useCities };
