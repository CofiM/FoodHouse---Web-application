import * as ReactDOM from "react-dom";
import classes from "./Pretraga.module.css";
import React, { Component } from 'react';
import  { useState } from 'react';
import { withRouter } from "react-router";

import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";




const Pretraga=()=>
{
    //const [allData, setAllData] = useState([]);
    //const [allProducts, setAllProducts] = useState([]);

    const [category, setCategory] = useState("");
    const [categoryValid, setCategoryValid] = useState(false);

    const [name, setName] = useState("");
    const [nameValid, setNameValid] = useState(false);

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
        if(category.length!=0)
        {
            setCategoryValid(true);
        }
        else
        {
            setCategoryValid(false);
        }
    };

    const handleChangeName = (e) =>
    {
        setName(e.target.value);
        if(e.target.value!="")
        {
            setNameValid(true);
        }
        else
        {
            setNameValid(false);
        }
    };

    const choosePage = () =>
    {   
        if(categoryValid != false && nameValid != false)
        {
            categoryAndNameSend(category,name);
        }
        else if(categoryValid != false)
        {
            categorySend(category);
            console.log(category);
        }
        else if(nameValid != false)
        {
            nameSend(name);
            console.log(name);
        }
    }

    const history=useHistory();

    const categoryAndNameSend = (category, name) =>
    {     
        localStorage.setItem("Category", category);
        localStorage.setItem("Name", name);
        history.push("ViewProductsStrict");
       // console.log(data);
    };

    const categorySend = (data) =>
    {     
        localStorage.setItem("Category", data);
        history.push("ViewProducts");
        //console.log(data);
    };
   
    const nameSend=(data)=>
    {
        localStorage.setItem("Name", data);
        history.push("ViewProductsName");
       // console.log(data);
    }

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
    
    return(
        <div className={classes.divGlavni}>
        <input className={classes.txbBox} type='text' placeholder="Koji proizvod želite da pronađete" onChange={handleChangeName}></input>
        <div className="example-config">
        </div>

            <div>
                <select className={classes.category} onChange={handleChangeCategory}>
                    {categoryArray.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>    
            </div>

       <div>
           <Button className={classes.buttonPretraga} variant="contained" color="success" onClick={choosePage} >
            Pretraga
            </Button>
      </div>
      
    </div>
    );


};
export default Pretraga;