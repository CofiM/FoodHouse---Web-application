import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard(props) {

  const onDoubleClickHandler = () => {
    console.log("DOUBLE CLICK");
  }

  return (
    <Card sx={{ minWidth: 275, background:"grey", width: "100%", marginTop: "5%" }} >
      <CardContent sx={{width: "100%" }}>
        <Typography 
            sx={{fontSize:24 , fontWeight: 800, textDecoration: "underline"}}             
            color="text" 
            gutterBottom
        >
          {props.opis}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Broj slobodnih radnih mesta: {props.brRadnihMesta}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Datum početka posla: {props.datum}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Zarada: {props.cena} RSD
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Domaćin: {props.domacin} 
        </Typography>
        <Typography
            sx={{ fontSize: 18, fontWeight: 400 }}
            color="text"
            gutterBottom
        >
            Adresa: {props.adresa}
        </Typography>
      </CardContent>
      <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
        <Button size="medium" onClick={props.onClicksignIn}> Prijavi se</Button>
      </CardActions>
    </Card>
  );
}
