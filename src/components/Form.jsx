// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

const base_url = "https://api.bigdatacloud.net/data/reverse-geocode-client"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [isLoadingGeoCoding,setIsLoadingGeoCoding] = useState(false)
  const [mapLat,mapLng]=useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji,setEmoji] = useState('')
  const [errorGeo,setErrorGeu] = useState("")
  const navigate = useNavigate();
  console.log(mapLat,mapLng);
  console.log(country, setCountry,isLoadingGeoCoding);

  useEffect(function(){
async function fetchCityData(){
  try {
    setErrorGeu("")
    setIsLoadingGeoCoding(true)
    const res = await fetch(`${base_url}?latitude=${mapLat}&longitude=${mapLng}`)
    const data= await res.json()
  if(!data.countryCode)throw new Error("That doesn't seem to be a city.click somewhere else 😘")
 setCityName(data.city || data.locality || "")
 setCountry(data.countryName )
 setEmoji(convertToEmoji(data.countryCode))
  } catch (err) {
    setErrorGeu(err.message)
  }finally{
    setIsLoadingGeoCoding(false)
  }
}
fetchCityData()
  },[mapLat,mapLng])
if(isLoadingGeoCoding) return <Spinner/>
  if(errorGeo) return <Message  message={errorGeo}/>  
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Button
          onclick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
