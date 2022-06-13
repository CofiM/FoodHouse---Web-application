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
import DeleteIcon from "@mui/icons-material/Delete";

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
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState("");
  const [dateStart, setDateStart] = useState(props.datum);

  useEffect(() => {
    const myArray = dateStart.split("T");
    let datum = myArray[0];
    setDate(datum);
  }, []);
  return (
    <Card sx={{ width: 320, height: 230, m: 2 }}>
      <CardHeader title={props.opis} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Broj slobodnih radnih mesta: {props.brojRadnihMesta}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zarada: {props.cena}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Datum početka posla: {date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          disableElevation
          onClick={props.onClickUpdate}
          sx={{
            mt: 3,
            mb: 2,
            background: "#BCCF7D",
            "&:hover": {
              background: "#4E944F",
              /* background: "#4B5E22" */
            },
          }}
        >
          Izmeni posao
        </Button>
        <IconButton
          aria-label="comment"
          onClick={props.onClickDelete}
          size="large"
        >
          <DeleteIcon sx={{ fontSize: "40px" }} />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.opis}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
