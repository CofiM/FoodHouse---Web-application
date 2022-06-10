import React from "react";
import {useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api";
import Pretraga from "../Components/Pretraga/Pretraga";
import classes from "../Components/Pretraga/Pretraga.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { alertClasses } from "@mui/material";
import { useHistory } from "react-router-dom";
const center={lat:43.320904, lng: 21.89576};
let allCordinates=[];
let allLocations=[];
const Naslovna = () => {
  const {isLoaded} = useJsApiLoader({googleMapsApiKey:"AIzaSyDFzGoHWrB0dwGhYCIduSqQJuSWzsaZEds"});
  const [locations,setLocations]=useState();
  const [objects,setObject]=useState([]);
  
  useEffect(() => 
  {
    async function fetchLocations()
        {
            const res = await fetch('https://localhost:5001/Domacinstvo/PreuzmiLokacije',
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            });


            const dat = await res.json();
            const locs=dat.map((loc)=>{

            function geocode()
            {
              var location=loc.adresa;
              console.log(location);
              axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                params:
                {
                  address:location,
                  key: "AIzaSyDFzGoHWrB0dwGhYCIduSqQJuSWzsaZEds"
                }
              })
              .then(function(response){
                console.log(response.data.results[0].geometry.location);
                // setObject(response.data.results[0].geometry.location)
                allCordinates.push(response.data.results[0].geometry.location);
                setObject([...objects, response.data.results[0].geometry.location]);
                allLocations.push(location);
              })
              .catch(function(error){
                console.log(error);
              })
            }
            
            geocode();
            return{
              adresa: loc.adresa
            };

                
                
            });
            setLocations(locs);
            
            console.log(objects);
           
        }
        fetchLocations();
        
  }, []);
  const history = useHistory();
  const sendAdress=(index)=>
  {
    console.log(allLocations[index])
   localStorage.setItem("DomacinstvoAdresa", allLocations[index]);
   history.push("Domacinstvo");
  }

console.log(objects);
  //console.log(locations);

  if (!isLoaded) {
    return <div>Loading..</div>;
  }

 
  return (
    <div className={classes.container}>
      <div className={classes.pretragaDiv}>
        <div>
          <h1>Pronađite svog omiljenog domaćina</h1>
        </div>
        {/* <div>
          {allCordinates.length}
        </div> */}
        <div>
          {" "}
          <Pretraga></Pretraga>
        </div>
        <div className={classes.maps}>
          
      <GoogleMap
      zoom={8} center={center} mapContainerStyle={{width:'100%',height:'100%'}}
      options={{
        mapTypeControl:false,
        streetViewControl:false,
        fullscreenControl:false
      }}
      >
        {allCordinates.map((el,index)=>(
          <Marker title={allLocations[index]} position={el} onClick={()=>sendAdress(index)}></Marker>
          ))}
      </GoogleMap>
    </div>
      </div>
    </div>
  );
};

export default Naslovna;
