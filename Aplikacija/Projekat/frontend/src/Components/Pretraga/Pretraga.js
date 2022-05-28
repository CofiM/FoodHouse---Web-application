import * as ReactDOM from "react-dom";
import classes from "./Pretraga.module.css";
import React, { Component } from 'react';
import  { useState } from 'react';
import Select from 'react-select';

import Button from "@mui/material/Button";

var category;
async function fetchProductsHandler()
{
   
    const response = await fetch('https://localhost:5001/Proizvod/PreuzetiProizvodeZaKategoriju/' + category,
        {
            method: 'GET',
            headers: {
                'Content-type': 'application/json;charset=UTF-8'
            }
        });
    const data = await response.json();
    

};


const Pretraga=()=>
{
    const [value, setValue] = useState();

    const handleChange = (e) => {
        setValue(e.target.value);
    }


     category = value;
    const categoryArray = [
        {
            label: "Mlečni proizvodi",
            value: "Mlečni proizvodi",
        },
        {
            label: "Med i proizvodi od meda",
            value: "Med i proizvodi od meda",
        },
        {
            label: "Rakije",
            value: "Rakije",
        },
        {
            label: "Meso i mesne prerađevine",
            value: "Meso i mesne prerađevinekije",
        },
        {
            label: "Domaća jaja",
            value: "Domaća jaja",
        },
        {
            label: "Džem i slatko",
            value: "Džem i slatko",
        },
        {
            label: "Voće i povrće",
            value: "Voće i povrće",
            
        }
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
                <select className="Category" onChange={handleChange} >
                    {categoryArray.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
       
        
      </div>
      <div>
      <Select options={dos}
        placeholder="Dostava"
        style={{
          width: "300px",
        }}
      />
            </div>
            <Button variant="contained" color="success" onClick={fetchProductsHandler} >
       Pretraga
      </Button>

        </div>
    );


};
export default Pretraga;