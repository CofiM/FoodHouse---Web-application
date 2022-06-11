import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import {useState,useEffect} from 'react';

export default function MultiActionAreaCard(props) {
  const [slika,setSlika] = useState(null);
  useEffect(() => {
    async function fetchData() {
      console.log(props.id);
      const response = await fetch("https://localhost:5001/FileUpload/DomacinstvoGet/" + props.id);
      const data = await response.json();
      setSlika(data);
    }
    fetchData();
  }, []);
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={"data:image/png;base64," + slika}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.NazivDomacinstva}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ovo domacinstov se nalazi {props.Adresa}, mozete nas kontaktirati
            svakog dana na broj telefona {props.Telefon}.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={props.onClick}>
          Pogledaj domacinstvo
        </Button>
      </CardActions>
    </Card>
  );
}
