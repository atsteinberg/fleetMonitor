import React, {useEffect,useState} from 'react'
import { GoogleMap, LoadScript,Marker,MarkerClusterer,Polyline} from '@react-google-maps/api';
import { useSelector } from "react-redux";
import shipIcon from './icons8-cargo-ship-100.png';



const containerStyle = {
  width: '1000px',
  height: '1000px'
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
    <div className="md:px-8 py-8 w-full">
    <div className="shadow overflow-hidden rounded border-b border-gray-200">

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
</div>
</div>
  )
}

export default React.memo(MapComponent)