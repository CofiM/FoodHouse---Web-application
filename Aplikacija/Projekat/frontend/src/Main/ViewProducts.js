import React from "react";
import { useState ,useEffect} from "react";
import ProizvodCard from "../Components/Proizvod/ProizvodCard";

import classes from "../Components/Proizvod/Proizvod.module.css";


const ViewProducts = ()=>
{
    const category = localStorage.getItem("Category");

    const [value,setValue]=useState();
   
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

            <div className={classes.productsView} >
                { allProducts.map((product) => (
                    <ProizvodCard
                        naziv={product.naziv}
                        opis = {product.opis}
                        cena= {product.cena}
                        kolicina = {product.kolicina}
                    />
                ))
                }
                
                {/* { allProducts 
                    .sort((a, b) => { return a.cena > b.cena ? 1 : -1 })
                    .map(({product }) => (
                    <ProizvodCard
                    naziv={product.naziv}
                    opis = {product.opis}
                    cena= {product.cena}
                    kolicina = {product.kolicina}
                    />
                ))} */}
            </div>
          </div>
    );

                
};

export default ViewProducts;
