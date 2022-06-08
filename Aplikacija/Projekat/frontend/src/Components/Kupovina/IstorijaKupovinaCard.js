import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import classes from "./IstorijaKupovinaCard.module.css";


export default function OutlinedCard(props) {
    return (
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
            {
                <div className={classes.mainPart}>
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