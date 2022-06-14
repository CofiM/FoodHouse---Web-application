import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import slika from "./add-icon-614x460.png";

export default function MultiActionAreaCard(props) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, width: 320, height: 517 }}>
      <CardActionArea onClick={props.onClickAdd}>
        <CardMedia
          component="img"
          height="517"
          image={slika}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
}
