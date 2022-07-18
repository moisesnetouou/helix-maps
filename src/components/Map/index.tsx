
import { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Geocode from "react-geocode";

import "./map.scss";
import loadingIcon from '../../assets/images/loading.svg';

import bigMarkerIcon from '../../assets/images/bigMarker.png';
import {coordenadas, coordenadas2} from './data';

interface PositionData {
  lat: number;
  lng: number;
  id: number;
}

export function Map(){
  const {isLoaded} = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // const position = {
  //   lat: -3.088302, lng: -59.983801
  // }

  // const [addressData, setAddressData] = useState(null);
  // const [clickedLatLng, setClickedLatLng] = useState(position);
  // const [isClickMap, setIsClickMap] = useState(false);

  const [positionCenter, setPositionCenter] = useState({lat:-3.0115875939510874, lng:  -59.96083744392599})
  const [allStores, setAllStores] = useState(coordenadas);
const [positionZoom, setPositionZoom] = useState(50);
  const [activeMarker, setActiveMarker] = useState(null);

  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
  Geocode.setLanguage("pt-BR");


  // function handleGetAddress(e: any){
  //   const coordinates = e.latLng.toJSON()
  //   setClickedLatLng(coordinates);

  //   const lat = coordinates.lat.toString();
  //   const lng = coordinates.lng.toString();
  //   console.log('teste', lat)
    
  //   Geocode.fromLatLng(lat, lng).then(
  //     (response) => {
  //       const address = response.results[0].formatted_address;
  //       console.log(response)
  //       setAddressData(address);

  //       console.log(address);
  //       setIsClickMap(true);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  function handleCenterMap({lat, lng, id}: PositionData){
    setPositionCenter({lat, lng});

    if (id === activeMarker) {
      return;
    }
    setActiveMarker(id);
  }

  return(
    <main>
      <div className="map">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%"}}
            center={{
              lat: positionCenter.lat,
              lng: positionCenter.lng
            }}
            zoom={15}
            // onClick={e => handleGetAddress(e)}
          >
            {allStores.map(item => {
              return(
                <Marker
                  key={item.id}
                  position={{
                    lat: item.lat,
                    lng: item.lng
                  }} 
                  onClick={()=>handleCenterMap({ lat: item.lat, lng: item.lng,id: item.id})}
                  options={{
                    icon: {
                      url: bigMarkerIcon,
                      scaledSize: new google.maps.Size(100, 100),
                      
                    },
                    position: {
                      lat: item.lat,
                      lng: item.lng,
                    },
                  }}
                >
                  {activeMarker === item.id ? (
                    <InfoWindow onCloseClick={() => setActiveMarker(null)} >
                      <div className="marker-info-box">
                        <h1>{item.name}</h1>
                        <span>{item.address}</span>
                      </div>
                    </InfoWindow>
                  ) : null}
                </Marker>
              )
            })}
          </GoogleMap>
        ): (
          <img src={loadingIcon} alt="Carregando" />
        )}
      </div>

      {/* {isClickMap && (
        <div className="location">
          <h3>
            <span>Localização:</span> {addressData}
          </h3>

          <h3>
            <span>Coordenadas:</span> {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        </div>
      )} */}

     {allStores === coordenadas && (
        <section className="teste-section">
        {coordenadas.map(select => {
          return(
            <button type="button" onClick={()=> handleCenterMap({lat: select.lat, lng: select.lng, id: select.id})}>{select.name}</button>
          )
        })}
      </section>
     )}

     <section className="teste-section">
        <button type="button" onClick={()=> setAllStores(coordenadas)}>Manaus</button>
        <button type="button" onClick={()=> setAllStores(coordenadas2)}>Pará</button>
      </section>
    </main>
  );
}