import * as React from "react";
import { useEffect } from "react";
import classes from "./Inbox.module.css";
import SideBar from "./SideBar";
import MessageCard from "./MessageCard";
import Message from "./MessageModal";
import MessageConsumer from "./MessageModalConsumer";

const Inbox = () => {
  const [open, setOpen] = React.useState(false);
  const [inbox, setInbox] = React.useState(true);
  const [outbox, setOutbox] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [receiverEmail, setReceiverEmail] = React.useState("");
  const [messageID, setMessageID] = React.useState(0);
  const [clientType, setClientType] = React.useState("");
  const [producer, setProducer] = React.useState(false);
  const [consumer, setConsumer] = React.useState(true);
  const [message, setMessage] = React.useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const onClickMessage = (index, ime, prezime, naziv, tip, email, poruka) => {
    console.log("Ulazim u message" + index);
    localStorage.setItem("index", index);
    setOpen(true);
    setFirstName(ime);
    setLastName(prezime);
    setName(naziv);
    setType(tip);
    setReceiverEmail(email);
    if(poruka  === "Dobili ste posao!" || poruka === "Apliciranje za posao")
    {
      setMessage("Dobili ste posao na gazdinstvu: " + name + ". Cestitamo!");
    }
    else
    {
      setMessage("Niste dobili posao na gazdinstvu: " + name + ". Izvinite!");
    }
  
  };

  const onSideBarClick = () => {
    const index = localStorage.getItem("sidebar");
    console.log(index);
    if (index === "0") {
      setInbox(true);
      setOutbox(false);
    } else if (index === "1") {
      setOutbox(true);
      setInbox(false);
    }
  };

  useEffect(() => {
    
    const fetchMessage = async () => {
      console.log("Ulazim");
      const tip = localStorage.getItem("Korisnik");
      setClientType(tip);
      console.log("ClientType: "+ clientType);
      console.log("Type: " + tip);
      if(tip === "P"){
        console.log("Ulazim u P");
        setProducer(true);
        
        const ID = localStorage.getItem("DomacinstvoID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        const data = await response.json();
        const transformedData = data.map(function (d) {
          setMessageID(d.id);
          return{
            ID: d.id,
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik
          }
        })
        setData(transformedData);
        console.log(transformedData);
      }
      else if( tip === "D"){
        console.log("Ulazim u D");
        setProducer(false);
        const ID = localStorage.getItem("DostavljacID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        const data = await response.json();
        const transformedData = data.map(function (d) {
          setMessageID(d.id);
          return{
            ID: d.id,
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik
          }
        })
        setData(transformedData);
        console.log("Message ID  je " + messageID);
        console.log(data);
      }
      else if( tip === "K"){
        console.log("Ulazim u K");
        setProducer(false);
        const ID = localStorage.getItem("KorisnikID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        const data = await response.json();
        const transformedData = data.map(function (d) {
          setMessageID(d.id);
          return{
            ID: d.id,
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik
          }
        })
        setData(transformedData);
        console.log("Message ID  je " + messageID);
        console.log(data);
      }
    } 
    fetchMessage();
  }, []);

  async function sendMessageProducer(receiverEmail, message, flag, receiverType){
    const DomacinstvoID = localStorage.getItem("DomacinstvoID");
    console.log("ULAZIM");
    const response = await fetch("https://localhost:5001/Administrator/PosaljiPorukuOdStraneProizvodjaca/" + DomacinstvoID + "/" +
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

  async function deleteMessage(ClientID, MessageID, Type)
  {
    const response = await fetch("https://localhost:5001/Administrator/ObrisiPoruku/" + ClientID
        + "/" + MessageID + "/" + Type, {
          method: 'DELETE',
          body: JSON.stringify({title: 'Uspesno je obrisana poruka'}),
          headers: {
            'Content-Type': 'application/json'
          }
        });
    const data = await response.json();
  }

  const onClickDelete = () => {
    console.log("Ulazim u onClickDelete");
    const type = localStorage.getItem("Korisnik");
    let clientID = "";
    console.log(type);
    if(type === "K")
    {
       clientID = localStorage.getItem("KorisnikID");
    }
    else if( type === "P")
    {
       clientID = localStorage.getItem("DomacinstvoID");
    }
    else if( type === "D")
    {
      clientID = localStorage.getItem("DostavljacID");
    }
    console.log(clientID);
    deleteMessage(clientID, messageID, type);
    handleClose();
  }

  const onClickAccept = () => {
      console.log("Ulazim u onClickAccept");
      console.log(type);
      const message = "Dobili ste posao na gazdinstvu: ";
      const flag = true;
      console.log(receiverEmail, message, flag, type);
      sendMessageProducer( receiverEmail, message, flag, type );
      handleClose();
  }

  const onClickDecline = () => {
    console.log("Ulazim u onClickDecline");
    const message = "Niste prihvaceni za posao. Izvinite!";
    const flag = false;
    sendMessageProducer( receiverEmail, message, flag, type );
    handleClose();
  }

  return (
    <div className={classes.main}>
      <div className={classes.leftSide}>
        <SideBar onClick={onSideBarClick} />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.MessagesDiv}>
          {inbox && data.map( (d, index) => {
              if( d.Tip === "D" && clientType === "P" )
                return <MessageCard 
                          receiver={d.ImeD + " " + d.PrezimeD} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
                        />
              if( d.Tip === "K" && clientType === "P" )
                return  <MessageCard 
                          receiver={d.ImeK + " " + d.PrezimeK} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
                        />
              if( d.Tip === "P" && clientType === "D")
                return  <MessageCard 
                          receiver={d.NazivP} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
                        />
              if( d.Tip === "P" && clientType === "K")
              return  <MessageCard 
                        receiver={d.NazivP} 
                        shortMessage={d.Poruka}
                        onClickIcon={handleClose}
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
                      />
            }
          )}

          { outbox && data.map( (d, index) => {
            if( clientType === 'P' && d.Tip === 'P' &&  d.EmailK === null)
              
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
                      />
            
            if( clientType === "P" && d.Tip === "P" && d.EmailD === null )
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
                      />
            
            if( clientType === 'K' && d.Tip === 'K' )
              return  <MessageCard
                        receiver={d.ImeK + " " + d.PrezimeK}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
                      />

            if( clientType === 'D' && d.Tip === 'D' )
              return  <MessageCard
                        receiver={d.ImeD + " " + d.PrezimeD}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
                      />
            
            }

          )}
        </div>
        <div className={classes.Message}>
          {inbox && (clientType === "P" ?
            <Message
              show={open}
              title="Posao"
              sender={firstName + " " + lastName}
              firstName = {firstName}
              lastName = {lastName}
              receiver={name}
              tip={type}
              producer = {producer}
              consuer = {consumer}
              message={"Zahtev za posao na gazdinstvu: " + name}
              onClose={handleClose}
              onClickAcceptHandler = { onClickAccept }
              onClickDeclineHandler = { onClickDecline }
              onClickDeleteHandler = { onClickDelete }
            />
            :
            <MessageConsumer
              show={open}
              title="Posao"
              sender={name}
              firstName = {firstName}
              lastName = {lastName}
              receiver={firstName + " " + lastName}
              tip={type}
              producer = {producer}
              consuer = {consumer}
              message={message}
              onClose={handleClose}
              onClickAcceptHandler = { onClickAccept }
              onClickDeclineHandler = { onClickDecline }
              onClickDeleteHandler = { onClickDelete }
            />
          )} 
          {outbox && (clientType === "P" && type ==="P" ?
            <MessageConsumer
              show={open}
              outbox={outbox}
              title="Posao"
              sender={name}
              receiver={firstName + " " + lastName}
              message={message}
              onClose={handleClose}
              onClickDeleteHandler = {onClickDelete}
            />
            :
            <MessageConsumer
              show={open}
              outbox={outbox}
              title="Posao"
              sender={firstName + " " + lastName}
              receiver={name}
              message={"Zahtev za posao na gazdinstvu: " + name}
              onClose={handleClose}
              onClickDeleteHandler = {onClickDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
