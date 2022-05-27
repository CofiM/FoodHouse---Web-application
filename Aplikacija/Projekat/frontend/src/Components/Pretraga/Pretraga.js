import * as ReactDOM from "react-dom";
import classes from "./Pretraga.module.css";
import React, { Component } from 'react';
import Select from 'react-select';

import Button from "@mui/material/Button";


async function fetchProductsHandler()
{
  const response= await fetch('/Proizvod/PreuzetiProizvodeZaDomacinstvoZaKategoriju/{idDomacinstva}/{kategorija}')
};


const Pretraga=()=>
{
    const categoryArray = [
        { label: "Mlečni proizvodi"},
  { label: "Med i proizvodi od meda"},
  { label: "Rakije"  },
  { label: "Meso i mesne prerađevine " },
  { label: "Domaća jaja" },
  { label: "Džem i slatko"  },
  { label: "Voće i povrće"}
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
        <Select options={categoryArray}
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