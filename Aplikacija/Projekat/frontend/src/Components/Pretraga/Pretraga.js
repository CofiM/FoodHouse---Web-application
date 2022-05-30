import * as ReactDOM from "react-dom";
import classes from "./Pretraga.module.css";
import React, { Component } from 'react';
import  { useState } from 'react';
import { withRouter } from "react-router";

import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";




const Pretraga=()=>
{
  //  const [allData, setAllData] = useState([]);
    //const [allProducts, setAllProducts] = useState([]);

    const [category, setCategory] = useState("");
    const [categoryValid, setCategoryValid] = useState(false);

    console.log(category);

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
    }

    const handleChangeName = (e) =>
    {
        setName(e.target.value);
        if(name.length!="")
        {
            setNameValid(true);
        }
        else
        {
            setNameValid(false);
        }
    }
    const choosePage=()=>
    {
        if(categoryValid!=false && nameValid!=false)
        {
            categoryAndNameSend(category,name);
        }
        else if(categoryValid!=false)
        {
            categorySend(category);
            //console.log(category);
        }
        else if(nameValid!=false)
        {
            nameSend(name);
            //console.log(name);

        }


    }

    //console.log(text);

    // async function fetchProductsHandler()
    // {
   
    // const response = await fetch('https://localhost:5001/Proizvod/PreuzetiProizvodeZaKategoriju/' + category,
    //     {
    //         method: 'GET',
    //         headers: {
    //             'Content-type': 'application/json;charset=UTF-8'
    //         }
    //     });

    // const data = await response.json();
        

    // dataSend(data);
    // // localStorage.setItem("Data",data);
    // // let path="ViewProducts";
    // // history.push(path);
    

    // const products= data.map((product)=>{
    //     return{
    //         naziv: product.naziv,
    //         opis: product.opis,
    //         cena: product.cena,
    //         kolicina: product.kolicina,
    //     };
    // });
    // setAllProducts(products);
    // console.log(products);
    
   
    
    // };
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
        console.log(data);
    };
   
    const nameSend=(data)=>
    {
        localStorage.setItem("Name", data);
        history.push("ViewProductsName");
        console.log(data);
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
    
    //   const dos=[
    //      {label: "Lično preuzimanje"},
    //       {label: "Dostava kurirskom službom"}
    //   ];

   

    return(
        <div className={classes.divGlavni}>
        <input type='text' placeholder="Koji proizvod želite da pronađete" onChange={handleChangeName}></input>
        <div className="example-config">
        </div>
            <div>
                <select className={classes.category} onChange={handleChangeCategory}>
                    {categoryArray.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
       
        
            </div>
      {/* <div>
      <Select options={dos}
        placeholder="Dostava"
        style={{
          width: "300px",
        }}
      />
            </div> */}
       <div>
           <Button className={classes.buttonPretraga} variant="contained" color="success" onClick={choosePage} >
            Pretraga
            </Button>
      </div>
      
      
        {/* <div className={classes.divProducts}>
      <div>
        { allProducts.map((product) => (
           <ProizvodCard
                naziv={product.naziv}
                opis = {product.opis}
                cena= {product.cena}
                kolicina = {product.kolicina}
            />
            ))}
        </div>

        </div>   */}

    </div>
    );


};
export default Pretraga;