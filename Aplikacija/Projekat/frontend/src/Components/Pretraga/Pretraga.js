import * as ReactDOM from "react-dom";
import classes from "./Pretraga.module.css";
import React, { Component } from 'react';
import Select from 'react-select';

import Button from "@mui/material/Button";

const Pretraga=()=>
{
    const sports = [
        { label: "Baseball"},
  { label: "Basketball"},
  { label: "Cricket" },
  { label: "Field Hockey" },
  { label: "Football" },
  { label: "Tennis"  },
  { label: "Volleyball"}
      ];
    
      const dos=[
         {label: "Lično preuzimanje"},
          {label: "Dostava kurirskom službom"}
      ];

   

    return(
        <div className={classes.divGlavni}>
        <input type='text' placeholder="Koji proizvod želite da pronađete" ></input>
        <div className="example-config">
      </div>
      <div>
        <Select options={sports}
        placeholder="Kategorije"
          style={{
            width: "300px",
          }}
          
        />
      </div>
      <div>
      <Select options={dos}
        placeholder="Dostava"
        style={{
          width: "300px",
        }}
      />
      </div>
      <Button variant="contained" color="success">
       Pretraga
      </Button>

        </div>
    );


};
export default Pretraga;