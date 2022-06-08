import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import classes from "./Narudzbina.module.css";


/* const card = (
  <div className={classes.mainPart}>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Naručilac:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Lazar
      </Typography>
    </CardContent>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Adresa:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Milovana GLisica
      </Typography>
    </CardContent>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Proizvod:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Maline
      </Typography>
    </CardContent>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Količina:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        2
      </Typography>
    </CardContent>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Domaćinstvo:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Gazdinstvo Maletić
      </Typography>
    </CardContent>
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Adresa:
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        Golemog 9A
      </Typography>
    </CardContent>

  </div>
); */

export default function OutlinedCard(props) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
          {
              <div className={classes.mainPart}>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Naručilac:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.ime + " " + props.prezime}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Adresa:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.adresaKorisnika}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Proizvod:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.nazivProizvoda}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Količina:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.kolicinaProizvoda}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Domaćinstvo:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.domacinstvoNaziv}
                </Typography>
              </CardContent>
              <CardContent>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                  Adresa:
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {props.domacinstvoAdresa}
                </Typography>
              </CardContent>
            </div>
        }
      </Card>
    </Box>
  );
}
