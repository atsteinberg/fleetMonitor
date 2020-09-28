//var ais = require("ais");

const initialShips = [
  {shipName:"Regine",mmsi:218170000, type:"12000t 2x350t 20kn", owner:"SAL", lat:51.497654, lng:-0.123010},
  {shipName: "Trina",mmsi: 218705000, type:"12000t 2x350t 20kn", owner:"SAL",lat:41.377964, lng: 2.192580},
  {shipName: "Anne_Sofie", mmsi:218412000, type:"12000t 2x350t 20kn", owner:"SAL",lat:52.440430,lng: 13.166374},
  {shipName: "Frauke", mmsi:305164000, type:"12000t 2x350t 20kn", owner:"SAL", lat:54.427599,lng: 3.975018},
  {shipName: "Maria", mmsi:218522000, type: "9000t 2x350t 20kn", owner: "SAL",lat:54.57599,lng: 3.975018},
  /* {shipName: "Annette", mmsi:304577000, type:"9000t 2x350t 20kn",owner: "BBC",lat:54.6599,lng: 3.975018},
  {shipName: "Wiebke", mmsi:218553000, type: "9300t 2x320t 20kn",owner: "BBC",lat:54.769,lng: 3.975018},
  {shipName: "Paula", mmsi:304010228, type: "9300t 2x320t 20kn", owner: "BBC",lat:54.899,lng: 3.975018},
  {shipName: "Annegret", mmsi:304081024, type:"9300t 2x320t 20kn", owner:"BBC",lat:54.927599,lng: 3.975018},
  {shipName: "Grietje", mmsi:304081008, type: "9300t 2x320t 20kn", owner:"BBC",lat:54.137599,lng: 3.975018},
  {shipName: "Annemieke", mmsi:304080796, type: "9500t 2x275t 20kn", owner:"Beluga",lat:54.247599,lng: 3.975018},
  {shipName: "Calypso", mmsi:305691000, type:"10000t 2x450t 16kn", owner:"Beluga",lat:54.357599,lng: 3.975018},
  {shipName: "Amoenitas", mmsi:305621000, type:"10000t 2x450t 16kn", owner:"Beluga",lat:54.467599,lng: 3.975018},
  {shipName: "Imke", mmsi:229127000, type:"10000t 2x450t 16kn", owner:"Beluga",lat:54.477599,lng: 3.975018},
  {shipName: "Anna", mmsi:305544000, type:"10000t 2x450t 16kn", owner:"Beluga",lat:54.487599,lng: 3.975018},
  {shipName: "Hilke", mmsi:305533000, type:"10000t 2x450t 16kn", owner:"Beluga",lat:54.497599,lng: 3.975018},
  {shipName: "Caroline", mmsi:305480000, type:"10000t 2x450t 16kn", owner:"UHL",lat:54.427599,lng: 3.965018},
  {shipName: "Klara",mmsi:255805875,type:"19000t 2x400t 17kn", owner: "UHL",lat:54.427599,lng: 3.955018},
  {shipName: "Lisa", mmsi:255805785, type:"19000t 2x400t 17kn", owner:"UHL",lat:54.427599,lng: 3.945018},
  {shipName: "Hanna", mmsi:255805770, type:"19000t 2x400t 17kn", owner:"UHL",lat:54.427599,lng: 3.935018},
  {shipName: "Lone", mmsi:305983000, type:"12500t 2x1000t 20kn", owner:"UHL",lat:54.427599,lng: 3.925018},
  {shipName: "Swenja", mmsi:211577000,type:"12500t 2x1000t 20kn", owner:"UHL",lat:54.427599,lng: 3.175018} */
];

export default function (state = {ships:initialShips}, action) {

  
  switch(action.type) {
    case "FILTER":
      return state;
      

    case "POSITION_UPDATE":
      let updatedShips=[...state.ships];
      updatedShips[action.index]={...updatedShips[action.index],lat:action.lat,lng:action.lng};

      return {ships:updatedShips};
       
      default:
      
      return state;
  }
}

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

  /* pass the MMSI as first parameter
 ais.get(218170000, function(pos, more) {
   console.log("POS"+pos); // prints either a lat/long array
   // [56.57469, 9.05306] or null
 
   console.log("MORE"+more); // prints more information about the vessel
   // {course: 360, speed: 0.5, name: "TUULI"}
   // speed in knots, course in degrees */