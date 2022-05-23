import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275, background:"grey", width: "100%", marginTop: "5%" }} >
      <CardContent sx={{width: "100%" }}>
        <Typography 
            sx={{fontSize:24 , fontWeight: 800, textDecoration: "underline"}}             
            color="text" 
            gutterBottom
        >
          {props.ime}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          E-mail: {props.email}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Usluga: {props.cena}
        </Typography>
        <Typography 
            sx={{ fontSize:18 , fontWeight: 400 }} 
            color="text" 
            gutterBottom
        >
          Telefon: {props.telefon}
        </Typography>
      </CardContent>
      <CardActions sx={{alignItems:"center", justifyContent:"center"}}>
        <Button size="medium"> Izaberi</Button>
      </CardActions>
    </Card>
  );
}
