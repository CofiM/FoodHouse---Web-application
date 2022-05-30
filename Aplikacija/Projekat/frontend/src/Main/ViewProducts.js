import React from "react";
import { useState ,useEffect} from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";


const ViewProducts = ()=>
{
    const category = localStorage.getItem("Category");
   
    const [allProducts, setAllProducts] = useState([]);
    useEffect(() => {
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
          </div>
    );

    
};

export default ViewProducts;
