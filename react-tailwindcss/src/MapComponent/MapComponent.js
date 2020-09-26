import React, {useEffect,useState} from 'react'
import { GoogleMap, LoadScript,Marker,MarkerClusterer,Polyline} from '@react-google-maps/api';
import { useSelector } from "react-redux";
import shipIcon from './icons8-cargo-ship-100.png';




// eslint-disable-next-line
  const locations = {
    operaHouse: { lat: -33.8567844, lng: 151.213108 },
    tarongaZoo: { lat: -33.8472767, lng: 151.2188164 },
    manlyBeach: { lat: -33.8209738, lng: 151.2563253 },
    hyderPark: { lat: -33.8690081, lng: 151.2052393 },
    theRocks: { lat: -33.8587568, lng: 151.2058246 },
    circularQuay: { lat: -33.858761, lng: 151.2055688 },
    harbourBridge: { lat: -33.852228, lng: 151.2038374 },
    kingsCross: { lat: -33.8737375, lng: 151.222569 },
    botanicGardens: { lat: -33.864167, lng: 151.216387 },
    museumOfSydney: { lat: -33.8636005, lng: 151.2092542 },
    kingStreetWharf: { lat: -33.8665445, lng: 151.1989808 },
    aquarium: { lat: -33.869627, lng: 151.202146 },
    darlingHarbour: { lat: -33.87488, lng: 151.1987113 },
    barangaroo: { lat: - 33.8605523, lng: 151.1972205 }
  }
  


const containerStyle = {
  width: '800px',
  height: '800px'
};



const options = {
  imagePath:'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' 
}

/* const onLoad = polyline => {
  console.log('polyline: ', polyline)
};

const path = [
  {lat: 37.772, lng: -122.214},
  {lat: 21.291, lng: -157.821},
  {lat: -18.142, lng: 178.431},
  {lat: -27.467, lng: 153.027}
];

const optionsPoly = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 30000,
  paths: [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ],
  zIndex: 1
};
 */

const center = { lat: 52.430514, lng: 4.162088 }

function MapComponent() {
  //let [map,setMap]=useState({});
  //let [center,setCenter] = useState({lat:20,lng:120});
  /* const [locs,setLocs] = useState({});
  useEffect(()=> {
    setLocs(locations);}
    ,[]); */
  let map;

  const shipLocations = useSelector(function(state) {
      return state.ships;
    });


  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCAN4dvLQ5Jb5KDUFfJdf6keqtZOf7V1_Y"
    >
      <GoogleMap
        onLoad={(loadedMap)=>{map=loadedMap}} //eslint-disable-line no-console
        mapContainerStyle={containerStyle}
        center={center}
        zoom={5}
      >
        <MarkerClusterer options={options}>
          {/* {(clusterer) =>
            Object.keys(locs).map(location=><Marker icon={shipIcon} label={location} position={locations[location]} clusterer={clusterer} onclick={e=>map.panTo(e.target.position)}/>)}  */}
        {(clusterer) =>
            shipLocations.map(ship=><Marker icon={shipIcon} label={ship.shipName} position={{lat:ship.lat,lng:ship.lng}} clusterer={clusterer} onclick={e=>map.panTo(e.target.position)}/>)} 
        </MarkerClusterer>
        {/* <Polyline
      onLoad={onLoad}
      path={path}
      options={optionsPoly}
    /> */}
       
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)