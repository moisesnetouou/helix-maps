
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";
import "./map.css";

export function Home(){
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })

  const position = {
    lat: -3.088302, lng: -59.983801
  }

  const [teste, setTeste] = useState(0);
  //@ts-ignore
 

  return(
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%"}}
          center={position}
          zoom={15}
        >
          <Marker position={position}  options={{
            label: {
              text: "Teste",
              className: "map-marker"
            },
            draggable: true,
          }}/>
        </GoogleMap>
      ): <></>
      }
    </div>
  );
}