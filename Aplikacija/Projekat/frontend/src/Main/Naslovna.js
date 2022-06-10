import React from "react";
import {useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api";
import Pretraga from "../Components/Pretraga/Pretraga";
import classes from "../Components/Pretraga/Pretraga.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
const center={lat:43.320904, lng: 21.89576};
const Naslovna = () => {
  const {isLoaded} = useJsApiLoader({googleMapsApiKey:"AIzaSyDFzGoHWrB0dwGhYCIduSqQJuSWzsaZEds"});
  const [locations,setLocations]=useState();
  const [object,setObjcet]=useState();
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

            //   async function fetchKord() {
            //     const response = await fetch(
            //       "https://maps.googleapis.com/maps/api/geocode/json?address="+loc.adresa+"&key=AIzaSyDFzGoHWrB0dwGhYCIduSqQJuSWzsaZEds",
            //       {
            //         method: "GET",
            //         headers: {
            //           "Content-type": "application/json;charset=UTF-8",
            //           "Access-Control-Allow-Origin": "*",
            //         'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'
            //         },
            //       }
            //     );

            //   const data = await response.json();
            //   const cordinates = data.map((obj) =>{
            //     return {
            //       lat: obj.lat,
            //       lng: obj.lng
            //     }
            //   })
            //   setObjcet(cordinates);
            //   }

            // fetchKord();
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
                setObjcet(response.data.results[0].geometry.location)
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
           // console.log(locs);
        }
        fetchLocations();
    
        
  }, []);



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
        <div>
          {" "}
          <Pretraga></Pretraga>
        </div>
        <div className="App" style={{height:"80vh", width:"80%"}}>
      <GoogleMap
      zoom={8} center={center} mapContainerStyle={{width:'100%',height:'100%'}}
      options={{
        mapTypeControl:false,
        streetViewControl:false,
        fullscreenControl:false
      }}
      >
      <Marker position={object}></Marker>
      </GoogleMap>
    
    </div>
      </div>
    </div>
  );
};

export default Naslovna;
