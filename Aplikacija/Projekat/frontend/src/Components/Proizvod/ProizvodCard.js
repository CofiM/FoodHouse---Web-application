import * as React from "react";
import { useState } from "react";
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
import { useEffect } from "react";
import { containerClasses } from "@mui/system";

const styles = (theme) => ({
  card: {
    maxWidth: 400,
  },
  media: {
    // this is the`className` passed to CardMedia later
    height: 300, // as an example I am modifying width and height
    width: "33%",
    marginLeft: "33%",
  },
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [image, setImage] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [val, setValue] = useState(0);
  let korisnik = localStorage.getItem("Korisnik");
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
  }, []);
  return (
    <Card sx={{ width: 320, m: 2 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings"onClick={props.onClickCart}>
            <AddShoppingCartIcon
              // onClick={props.onClickCart}
              sx={{ fontSize: "40px" }}
            />
          </IconButton>
        }
        title={props.naziv.toUpperCase()}
      />
      <CardMedia
        className={styles.media}
        component="img"
        height="300"
        image={"data:image/png;base64," + image}
        alt={props.naziv}
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ fontSize: "20px" }}
        >
       {/* <p>Količina: {props.kolicina}</p>  */}
        Cena: {props.cena} dinara.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Rating
          name="read-only"
          value={props.ocena}
          readOnly
          sx={{ fontSize: "40px" }}
        />
        <IconButton aria-label="comment" onClick={props.onClickComment}>
          <CommentIcon sx={{ fontSize: "30px" }} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ fontSize: "40px" }} />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.opis}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
