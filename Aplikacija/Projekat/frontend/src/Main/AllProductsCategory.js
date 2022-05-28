import React from 'react';

import ProizvodCard from '../Components/Proizvod/ProizvodCard';
import  { useState } from 'react';

export default function AllProductsCategory(data)
{

    const [allProducts, setAllProducts] = useState([]);
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

    return(
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

