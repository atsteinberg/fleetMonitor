import React, {useEffect,useState} from 'react'
import { GoogleMap, LoadScript,Marker,MarkerClusterer,Polyline} from '@react-google-maps/api';


const ships = [
  {shipName:"Regine",mmsi:218170000, type:"12000t 2x350t 20kn", owner:"SAL"},
  {shipName: "Trina",mmsi: 218705000, type:"12000t 2x350t 20kn", owner:"SAL"},
  {shipName: "Anne_Sofie", mmsi:218412000, type:"12000t 2x350t 20kn", owner:"SAL"},
  {shipName: "Frauke", mmsi:305164000, type:"12000t 2x350t 20kn", owner:"SAL"},
  {shipName: "Maria", mmsi:218522000, type: "9000t 2x350t 20kn", owner: "SAL"},
  {shipName: "Annette", mmsi:304577000, type:"9000t 2x350t 20kn",owner: "SAL"},
  {shipName: "Wiebke", mmsi:218553000, type: "9300t 2x320t 20kn",owner: "SAL"},
  {shipName: "Paula", mmsi:304010228, type: "9300t 2x320t 20kn", owner: "SAL"},
  {shipName: "Annegret", mmsi:304081024, type:"9300t 2x320t 20kn", owner:"SAL"},
  {shipName: "Grietje", mmsi:304081008, type: "9300t 2x320t 20kn", owner:"SAL"},
  {shipName: "Annemieke", mmsi:304080796, type: "9500t 2x275t 20kn", owner:"SAL"},
  {shipName: "Calypso", mmsi:305691000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Amoenitas", mmsi:305621000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Imke", mmsi:229127000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Anna", mmsi:305544000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Hilke", mmsi:305533000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Caroline", mmsi:305480000, type:"10000t 2x450t 16kn", owner:"SAL"},
  {shipName: "Klara",mmsi:255805875,type:"19000t 2x400t 17kn", owner:"SAL"},
  {shipName: "Lisa", mmsi:255805785, type:"19000t 2x400t 17kn", owner:"SAL"},
  {shipName: "Hanna", mmsi:255805770, type:"19000t 2x400t 17kn", owner:"SAL"},
  {shipName: "Lone", mmsi:305983000, type:"12500t 2x1000t 20kn", owner:"SAL"},
  {shipName: "Swenja", mmsi:211577000,type:"12500t 2x1000t 20kn", owner:"SAL"}
]

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

const onLoad = polyline => {
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

const center = { lat: -33.869395, lng: 151.198648 }

function MapComponent() {
  let map;
  //let [center,setCenter] = useState({lat:20,lng:120});
  const [locs,setLocs] = useState({});
  useEffect(()=> {
    setLocs(locations);}
    ,[]);

 /*  useEffect(()=> {

    ships.forEach(ship=>fetch('https://services.marinetraffic.com/api/exportvessel/v:5/328edcba23f1775bda993ba3c8df2504246cf1d8/timespan:2880/protocol:json/mmsi:'+ship.mmsi.toString())
    .then( res=>res.json())
    .then (coordinates=>{
      
      if (coordinates.length>0) {
        console.log(coordinates[0][1],coordinates[0][2]);
        setLocs(()=>Object.assign(locations,{[ship.shipName+' '+ship.type]:{lat:parseFloat(coordinates[0][1]),lng:parseFloat(coordinates[0][2])}}));
        console.log(locs);
      }
      else console.log("No Data for"+ship.shipName);
    },[]));
  });
  */
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCAN4dvLQ5Jb5KDUFfJdf6keqtZOf7V1_Y"
    >
      <GoogleMap
        onLoad={(loadedMap)=>{map=loadedMap;console.log("Map Loaded")}} //eslint-disable-line no-console
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        <MarkerClusterer options={options}>
          {(clusterer) =>
            Object.keys(locs).map(location=><Marker label={location} position={locations[location]} clusterer={clusterer} onclick={e=>map.panTo(e.target.position)}/>)} 
        </MarkerClusterer>
        <Polyline
      onLoad={onLoad}
      path={path}
      options={optionsPoly}
    />
       
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MapComponent)