import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard(props) {
  // const otvoriDomacina = () => {
  //   console.log("otvaram domacina");
  // };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.NazivDomacinstva}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Ovo domacinstov se nalazi {props.adresa}, mozete nas kontaktirati
            svakog dana na broj telefona {props.brojTelefona}.
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
