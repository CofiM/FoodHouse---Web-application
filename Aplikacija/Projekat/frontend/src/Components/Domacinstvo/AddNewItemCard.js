import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import slika from "./add-icon-614x460.png";

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, width: 320, height: 366 }}>
      <CardActionArea onClick={props.onClickAdd}>
        <CardMedia
          component="img"
          height="366"
          image={slika}
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
