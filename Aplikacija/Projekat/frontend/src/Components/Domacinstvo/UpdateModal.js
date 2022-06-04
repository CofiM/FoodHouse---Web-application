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
  const [naziv, setNaziv] = useState(props.naziv);
  const [kolicina, setKolicina] = useState(props.kolicina);
  const [cena, setCena] = useState(props.cena);
  const [opis, setOpis] = useState(props.opis);
  const [kategorija, setKategorija] = useState(props.kategorija);

  const nazivChange = (e) => {
    setNaziv(e.target.value);
    console.log(naziv);
  };
  const kolicinaChange = (e) => {
    setKolicina(e.target.value);
    console.log(kolicina);
  };
  const cenaChange = (e) => {
    setCena(e.target.value);
    console.log(cena);
  };
  const opisChange = (e) => {
    setOpis(e.target.value);
    console.log(opis);
  };
  const kategorijaChange = (e) => {
    setKategorija(e.target.value);
    console.log(kategorija);
  };

  const sendArgument = () => {
    props.onClickSaveChange(naziv, kolicina, cena, opis, kategorija);
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
          <TextField
            onChange={nazivChange}
            helperText="Unesite naziv"
            id="demo-helper-text-misaligned"
            value={naziv}
            label="Naziv"
          />
          <TextField
            onChange={kolicinaChange}
            helperText="Unesite kolicinu"
            id="demo-helper-text-misaligned"
            value={kolicina}
            label="Kolicina"
          />
          <TextField
            onChange={cenaChange}
            helperText="Unesite cenu"
            id="demo-helper-text-misaligned"
            value={cena}
            label="Cena"
          />
          <TextField
            onChange={opisChange}
            helperText="Unesite opis"
            id="demo-helper-text-misaligned"
            value={opis}
            label="Opis"
          />
          <TextField
            onChange={kategorijaChange}
            helperText="Unesite kategoriju"
            id="demo-helper-text-misaligned"
            value={kategorija}
            label="Kategorija"
          />
          <div>
            <Button onClick={props.onClose}>Otkazi</Button>
            <Button onClick={sendArgument}>Izmeni proizvod</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
