import * as React from "react";
import { useState } from "react";
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
import { useHistory } from "react-router-dom";
import Header from "../../Header/Header";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

const theme = createTheme();
 
export default function SignIn() {
  const history = useHistory();
  const [textEmail, setTextEmail] = useState("");
  const [labelIsShown, setLabelIsShown] = useState(false);
 
  const [pass, setPass] = React.useState({
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChangePassword = (prop) => (event) => {
    setPass({ ...pass, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPass({
      ...pass,
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeEmailHandler = (event) => {
    setTextEmail(event.target.value);
  };
 
  /* const onChangePasswordHandler = (event) => {
    setTextPassword(event.target.value);
  }; */
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
 
    if (
      textEmail === null ||
      pass.password === null ||
      !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(textEmail)
    )
      setLabelIsShown(true);
 
    fetchLoginClient();
  };
 
  async function fetchLoginClient() {
    const response = await fetch(
      "https://localhost:5001/Administrator/GetAccount/" +
        textEmail +
        "/" +
        pass.password,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      }
    );
 
    const data = await response.json();
 
    localStorage.setItem("Korisnik", data.tip);
 
    if (data.tip === "K") {
      let path = "Naslovna";
      history.push(path);
      localStorage.setItem("KorisnikID", data.id);
    } else if (data.tip === "D") {
      let path = "Narudžbine";
      history.push(path);
      localStorage.setItem("DostavljacID", data.id);
    } else if (data.tip === "P") {
      let path = "Domaćinstvo";
      history.push(path);
      localStorage.setItem("DomacinstvoID", data.id);
    }
    window.location.reload(false); //REFRESH PAGE
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
            <FormControl sx={{ width: 400 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={pass.showPassword ? 'text' : 'password'}
                      value={pass.password}
                      onChange={handleChangePassword('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pass.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
            {labelIsShown && (
              <p style={{ color: "red" }}>
                {" "}
                Nevalidan unos za e-mail ili sifru{" "}
              </p>
            )}
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