import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./CartModal.module.css";
import {useCart} from 'react-use-cart';

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

export default function CartModal(props) {


  const{cartTotal}=useCart();

  let sab1 = {cartTotal}.cartTotal;
  let sab2 = +props.dost;
  let zbir = sab1 + sab2;
  console.log(sab1);
  console.log(sab2);
  console.log(zbir);


  console.log(props.dost);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.show}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ukupan racun iznosi : {zbir}.00 din
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            racun proizvoda : {cartTotal}.00 din <br></br> + dostava:{props.dost}.00 din
          </Typography>
          <p>
            Da li ste sigurni da zelite da porucite proizvode?
          </p>
          <div className={classes.rowDesign}>
            <Button onClick={props.onPrihvati}>Prihvati</Button>
            <Button onClick={props.onClose}>Odbij</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}