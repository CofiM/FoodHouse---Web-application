import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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
  console.log(props.komentar.length);
  let transformedCom = [];
  props.komentar.forEach((el) => {
    el = el + "\n";
    transformedCom.push(el);
  });
  console.log(transformedCom);
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
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.komentar}
          </Typography>
          ;
          <div>
            <Button onClick={props.onClose}>Zatvori</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
