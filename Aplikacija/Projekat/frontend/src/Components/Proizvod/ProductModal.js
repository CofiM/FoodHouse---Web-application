import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";


export default function BasicModal() {
    const [open, setOpen] = React.useState(props.show);
  
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
              {props.title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.message}
            </Typography>
            <div /*className={classes.rowDesign}*/>
              {/* <Button onClick={props.onClose}>Obrisi poruku</Button>
              <Button onClick={props.onClose}>Odbij</Button>
              <Button onClick={props.onClose}>Prihvati</Button> */}
             <input type="text">Naziv proizvoda</input>
             

            </div>
          </Box>
        </Modal>
      </div>
    );
  }