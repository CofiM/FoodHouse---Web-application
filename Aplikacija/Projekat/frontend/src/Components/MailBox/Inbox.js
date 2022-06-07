import * as React from "react";
import { useEffect } from "react";
import classes from "./Inbox.module.css";
import SideBar from "./SideBar";
import MessageCard from "./MessageCard";
import Message from "./MessageModal";
import MessageConsumer from "./MessageModalConsumer";
import NoMessageCard from "./NoMessageCard";

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
  const [household, setHousehold] = React.useState("");
  const [messageNumber, setMessageNumber] = React.useState(0);
  const [messageSender, setMessageSender] = React.useState("");
  const [shownFlag, setShownFlag] = React.useState("");


  const handleClose = () => {
    setOpen(false);
  };

  const onClickMessage = (index, ime, prezime, naziv, tip, email, emailP, por, shownFlag) => {
    console.log("Ulazim u message" + index);
    localStorage.setItem("index", index);
    setOpen(true);
    setFirstName(ime);
    setLastName(prezime);
    setName(naziv);
    setType(tip);
    setReceiverEmail(email);
    setHousehold(emailP);
    setMessageSender(por);
    if(shownFlag === false){
      const shown = true
      updateMessage(index, shown);
    }
    console.log(type);
  };

  async function updateMessage(messageID, shown){
    const response = await fetch("https://localhost:5001/Poruke/AzurirajVidljivostPoruke/" + messageID + "/" +
    shown ,{
      method: 'PUT',
      body: JSON.stringify({title: 'Uspesno je azurirana poruka!'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  }

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
      const tip = localStorage.getItem("Korisnik");
      setClientType(tip);
      if (tip === "P") {
        
        const ID = localStorage.getItem("DomacinstvoID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        const da = await response.json();
        let pom = 0;
        const transformedData = da.map(function (d) {
          if(d.shown == false && d.tip !== 'P')
            pom++;
          setMessageID(d.id);
          return {
            ID: d.id, 
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik,
            EmailP: d.emailDomacinstvo,
            Shown: d.shown
          }
          
        })
        setData(transformedData);
        localStorage.setItem("messageNumber", pom);
        
      }
      else if( tip === "D"){
        console.log("Ulazim u D");
        setProducer(false);
        const ID = localStorage.getItem("DostavljacID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        let pom=0;
        const data = await response.json();
        const transformedData = data.map(function (d) {
          if(d.shown == false && d.tip !== 'D')
            pom++;
          setMessageID(d.id);
          return {
            ID: d.id,
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik,
            EmailP: d.emailDomacinstvo,
            Shown: d.shown
          }
        })
        setData(transformedData);
        localStorage.setItem("messageNumber", pom);

      } else if (tip === "K") {
        console.log("Ulazim u K");
        const ID = localStorage.getItem("KorisnikID");
        const response = await fetch(
          "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip
        );
        const data = await response.json();
        let pom = 0;
        const transformedData = data.map(function (d) {
          setMessageID(d.id);
          if(d.shown == false && d.tip !== 'P')
            pom++;
          return {
            ID: d.id,
            Poruka: d.sadrzaj,
            ImeD: d.ime,
            PrezimeD: d.prezime,
            ImeK: d.imeKorisnik,
            PrezimeK: d.prezimeKorisnika,
            NazivP: d.naziv,
            Tip: d.tip,
            EmailD: d.emailDostavljac,
            EmailK: d.emailKorisnik,
            EmailP: d.emailDomacinstvo,
            Shown: d.shown
          }
        })
        setData(transformedData);
        console.log(transformedData);
        localStorage.setItem("messageNumber", pom);
      }
    };
    fetchMessage();
    unreadMessagesHandler();
  }, []);

  async function sendMessageProducer(
    receiverEmail,
    message,
    flag,
    receiverType,
    shown
  ) {
    const DomacinstvoID = localStorage.getItem("DomacinstvoID");
    console.log("ULAZIM");
    const response = await fetch("https://localhost:5001/Administrator/PosaljiPoruku/" + DomacinstvoID + "/" +
    receiverEmail + "/" + message + "/P/" + flag + "/" + receiverType + "/" + shown, {
        method: 'POST',
        body: JSON.stringify({title: 'Uspesno je poslata poruka'}),
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    const data = await response.json();
    console.log(data);
  }

  async function deleteMessage(ClientID, MessageID, Type) {
    const response = await fetch(
      "https://localhost:5001/Administrator/ObrisiPoruku/" +
        ClientID +
        "/" +
        MessageID +
        "/" +
        Type,
      {
        method: "DELETE",
        body: JSON.stringify({ title: "Uspesno je obrisana poruka" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  }

  const onClickDelete = () => {
    console.log("Ulazim u onClickDelete");
    const type = localStorage.getItem("Korisnik");
    let clientID = "";
    console.log(type);
    if (type === "K") {
      clientID = localStorage.getItem("KorisnikID");
    } else if (type === "P") {
      clientID = localStorage.getItem("DomacinstvoID");
    } else if (type === "D") {
      clientID = localStorage.getItem("DostavljacID");
    }
    console.log(clientID);
    deleteMessage(clientID, messageID, type);
    handleClose();
  };

  const onClickAccept = () => {
      console.log("Ulazim u onClickAccept");
      console.log(type);
      const message = "Dobili ste posao!";
      const flag = true;
      const shown = false;
      console.log(receiverEmail, message, flag, type);
      sendMessageProducer( receiverEmail, message, flag, type,shown );
      fetchUpdateClientJobs();
      handleClose();
  }

  const onClickDecline = () => {
    console.log("Ulazim u onClickDecline");
    const message = "Niste prihvaceni za posao. Izvinite!";
    const flag = false;
    const shown = false;
    sendMessageProducer(receiverEmail, message, flag, type, shown);
    handleClose();
  };

  async function fetchUpdateDeliverer() {
    const response = await fetch("https://localhost:5001/Domacinstvo/PostaviDostavljacaDomacinstvu/" + household + "/" +
    receiverEmail ,{
      method: 'PUT',
      body: JSON.stringify({title: 'Uspesno je azuriran'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  async function fetchUpdateClientJobs(){
    const posaoID = localStorage.getItem("PosaoID");
    const korisnikID = localStorage.getItem("IdKorisnik")
    const response = await fetch("https://localhost:5001/Korisnik/DodatiPosao/" + posaoID + "/" +
    korisnikID ,{
      method: 'POST',
      body: JSON.stringify({title: 'Uspesno je dodat posao korisniku!'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    //console.log(data);
    localStorage.removeItem("PosaoID");
    localStorage.removeItem("IdKorisnik");
  }

  async function sendMessageDeliverer(receiverEmail, message, flag, receiverType, shown){
    const DostavljacID = localStorage.getItem("DostavljacID");
    console.log("ULAZIM");
    const response = await fetch("https://localhost:5001/Dosavljac/PosaljiPoruku/" + DostavljacID + "/" +
    receiverEmail + "/" + message + "/D/" + flag + "/" + receiverType + "/" + shown,{
      method: 'POST',
      body: JSON.stringify({title: 'Uspesno je poslata poruka'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const onClickAcceptDeliverer = () => {
    console.log("Ulazim u deliverer!");
    console.log(household, receiverEmail);
    fetchUpdateDeliverer();
    const mess = "Prihvatio sam Vasu ponudu za dostavljaca!";
    const typeFlag = false;
    const recvType = "P";
    const shown = false;
    sendMessageDeliverer(household, mess, typeFlag, recvType, shown);
    handleClose();
  }

  const receiveMessagesHandler = () => {
    let temp = 0;
    const korisnik = localStorage.getItem("Korisnik");
    if( korisnik === "P" ){
      data.map( (d) => {
        if( d.Tip !== "P" )
        {
          temp++;
        }
      });
      return temp;
    }
    else if( korisnik === "D" ){
      data.map( (d) => {
        if( d.Tip !== "D" )
        {
          temp++;
        }
      });
      return temp;
    }
    else if( korisnik === "K" )
    {
      data.map( (d) => {
        if( d.Tip !== "K" )
        {
          temp++;
        }
      });
      return temp;
    }
  }

  const senderMessagesHandler = () => {
    let temp = 0;
    const korisnik = localStorage.getItem("Korisnik");
    if( korisnik === "P" ){
      data.map( (d) => {
        if( d.Tip === "P" )
        {
          temp++;
        }
      });
      return temp;
    }
    else if( korisnik === "D" ){
      data.map( (d) => {
        if( d.Tip === "D" )
        {
          temp++;
        }
      });
      return temp;
    }
    else if( korisnik === "K" )
    {
      data.map( (d) => {
        if( d.Tip === "K" )
        {
          temp++;
        }
      });
      return temp;
    }
  }

  const unreadMessagesHandler = () => {
    console.log("Ulazim u unreadMessagesHandler!");
    let numberUnreadMessages = 0;
    const korisnik = localStorage.getItem("Korisnik");
    console.log(data);
    if( korisnik === "P" ){
      console.log("Ulazim u P!");
      //console.log(data);
      data.map( (d) => {
        console.log("USLO");
        if( d.Tip !== "P" && d.Shown == false )
        { 
          console.log("Ulazim u if!");
          numberUnreadMessages = numberUnreadMessages + 1;
        }
      });
      localStorage.setItem("messagesNumber", numberUnreadMessages);
      console.log("BR: " + numberUnreadMessages);
    }
    else if( korisnik === "D" ){
      data.map( (d) => {
        if( d.Shown === false )
        {
          numberUnreadMessages++;
        }
      });
      localStorage.setItem("messagesNumber", numberUnreadMessages);
      console.log(numberUnreadMessages);
    }
    else if( korisnik === "K" )
    {
      data.map( (d) => {
        if( d.Shown === false )
        {
          numberUnreadMessages++;
        }
      });
      localStorage.setItem("messagesNumber", numberUnreadMessages);
      console.log(numberUnreadMessages);
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.leftSide}>
        <SideBar onClick={onSideBarClick} />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.MessagesDiv}>
          {inbox && (data.length === 0 ?  
              <NoMessageCard 
                shortMessage={"No messages!"}
              />
              : (receiveMessagesHandler() === 0 && 
              <NoMessageCard 
                shortMessage={"No messages!"}
              />)
            )
          }
          
          { inbox &&  data.map( (d, index) => {
              if( d.Tip === "D" && clientType === "P" )
                return <MessageCard 
                          receiver={d.ImeD + " " + d.PrezimeD} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(d.ID, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.EmailP, d.Poruka, d.Shown)}
                        />
              if( d.Tip === "K" && clientType === "P" )
                return  <MessageCard 
                          receiver={d.ImeK + " " + d.PrezimeK} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(d.ID, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.EmailP, d.Poruka, d.Shown)}
                        />
              if( d.Tip === "P" && clientType === "D")
                return  <MessageCard 
                          receiver={d.NazivP} 
                          shortMessage={d.Poruka}
                          onClickIcon={handleClose}
                          onClick={() => onClickMessage(d.ID, d.ImeD, d.PrezimeD, d.NazivP, d.Tip, d.EmailD, d.EmailP, d.Poruka, d.Shown)}
                        />
              if( d.Tip === "P" && clientType === "K")
              return  <MessageCard 
                        receiver={d.NazivP} 
                        shortMessage={d.Poruka}
                        onClickIcon={handleClose}
                        onClick={() => onClickMessage(d.ID, d.ImeK, d.PrezimeK, d.NazivP, d.Tip, d.EmailK, d.EmailP, d.Poruka, d.Shown)}
                      />
            }
          )}
          {outbox && (data.length === 0 ?  
              <NoMessageCard 
                shortMessage={"No messages!"}
              />
              : 
              ( senderMessagesHandler() === 0 ? 
                <NoMessageCard 
                  shortMessage={"No messages!"}
                />
                :
                null
              )
            )
          }
          { outbox && data.map( (d, index) => {
            if( clientType === 'P' && d.Tip === 'P' &&  d.EmailK === null)
              
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(d.ID, d.ImeD, d.PrezimeD, d.NazivP, d.Tip,"", d.EmailP, d.Poruka, d.Shown)}
                      />
            
            if( clientType === "P" && d.Tip === "P" && d.EmailD === null )
              return  <MessageCard
                        receiver={d.NazivP}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(d.ID, d.ImeK, d.PrezimeK, d.NazivP, d.Tip,"", d.EmailP, d.Poruka, d.Shown)}
                      />
            
            if( clientType === 'K' && d.Tip === 'K' )
              return  <MessageCard
                        receiver={d.ImeK + " " + d.PrezimeK}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(d.ID, d.ImeK, d.PrezimeK, d.NazivP, d.Tip,"", d.EmailP, d.Poruka, d.Shown)}
                      />

            if( clientType === 'D' && d.Tip === 'D' )
              return  <MessageCard
                        receiver={d.ImeD + " " + d.PrezimeD}
                        shortMessage={d.Poruka}
                        onClick={() => onClickMessage(d.ID, d.ImeD, d.PrezimeD, d.NazivP, d.Tip,"", d.EmailP, d.Poruka, d.Shown)}
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
              firstName={firstName}
              lastName={lastName}
              receiver={name}
              tip={type}
              producer={producer}
              message={"Zahtev za posao na gazdinstvu: " + name}
              onClose={handleClose}
              onClickAcceptHandler={onClickAccept}
              onClickDeclineHandler={onClickDecline}
              onClickDeleteHandler={onClickDelete}
            />
            :
            (clientType === "D" ?
              <Message
                show={open}
                title="Posao"
                sender={name}
                firstName = {firstName}
                lastName = {lastName}
                receiver={firstName + " " + lastName}
                tip={type}
                producer = {producer}
                message={"Zahtev za posao dostavljaca za domacinstvo: " + name}
                onClose={handleClose}
                onClickAcceptHandler = { onClickAcceptDeliverer }
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

                message={messageSender}
                onClose={handleClose}
                onClickAcceptHandler = { onClickAccept }
                onClickDeclineHandler = { onClickDecline }
                onClickDeleteHandler = { onClickDelete }
              />
            )
          )}
          
          {outbox && ( clientType === "P" ?
            <MessageConsumer
              show={open}
              outbox={outbox}
              title="Posao"
              sender={name}
              receiver={firstName + " " + lastName}
              message={messageSender + " S postovanjem domacinstvo: " + name + "."}
              onClose={handleClose}
              onClickDeleteHandler={onClickDelete}
            />
            :
            ( clientType === "D" ? 
              <MessageConsumer
                show={open}
                outbox={outbox}
                title="Posao"
                sender={name}
                receiver={firstName + " " + lastName}
                message={"Prihvatio sam Vasu ponudu za dostavljacu na domacinstvu: " + name + "!"}
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
                message={"Zahtev za posao na gazdinstvu: " + name + "!"}
                onClose={handleClose}
                onClickDeleteHandler = {onClickDelete}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
