import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from "react";
import NarudzbinaCard from "./NarudzbinaCard";
import classes from "./Narudzbina.module.css";
import { ExtractData } from "../../helper/extract.js";


export default function OutlinedCard() {
    const [orders, setOrders] = useState([]);
    const token = localStorage.getItem("Token");

    useEffect( () => {

        const fetchOrders = async () => {
            const ID = ExtractData(token, "serialnumber")

            const response = await fetch(
            "https://localhost:5001/Kupovina/PreuzetiKupovineZaDostavljaca/" + ID,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const data = await response.json();
            const transformedData = data.map(function (d) {
                return {
                    Id: d.id,
                    Ime: d.ime,
                    Prezime: d.prezime,
                    AdresaKorisnika: d.adresaKorisnika,
                    NazivProizvoda: d.proizvodNaziv,
                    KolicinaProizvoda: d.kolicinaProizvoda,
                    NazivDomacinstva: d.domacinstvoNaziv,
                    AdresaDomacinstva: d.domacinstvoAdresa
                }
            });
            setOrders(transformedData);
            console.log(transformedData);
        } 
        fetchOrders();
    }, []);

    const fetchDeleteOrder = async (index) => {
        const response = await fetch(
            "https://localhost:5001/Kupovina/ObrisatiKupovinu/" + index,
            {
                method: "DELETE",
                body: JSON.stringify({ title: "Uspesno je obrisana narudzbina!" }),
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${token}`
                },
              }
            );
            const data = await response.json();
    }

    const onClickHandler = (index) =>{
        console.log("ULAZIM U obrisi!");
        fetchDeleteOrder(index);
        window.location.reload(false);
    }

    return (
        <div className={classes.narudzbina}>
            {orders.map( (d) => {
                    return <NarudzbinaCard 
                        key = {d.Id}
                        ime = {d.Ime}
                        prezime = {d.Prezime}
                        adresaKorisnika = {d.AdresaKorisnika}
                        nazivProizvoda = {d.NazivProizvoda}
                        kolicinaProizvoda = {d.KolicinaProizvoda}
                        domacinstvoNaziv = {d.NazivDomacinstva}
                        domacinstvoAdresa = {d.AdresaDomacinstva}
                        onClick = {() => onClickHandler(d.Id)}
                    />
                })
            }
        </div>
    );
}
