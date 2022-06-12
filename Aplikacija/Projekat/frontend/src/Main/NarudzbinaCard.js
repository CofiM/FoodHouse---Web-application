import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import classes from "./Narudzbina.module.css";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

export default function OutlinedCard(props) {
  return (
    <Box sx={{ minWidth: 275, paddingTop: 1, paddingRight: 2, paddingLeft: 2}}>
      <Card variant="outlined">
          {
              <div className={classes.mainPartDesign}>
                <div className={classes.mainPart}>
                  <CardContent sx={{width: 160}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Naručilac:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {props.ime + " " + props.prezime}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{width: 240}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Adresa:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {props.adresaKorisnika}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{width: 130}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Proizvod:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {props.nazivProizvoda}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{width: 130}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Količina:
                    </Typography>
                    <Typography sx={{ mb: 1.5, paddingLeft: "30px" }} color="text.secondary">
                      {props.kolicinaProizvoda}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{width: 240}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Domaćinstvo:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {props.domacinstvoNaziv}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{width: 250}}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                      Adresa:
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {props.domacinstvoAdresa}
                    </Typography>
                  </CardContent>
                </div>
                <div className={classes.iconPart}>
                    <DeleteForeverRoundedIcon sx={{ fontSize:40 }}/>
                </div>
            </div>
        }
      </Card>
    </Box>
  );
}
