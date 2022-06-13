import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Rating } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function RecipeReviewCard(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://localhost:5001/FileUpload/" + props.idProizvoda
      );
      const data = await response.json();
      data.map((item) => {
        setImage(item);
      });
      //setImage(data);
    };
    fetchData();
    console.log("AAA");
    console.log(props.idProizvoda);
    console.log(image);
  }, []);

  return (
    <Card sx={{ width: 320, m: 2 }}>
      <CardHeader
        title={(props.naziv + "-" + props.domacinstvo).toUpperCase()}
        sx={{ fontSize: "15px" }}
      />
      <CardMedia
        component="img"
        height="300"
        image={"data:image/png;base64," + image}
        alt="Paella dish"
      />
      <CardActions disableSpacing>
        <Button
          variant="contained"
          disableElevation
          sx={{
            mt: 3,
            mb: 2,
            background: "#BCCF7D",
            "&:hover": {
              background: "#4E944F",
              /* background: "#4B5E22" */
            },
          }}
          onClick={props.onClick}
        >
          Ostavi recenziju
        </Button>
      </CardActions>
    </Card>
  );
}
