import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./MessageModal.module.css";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  /* const [open, setOpen] = React.useState(props.show);
  const [accept, setAccept] = React.useState(false);
  const [decline, setDecline] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); */
  const [type, setType] = React.useState("");

  /* async function fetchUpdateMessage(type, firstName, lastName){
    const DomacinstvoID = localStorage.getItem("DomacinstvoID");
    console.log("ULAZIM");
    const response = await fetch("https://localhost:5001/Domacinstvo/PrihvatiPosao/" + DomacinstvoID + "/" +
    type + "/" + firstName + "/" + lastName,{
      method: 'PUT',
      body: JSON.stringify({title: 'Uspesno je azuriran'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  const onClickAccept = () => {
      console.log("Ulazim u onClickAccept");
      console.log(props.tip);
      if( props.tip === "K"){
        fetchUpdateMessage(props.tip, props.firstName, props.lastName);        
      }
      else if( props.tip === "D"){
        fetchUpdateMessage(props.tip, props.firstName, props.lastName);
      }
  } */

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Posiljalac: " + props.sender}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {"Primalac: " + props.receiver}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
          <div className={classes.rowDesign}>
            <Button onClick={props.onClickDeleteHandler}>Obrisi poruku</Button>
            <Button onClick={props.onClickDeclineHandler}>Odbij </Button>
            <Button onClick={props.onClickAcceptHandler}>Prihvati </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
