import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';





const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [textIme, setTextIme] = useState("");
  const [textPrezime, setTextPrezime] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [textUsername, setTextUsername] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textAdresa, setTextAdresa] = useState("");

  const onChangeImeHandler = (event) => {
    setTextIme(event.target.value);
  }

  const onChangePrezimeHandler = (event) => {
    setTextPrezime(event.target.value);
  }

  const onChangeUsernameHandler = (event) => {
    setTextUsername(event.target.value);
  }

  const onChangeEmailHandler = (event) => {
    setTextEmail(event.target.value);
  }

  const onChangePasswordHandler = (event) => {
    setTextPassword(event.target.value);
  }

  const onChangeAdresaHandler = (event) => {
    setTextAdresa(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    console.log(textIme, textPrezime, textUsername, textPassword, textEmail);
    fetchAddNewKorisnik();
  };


  async function fetchAddNewKorisnik(){
    const response = await fetch("https://localhost:5001/Administrator/DodatiKorisnika/" + textIme + "/" +
        textPrezime + "/" + textUsername + "/" + textPassword + "/" + textEmail + "/K" + "/" + textAdresa
    ,{
      method: 'POST',
      body: JSON.stringify({title: 'Uspesno je dodat'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);

    let path = "Prijava";
    history.push(path);
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
           
          </Avatar>
          <Typography component="h1" variant="h5">
            Registruj se
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ime"
                  autoFocus
                  onChange = {onChangeImeHandler} 
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="family-name"
                  onChange = {onChangePrezimeHandler} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="family-name"
                  onChange = {onChangeUsernameHandler} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email adresa"
                  name="email"
                  autoComplete="email"
                  onChange = {onChangeEmailHandler} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Sifra"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange = {onChangePasswordHandler} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adresa"
                  label="Adresa"
                  name="adresa"
                  autoComplete="adresa"
                  onChange = {onChangeAdresaHandler} 
                />
              </Grid>
             

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registruj se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/Prijava" variant="body2">
                  Imate profil? Prijavi se
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}