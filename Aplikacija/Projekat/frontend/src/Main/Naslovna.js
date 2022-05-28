import React from "react";
<<<<<<< HEAD


//import Pretraga from "../Pretraga/Pretraga";
//import classes from "./Pretraga.module.css";


=======
//import Pretraga from "../Pretraga/Pretraga";
//import classes from "./Pretraga.module.css";
>>>>>>> 4c23b673fa2b84991548965189c2bf68a3f37621
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
