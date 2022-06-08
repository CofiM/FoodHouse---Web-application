import classes from "./IstorijaKupovina.module.css";
import IstorijaKupovinaCard from "./IstorijaKupovinaCard";

const IstorijaKupovina = () => {
    return(
        <div className={classes.mainStyle}>
            <div className={classes.infHeader}>
                <p> Istorija kupovina</p>
            </div>
            <div>
                <IstorijaKupovinaCard 
                    nazivProizvoda = "Aronija"
                    kolicinaProizvoda = "15"
                    domacinstvoNaziv = "Gazdinstvo Maletic"
                    domacinstvoAdresa = "Golemog 9A"
                />
            </div>
        </div>
    );
};

export default IstorijaKupovina;