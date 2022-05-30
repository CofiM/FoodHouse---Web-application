import React from "react";
import { useState, useEffect } from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";


const ViewProductsStrict = ()=>
{
    const name = localStorage.getItem("Name");
    console.log(name);
    const category = localStorage.getItem("Category");
    console.log(category);
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
    async function fetchProductsHandler()
    {
   
        const response = await fetch('https://localhost:5001/Proizvod/PreuzetiProizvodeNazivKategorija/' + name+'/'+ category,
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
    localStorage.removeItem("Category");

    }, []);

    const sortArray = [
        { label: "Po abecedi"},
        { label: "Po ceni"}
    ];
    
    return (
        
        <div>
            <div>
            <select>
                    {sortArray.map((option) => (
                        <option value={option.label}>{option.label}</option>
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

export default ViewProductsStrict;
