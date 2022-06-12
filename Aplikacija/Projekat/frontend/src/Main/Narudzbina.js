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




export default function OutlinedCard() {
    const [orders, setOrders] = useState([]);

    useEffect( () => {

        const fetchOrders = async () => {
            const ID = localStorage.getItem("DostavljacID");

            const response = await fetch(
            "https://localhost:5001/Kupovina/PreuzetiKupovineZaDostavljaca/" + ID
            );
            const data = await response.json();
            const transformedData = data.map(function (d) {
                return {
                    ID: d.id,
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


    return (
        <div className={classes.narudzbina}>
            {orders.map( (d) => {
                    return <NarudzbinaCard 
                        ime = {d.Ime}
                        prezime = {d.Prezime}
                        adresaKorisnika = {d.AdresaKorisnika}
                        nazivProizvoda = {d.NazivProizvoda}
                        kolicinaProizvoda = {d.KolicinaProizvoda}
                        domacinstvoNaziv = {d.NazivDomacinstva}
                        domacinstvoAdresa = {d.AdresaDomacinstva}
                    />
                })
            }
        </div>
    );
}
