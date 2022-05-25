import * as React from 'react'
import classes from "./Inbox.module.css";
import SideBar from "./SideBar";
import MessageBar from "./MessageCard";
import Message from "./MessageModal";
import TrashCard from "./TrashCard";
const messages = ["Ovo je prva poruka", "Ovo je druga poruka"];

const Inbox = () => {
    const [open, setOpen] = React.useState(false);
    const [box, setBox] = React.useState(true);
    const [trash, setTrash] = React.useState(false);
    
    
    const handleClose = () => setOpen(false);


    const onClickMessage = (index) => {
        console.log("Ulazim u message" + index);
        localStorage.setItem("index", index);
        setOpen(true);
    }

   const onSideBarClick = () => {
       const index =  localStorage.getItem("sidebar");
       if(index === '0'){
           setBox(true);
           setTrash(false);
       }
       else if( index === '1'){
           setTrash(true);
           setBox(false);
       }
   }


    return(
        <div className={classes.main}>
            <div className={classes.leftSide}>
                <SideBar onClick={onSideBarClick}/>
            </div>
            <div className={classes.rightSide}>
                <div className={classes.MessagesDiv} >
                    {box && <MessageBar receiver="Maletic" shortMessage="Dobili ste posao!" onClick={() => onClickMessage(0)} />}
                    {trash && <TrashCard receiver={""} shortMessage="Dobili ste posao!" onClick={() => onClickMessage(1)}/>}
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