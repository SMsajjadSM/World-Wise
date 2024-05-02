import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import {MapContainer,TileLayer,useMap,Popup,Marker, useMapEvent} from 'react-leaflet'
import {useGeolocation} from "../hooks/useGeolocation"
import Button from "./Button";
function Map() {
  const [mapPosition,setMapPosition] = useState([40,0])
  const [searchParams] = useSearchParams();
  const {cities} = useCities()
  const {isLoading:isLoadingPosition , position:geoLocationPosition,getPosition} = useGeolocation   ()

  const mapLat = searchParams.get("lat")
  const mapLng = searchParams.get("lng")
useEffect(()=>{
if(mapLat&&mapLng)
setMapPosition([mapLat,mapLng])
},[mapLat,mapLng])
useEffect(function(){
  if(geoLocationPosition)
  setMapPosition([geoLocationPosition.lat,geoLocationPosition.lng])

},[geoLocationPosition])
console.log(setMapPosition,geoLocationPosition);
  
  return (
    <div className={styles.mapContainer} >
      <Button type="position"  onclick={getPosition}> {isLoadingPosition?"Loading ..." :"Use Your Location"}</Button>
        <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    />
    {cities.map((city)=>
    (
      
      <Marker position={[city.position.lat,city.position.lng]} key={city.id}>
      <Popup>
        <span>{city.emoji}</span>
        <span>{city.cityName}</span>
      </Popup>
      </Marker>)
       )
    }
    <ChangeCenter position={mapPosition}/>
    <DetectClick/> 
    </MapContainer>
    </div>
 

    )}
function ChangeCenter({position}){
    const map = useMap()
    map.setView(position)
    return null
}

function DetectClick(){
  const navigate = useNavigate();
  useMapEvent({ 
    click:(e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
  })
}
export default Map;
