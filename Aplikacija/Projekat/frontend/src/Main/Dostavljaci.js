import DostavljaciCard from "../Components/Dostavljac/DostavljacCard";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./Dostavljaci.module.css";
const Dostavljaci = () => {
    const [allData, setAllData] = useState([]);
    const [emailDostavljac, setEmailDostavljac] = useState(""); 


    async function sendMessageProducer(receiverEmail, message, flag, receiverType){
        const DomacinstvoID = localStorage.getItem("DomacinstvoID");
        console.log("ULAZIM");
        const response = await fetch("https://localhost:5001/Administrator/PosaljiPoruku/" + DomacinstvoID + "/" +
        receiverEmail + "/" + message + "/P/" + flag + "/" + receiverType,{
          method: 'POST',
          body: JSON.stringify({title: 'Uspesno je poslata poruka'}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
    } 

    const onClickChooseHandler = () => {
        console.log("Ulazim!");
        const message = "Zahtev za posao!";
        const flag = false;
        const receiverType = "D"
        sendMessageProducer(emailDostavljac, message, flag, receiverType);
    }


    useEffect(() => {
        const fetchDostavljaci = async () => {
            const response = await fetch("https://localhost:5001/Dosavljac/PreuzmiDostavljace");
              const data = await response.json();
              const transformedData = data.map(function (d) {
                setEmailDostavljac(d.email);
                return{
                  ID: d.id,
                  Ime: d.ime,
                  Prezime: d.prezime,
                  Username: d.username,
                  Email: d.email,
                  Cena: d.cena,
                  Telefon: d.telefon,
                  Tip: d.tip
                }
              })
              setAllData(transformedData);
              console.log(allData);
        }
        fetchDostavljaci();
    },[]);

    
    return(
        <div className={classes.allDostavljaci}>
            { allData.length > 0 && allData.map( (d) => (
                    <DostavljaciCard 
                        ime={d.Ime} 
                        prezime = {d.Prezime}
                        email={d.Email} 
                        cena={d.Cena}
                        telefon={d.Telefon}
                        onClick = {() => onClickChooseHandler()}
                    />
                ))
            }
            
        </div>
    );
};

export default Dostavljaci;