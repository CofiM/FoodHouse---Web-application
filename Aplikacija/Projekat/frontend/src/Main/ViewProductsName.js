import React from "react";
import { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";

import classes from "../Components/Proizvod/Proizvod.module.css";

const ViewProductsName = ()=>
{
    const [value,setValue]=useState(1);

    const name = localStorage.getItem("Name");
    console.log(name);
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
    async function fetchProductsHandler()
    {
   
        const response = await fetch('https://localhost:5001/Proizvod/PreuzetiProizvodeNaziv/' + name,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json;charset=UTF-8'
                }
            });

        const data = await response.json();
        console.log(data);
        const products= data.map((product)=>{
            return{
                naziv: product.naziv,
                opis: product.opis,
                cena: product.cena,
                kolicina: product.kolicina,
            };
        });
        setAllProducts(products);
        console.log(products);
    };
    fetchProductsHandler();
    localStorage.removeItem("Name");
    }, []);

    const sortArray = [
        { 
            value: 1, 
            label: "Po abecedi",
        },
        { 
            value: 2,
            label: "Po ceni"
        }
    ];

    const arrayProducts=(e)=>
    {
        let newState=[...allProducts];
        setValue(e.target.value);

        if(value==1)
        {
      
            console.log(newState);
            { newState 
                .sort((a, b) => a.cena - b.cena  )
                .map((product) =>
                (
                <ProizvodCard
                naziv={product.naziv}
                opis = {product.opis}
                cena= {product.cena}
                kolicina = {product.kolicina}
                />
            ))}
        }
        else if(value==2)
        {
            { newState 
                .sort((a, b) => a.naziv > b.naziv ? 1 : -1)
                .map((product) =>
                (
                <ProizvodCard
                naziv={product.naziv}
                opis = {product.opis}
                cena= {product.cena}
                kolicina = {product.kolicina}
                />
            ))}
        }
      //  setValue(true);
        setAllProducts(newState);
        console.log(newState);
    }

    return (
        

        <div>
              <div className={classes.positionSelect}>
            <select className={classes.sortSelect}  onChange={arrayProducts}>
                    {sortArray.map((option) => (
                        <option value={option.value}>{option.label} </option>
                    ))}
                </select> 

            </div>

          { allProducts.map((product) => (
             <ProizvodCard
                  naziv={product.naziv}
                  opis = {product.opis}
                  cena= {product.cena}
                  kolicina = {product.kolicina}
              />
              ))}
          </div>
    );

    
};

export default ViewProductsName;
