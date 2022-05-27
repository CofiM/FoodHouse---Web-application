import React from "react";

<<<<<<< HEAD
=======
//import Pretraga from "../Pretraga/Pretraga";
//import classes from "./Pretraga.module.css";

>>>>>>> a57e5c960833a4afc1d0ebe85dc08fb53e73843b
import Pretraga from "../Components/Pretraga/Pretraga";
import classes from "../Components/Pretraga/Pretraga.module.css";

const Naslovna = () => {
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
        <div></div>
      </div>
    </div>
  );
};

export default Naslovna;
