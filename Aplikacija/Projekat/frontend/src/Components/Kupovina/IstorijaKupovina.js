import classes from "./IstorijaKupovina.module.css";
import IstorijaKupovinaCard from "./IstorijaKupovinaCard";
import { useState, useEffect } from "react";




const IstorijaKupovina = () => {
    const [orders, setOrders] = useState([]);

    useEffect( () => {

        const fetchOrders = async () => {
            const ID = localStorage.getItem("KorisnikID");

            const response = await fetch(
            "https://localhost:5001/Kupovina/PreuzetiKupovineZaKorisnika/" + ID
            );
            const data = await response.json();
            const transformedData = data.map(function (d) {
                return {
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

    return(
        <div className={classes.mainStyle}>
            <div className={classes.infHeader}>
                <p> Istorija kupovina</p>
            </div>
            <div>
                {orders.map( (d) => {
                        return <IstorijaKupovinaCard 
                            nazivProizvoda = {d.NazivProizvoda}
                            kolicinaProizvoda = {d.KolicinaProizvoda}
                            domacinstvoNaziv = {d.NazivDomacinstva}
                            domacinstvoAdresa = {d.AdresaDomacinstva}
                        />
                    })
                }
            </div>
        </div>
    );
};

export default IstorijaKupovina;