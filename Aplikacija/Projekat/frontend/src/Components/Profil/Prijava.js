import * as React from "react";
import { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from 'react-router-dom';
import Header from "../../Header/Header";
const theme = createTheme();

export default function SignIn(){
  const history = useHistory();
  const [textEmail, setTextEmail] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const [labelIsShown, setLabelIsShown] = useState(false);

  const onChangeEmailHandler = (event) => {
    setTextEmail(event.target.value);
  }

  const onChangePasswordHandler = (event) => {
    setTextPassword(event.target.value);
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });


    if(textEmail === null || textPassword === null || !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(textEmail))
      setLabelIsShown(true);


      console.log(textEmail, textPassword);
      fetchLoginClient();
    };

  async function fetchLoginClient(){
    const response = await fetch("https://localhost:5001/Administrator/GetAccount/"+textEmail+"/"+textPassword,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    });

    const data = await response.json();
    
    localStorage.setItem("Korisnik",data.tip);

    

    if(data.tip === "K"){
      let path = "Naslovna";
      history.push(path);
      localStorage.setItem("KorisnikID", data.id);
    }
    else if ( data.tip === "D"){
      let path = "Dostavljac";
      history.push(path);
      localStorage.setItem("DostavljacID", data.id);
    }
    else if ( data.tip === "P"){
      let path = "Domaćinstvo";
      history.push(path);
      localStorage.setItem("DomacinstvoID", data.id);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Prijavi se
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email adresa"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeEmailHandler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Sifra"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePasswordHandler}
            />
            {labelIsShown && <p style={{color:"red"}}> Nevalidan unos za e-mail ili sifru </p>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prijavi se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/Registracija" variant="body2">
                  Nemate profil? Registrujte se
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
