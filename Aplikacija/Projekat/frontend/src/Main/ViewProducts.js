import React from "react";
import { useState } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";


const ViewProducts = ()=>
{
    const category = localStorage.getItem("Category");
    console.log(category);
    const [allProducts, setAllProducts] = useState([]);
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
    

    return (
        
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
    );

    
};

export default ViewProducts;
