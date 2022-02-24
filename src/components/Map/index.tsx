
import { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";

import "./map.scss";
import loadingIcon from '../../assets/images/loading.svg';

export function Map(){
  const position = {
    lat: -3.088302, lng: -59.983801
  }

  const [addressData, setAddressData] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState(position);
  const [isClickMap, setIsClickMap] = useState(false);
  console.log(clickedLatLng)
  
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage("pt-BR");

  function handleGetAddress(e: any){
    const coordinates = e.latLng.toJSON()
    setClickedLatLng(coordinates);

    const lat = coordinates.lat.toString();
    const lng = coordinates.lng.toString();
    console.log('teste', lat)
    
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        console.log(response.results)
        setAddressData(address);

        console.log(address);
        setIsClickMap(true);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })

  return(
    <main>
      <div className="map">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%"}}
            center={{lat: clickedLatLng.lat,
              lng: clickedLatLng.lng,}}
            zoom={15}
            onClick={e => handleGetAddress(e)}
          >
            <Marker position={clickedLatLng}  options={{
              label: {
                text: 'Você está aqui!',
                className: "map-marker"
              },
              draggable: false,
              position: {
                lat: clickedLatLng.lat,
                lng: clickedLatLng.lng,
              }
            }}/>
          </GoogleMap>
        ): (
          // <div className="loading">
            <img src={loadingIcon} alt="Carregando" />
          // </div>
        )}
      </div>

      {isClickMap && (
        <div className="location">
        <h3><span>Localização:</span> {addressData}</h3>

        <h3><span>Coordenadas:</span> {clickedLatLng.lat}, {clickedLatLng.lng}</h3>
      </div>
      )}
    </main>
  );
}