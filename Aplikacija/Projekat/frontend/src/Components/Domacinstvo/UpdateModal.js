import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import classes from "./AddModal.module.css";

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

const categoryArray = [
  {
    label: "Mlečni proizvodi",
    value: "Mlečni proizvodi",
  },
  {
    label: "Med i proizvodi od meda",
    value: "Med i proizvodi od meda",
  },
  {
    label: "Rakije",
    value: "Rakije",
  },
  {
    label: "Meso i mesne prerađevine",
    value: "Meso i mesne prerađevinekije",
  },
  {
    label: "Domaća jaja",
    value: "Domaća jaja",
  },
  {
    label: "Džem i slatko",
    value: "Džem i slatko",
  },
  {
    label: "Voće i povrće",
    value: "Voće i povrće",
  },
];

export default function BasicModal(props) {
  const [open, setOpen] = useState(props.show);
  const [value, setValue] = useState(0);
  const [naziv, setNaziv] = useState(props.naziv);
  const [cena, setCena] = useState(props.cena);
  const [opis, setOpis] = useState(props.opis);
  const [kategorija, setKategorija] = useState(props.kategorija);

  const nazivChange = (e) => {
    setNaziv(e.target.value);
    console.log(naziv);
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
    props.onClickSaveChange(naziv, 1, cena, opis, kategorija);
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
            sx={{ m: 2 }}
            onChange={nazivChange}
            id="demo-helper-text-misaligned"
            value={naziv}
            label="Naziv"
          />
          <TextField
            onChange={cenaChange}
            sx={{ m: 2 }}
            id="demo-helper-text-misaligned"
            value={cena}
            label="Cena"
          />
          <TextField
            onChange={opisChange}
            sx={{ m: 2 }}
            id="demo-helper-text-misaligned"
            value={opis}
            label="Opis"
          />
          {/* <TextField
            onChange={kategorijaChange}
            sx={{ m: 2 }}
            id="demo-helper-text-misaligned"
            value={kategorija}
            label="Kategorija"
          /> */}
          <select
            className={classes.category}
            onChange={kategorijaChange}
            placeholder="Kategorija"
          >
            <option value="">Kategorija</option>
            {categoryArray.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div>
            <Button onClick={props.onClose}>Otkazi</Button>
            <Button onClick={sendArgument}>Izmeni proizvod</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
