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
<<<<<<< HEAD
=======
  const [message, setMessage] = React.useState("");
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8

  const handleClose = () => {
    setOpen(false);
  };

<<<<<<< HEAD
  const onClickMessage = (index, ime, prezime, naziv, tip, email) => {
=======
  const onClickMessage = (index, ime, prezime, naziv, tip, email, poruka) => {
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
    console.log("Ulazim u message" + index);
    localStorage.setItem("index", index);
    setOpen(true);
    setFirstName(ime);
    setLastName(prezime);
    setName(naziv);
    setType(tip);
    setReceiverEmail(email);
<<<<<<< HEAD
    //console.log(firstName, lastName, name, type, receiverEmail);
=======
    if(poruka  === "Dobili ste posao!" || poruka === "Apliciranje za posao")
    {
      setMessage("Dobili ste posao na gazdinstvu: " + name + ". Cestitamo!");
    }
    else
    {
      setMessage("Niste dobili posao na gazdinstvu: " + name + ". Izvinite!");
    }
  
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
=======
    
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
        console.log("Message ID  je " + messageID);
        console.log(data);
=======
        console.log(transformedData);
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
      const message = "Dobili ste posao!";
=======
      const message = "Dobili ste posao na gazdinstvu: ";
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
          { inbox && data.map( (d, index) => {
=======
          {inbox && data.map( (d, index) => {
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
              if( d.Tip === "D" && clientType === "P" )
                return <MessageCard 
                          receiver={d.ImeD + " " + d.PrezimeD} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
<<<<<<< HEAD
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD)}
=======
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                        />
              if( d.Tip === "K" && clientType === "P" )
                return  <MessageCard 
                          receiver={d.ImeK + " " + d.PrezimeK} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
<<<<<<< HEAD
                          onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK)}
=======
                          onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                        />
              if( d.Tip === "P" && clientType === "D")
                return  <MessageCard 
                          receiver={d.NazivP} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
<<<<<<< HEAD
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailK)}
=======
                          onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                        />
              if( d.Tip === "P" && clientType === "K")
              return  <MessageCard 
                        receiver={d.NazivP} 
                        shortMessage={d.Poruka}
                        onClickIcon={handleClose}
<<<<<<< HEAD
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK)}
=======
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                      />
            }
          )}

          { outbox && data.map( (d, index) => {
            if( clientType === 'P' && d.Tip === 'P' &&  d.EmailK === null)
              
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
<<<<<<< HEAD
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip)}
=======
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                      />
            
            if( clientType === "P" && d.Tip === "P" && d.EmailD === null )
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
<<<<<<< HEAD
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip)}
=======
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                      />
            
            if( clientType === 'K' && d.Tip === 'K' )
              return  <MessageCard
                        receiver={d.ImeK + " " + d.PrezimeK}
                        shortMessage={d.Poruka}
<<<<<<< HEAD
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip)}
=======
                        onClick={() => onClickMessage(index, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                      />

            if( clientType === 'D' && d.Tip === 'D' )
              return  <MessageCard
                        receiver={d.ImeD + " " + d.PrezimeD}
                        shortMessage={d.Poruka}
<<<<<<< HEAD
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip)}
=======
                        onClick={() => onClickMessage(index, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.Poruka)}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
                      />
            
            }

          )}
        </div>
        <div className={classes.Message}>
<<<<<<< HEAD
          {inbox && clientType === "P" ?
=======
          {inbox && (clientType === "P" ?
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
              message={"Dobili ste posao na gazdinstvu: " + name + "!"}
=======
              message={message}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
              onClose={handleClose}
              onClickAcceptHandler = { onClickAccept }
              onClickDeclineHandler = { onClickDecline }
              onClickDeleteHandler = { onClickDelete }
            />
<<<<<<< HEAD
          } 
          {outbox && clientType === "P" ?
            <Message
=======
          )} 
          {outbox && (clientType === "P" && type ==="P" ?
            <MessageConsumer
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
              show={open}
              outbox={outbox}
              title="Posao"
              sender={name}
              receiver={firstName + " " + lastName}
<<<<<<< HEAD
              message={"Dobili ste posao na gazdinstv: " + name + "!"}
=======
              message={message}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
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
<<<<<<< HEAD
              message={"Zahtev za posao na gazdinstv: " + name + "!"}
              onClose={handleClose}
              onClickDeleteHandler = {onClickDelete}
            />
          }
=======
              message={"Zahtev za posao na gazdinstvu: " + name}
              onClose={handleClose}
              onClickDeleteHandler = {onClickDelete}
            />
          )}
>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
        </div>
      </div>
    </div>
  );
};

export default Inbox;
