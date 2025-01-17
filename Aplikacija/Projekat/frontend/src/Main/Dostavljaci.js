import DostavljaciCard from "../Components/Dostavljac/DostavljacCard";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./Dostavljaci.module.css";
import { ExtractData } from "../helper/extract.js";


const Dostavljaci = () => {
  const [allData, setAllData] = useState([]);
  const [emailDostavljac, setEmailDostavljac] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const token = localStorage.getItem("Token");

  async function sendMessageProducer(
    receiverEmail,
    message,
    flag,
    receiverType,
    shown
  ) {
    if( token == null ) return; 
    const DomacinstvoID = ExtractData(token, "serialnumber");
    console.log("ULAZIM");
    const response = await fetch(
      "https://localhost:5001/Administrator/PosaljiPoruku/" +
        DomacinstvoID +
        "/" +
        receiverEmail +
        "/" +
        message +
        "/P/" +
        flag +
        "/" +
        receiverType +
        "/" +
        shown,
      {
        method: "POST",
        body: JSON.stringify({ title: "Uspesno je poslata poruka" }),
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`  
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const onClickChooseHandler = () => {
    console.log("Ulazim!");
    const message = "Zahtev za posao!";
    const flag = false;
    const receiverType = "D";
    const shown = false;
    sendMessageProducer(emailDostavljac, message, flag, receiverType, shown);
  };

  useEffect(() => {
    const fetchDostavljaci = async () => {
      const response = await fetch(
        "https://localhost:5001/Dosavljac/PreuzmiDostavljace"
      );
      const data = await response.json();
      const transformedData = data.map(function (d) {
        setEmailDostavljac(d.email);
        return {
          ID: d.id,
          Ime: d.ime,
          Prezime: d.prezime,
          Username: d.username,
          Email: d.email,
          Cena: d.cena,
          Telefon: d.telefon,
          Tip: d.tip,
        };
      });
      setAllData(transformedData);
      console.log(allData);
      setIsLoaded(true);
    };
    fetchDostavljaci();
  }, []);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.allDostavljaci}>
      {allData.length > 0 &&
        allData.map((d) => (
          <DostavljaciCard
            key={d.ID}
            ime={d.Ime}
            prezime={d.Prezime}
            email={d.Email}
            cena={d.Cena}
            telefon={d.Telefon}
            onClick={() => onClickChooseHandler()}
          />
        ))}
    </div>
  );
};

export default Dostavljaci;
