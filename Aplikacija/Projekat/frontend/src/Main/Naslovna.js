import React from "react";
import { jsApiLoader, useJsApiLoader, GoogleMap } from "@react-google-maps/api";
import Pretraga from "../Components/Pretraga/Pretraga";
import classes from "../Components/Pretraga/Pretraga.module.css";
const center = { lat: 43.320904, lng: 21.89576 };
const Naslovna = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDFzGoHWrB0dwGhYCIduSqQJuSWzsaZEds",
  });

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
        <div className="App" style={{ height: "80vh", width: "80%" }}>
          <GoogleMap
            zoom={8}
            center={center}
            mapContainerStyle={{ width: 800, height: 600 }}
          ></GoogleMap>
        </div>
      </div>
    </div>
  );
};

export default Naslovna;
