import * as React from "react";
import classes from "./Inbox.module.css";
import SideBar from "./SideBar";
import MessageCard from "./MessageCard";
import Message from "./MessageModal";
import TrashCard from "./TrashCard";
const messages = ["Ovo je prva poruka", "Ovo je druga poruka"];

const Inbox = () => {
  const [open, setOpen] = React.useState(false);
  const [inbox, setInbox] = React.useState(true);
  const [outbox, setOutbox] = React.useState(false);

  const handleClose = () => {
    console.log("Uslo dobro");
    setOpen(false);
  };

<<<<<<< HEAD
    const onClickMessage = (index) => {
        console.log("Ulazim u message" + index);
        localStorage.setItem("index", index);
        setOpen(true);
    }

   const onSideBarClick = () => {
       const index =  localStorage.getItem("sidebar");
       if( index === '0' ){
            setInbox(true);
            setOutbox(false);
       }
       else if( index === '1'){
            setOutbox(true);
           setInbox(false);
       }
    }
=======
  const onClickMessage = (index) => {
    console.log("Ulazim u message" + index);
    localStorage.setItem("index", index);
    setOpen(true);
  };

  const onSideBarClick = () => {
    const index = localStorage.getItem("sidebar");
    if (index === "0") {
      setInbox(true);
      setOutbox(false);
    } else if (index === "1") {
      setOutbox(true);
      setInbox(false);
    }
  };
>>>>>>> 5239d4ad33617bb639c63941ba0c9e7c5fa49594

  return (
    <div className={classes.main}>
      <div className={classes.leftSide}>
        <SideBar onClick={onSideBarClick} />
      </div>
      <div className={classes.rightSide}>
        <div className={classes.MessagesDiv}>
          {inbox && (
            <MessageCard
              receiver="Maletic"
              shortMessage="Dobili ste posao!"
              onClickIcon={handleClose}
              onClick={() => onClickMessage(0)}
            />
          )}
          {outbox && (
            <TrashCard
              receiver={""}
              shortMessage="Dobili ste posao!"
              onClick={() => onClickMessage(1)}
            />
          )}
        </div>
        <div>
          <Message
            show={open}
            title="Naslov"
            sender="Posiljalac"
            message="Poruka o prihvatanju posla"
            onClose={handleClose}
          />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
