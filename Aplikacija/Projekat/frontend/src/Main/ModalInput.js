import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
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
  const [open, setOpen] = useState(props.show);
  const [value, setValue] = useState(0);
  const [comment, setComment] = useState("");

  const commentChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const sendArgument = () => {
    props.onClickSaveReview(value, comment);
  };

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
          <TextField
            onChange={commentChange}
            helperText="Unesite komentar"
            id="demo-helper-text-misaligned"
            label="Komentar"
          />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
          <div>
            <Button onClick={props.onClose}>Zatvori</Button>
            <Button onClick={sendArgument}>Sacuvaj recenziju</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
