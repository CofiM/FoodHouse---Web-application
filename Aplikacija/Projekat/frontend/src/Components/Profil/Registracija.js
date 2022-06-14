import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const theme = createTheme();

export default function SignUp() {
  const history = useHistory();
  const [textIme, setTextIme] = useState("");
  const [textPrezime, setTextPrezime] = useState("");
  const [textEmail, setTextEmail] = useState("");
  const [textUsername, setTextUsername] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const [textAdresa, setTextAdresa] = useState("");
  const [labelIsShown, setLabelIsShown] = useState(false);

  const [pass, setPass] = React.useState({
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const [confirmPass, setConfirmPass] = React.useState({
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const onChangeImeHandler = (event) => {
    setTextIme(event.target.value);
  };

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

  const handleChangeConfirmPassword = (prop) => (event) => {
    setConfirmPass({ ...confirmPass, [prop]: event.target.value });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPass({
      ...confirmPass,
      showPassword: !confirmPass.showPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const onChangePrezimeHandler = (event) => {
    setTextPrezime(event.target.value);
  };

  const onChangeUsernameHandler = (event) => {
    setTextUsername(event.target.value);
  };

  const onChangeEmailHandler = (event) => {
    setTextEmail(event.target.value);
  };

  const onChangePasswordHandler = (event) => {
    setTextPassword(event.target.value);
  };

  const onChangeAdresaHandler = (event) => {
    setTextAdresa(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    if (
      textEmail === null ||
      !/^[a-zA-Z0-9+_.-]+@[a-z]+[.]+[c]+[o]+[m]$/.test(textEmail)
    )
      setLabelIsShown(true);
    else {
      fetchAddNewKorisnik();
      let path = "Prijava";
      history.push(path);
    }
  };

  async function fetchAddNewKorisnik() {
    const response = await fetch(
      "https://localhost:5001/Administrator/DodatiKorisnika/" +
        textIme +
        "/" +
        textPrezime +
        "/" +
        textUsername +
        "/" +
        pass.password +
        "/" +
        confirmPass.password +
        "/" +
        textEmail +
        "/K" +
        "/" +
        textAdresa,
      {
        method: "POST",
        body: JSON.stringify({ title: "Uspesno je dodat" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <div style={{ background: "#E1E8C9", height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ background: "#E1E8C9" }}
        >
          <CssBaseline />
          <Box
            sx={{
              // marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: 2,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Registruj se
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
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
                    onChange={onChangeImeHandler}
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
                    onChange={onChangePrezimeHandler}
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
                    onChange={onChangeUsernameHandler}
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
                    onChange={onChangeEmailHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: 400 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={pass.showPassword ? "text" : "password"}
                      value={pass.password}
                      onChange={handleChangePassword("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {pass.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl sx={{ width: 400 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      {" "}
                      Confirm password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={confirmPass.showPassword ? "text" : "password"}
                      value={confirmPass.password}
                      onChange={handleChangeConfirmPassword("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {confirmPass.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="adresa"
                    label="Adresa"
                    name="adresa"
                    autoComplete="adresa"
                    onChange={onChangeAdresaHandler}
                  />
                </Grid>
              </Grid>
              {labelIsShown && (
                <p style={{ color: "red" }}> Nevalidan unos za e-mail </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ 
                  mt: 3, 
                  mb: 2 , 
                  background: "#BCCF7D", 
                  '&:hover': {
                    background: "#4E944F"
                    /* background: "#4B5E22" */
                  }
                }}
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
    </div>
  );
}
