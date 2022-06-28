import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../pictures/logo.png";
import { useHistory } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import classes from "./Header.module.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { HeaderItems } from "./HeaderComponentsKorisnik";
import { HeaderItemsDostavljac } from "./HeaderComponentsDostavljac";
import { HeaderItemsDomacinstvo } from "./HeaderComponentsDomacinstvo";
import MailBox from "../Components/MailBox/MailBox";
import ProfileKorisnik from "../Components/Profil/ProfileKorisnik";
import ProfileDostavljac from "../Components/Profil/ProfileDostavljac";
import ProfileDomacinstvo from "../Components/Profil/ProfileDomacinstvo";
import CartBox from "../Components/Korpa/CartBox";
import { useCart } from "react-use-cart";
import WarningModal from "../Components/Domacinstvo/WarningModal.js";
import { textFieldClasses } from "@mui/material";
import AuthContext from "../helper/auth-context";
import { ExtractData } from "../helper/extract";
<<<<<<< HEAD
=======

>>>>>>> 7bd4c45d3d211a69574bac562d4459fc2161dce3

const settings = ["Profile", "Logout"];

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#ccc4c5",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const history = useHistory();
  const [clientType, setClientType] = React.useState("");
  const [korisnikIsLoggedIn, setKorisnikIsLoggedIn] = React.useState(true);
  const [isValid, setIsValid] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [numberMessages, setNumberMessages] = React.useState(0);
  const [openWarning, setOpenWarning] = useState(false);
  const [crt, setCrt] = useState(false);
  const [mess, setMess] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dom, setDom] = useState(false);
  const [nazivDomacinstva, setNazivDomacinstva] = useState("");
  const [num, setNum] = useState(0);
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const { emptyCart } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("Token");
    console.log(token);
    let tip = null;
    let name = null;
    if (token != null) {
      tip = ExtractData(token, "role");
<<<<<<< HEAD
      name = ExtractData(token, "name");
      setWord1(name.split(" ")[0][0]);
      setWord2(name.split(" ")[1][0]);
      console.log(name);
=======
>>>>>>> 7bd4c45d3d211a69574bac562d4459fc2161dce3
    }
    if (tip == null) {
      setMess(false);
    } else {
      fetchMessage();
      if (tip == "K") {
        setCrt(true);
        //setName(localStorage.getItem("IME").toUpperCase());
        //setSurname(localStorage.getItem("PREZIME").toUpperCase());
      }
      if (tip == "D") {
        //setName(localStorage.getItem("IME").toUpperCase());
        //setSurname(localStorage.getItem("PREZIME").toUpperCase());
      }
      if (tip == "P") {
<<<<<<< HEAD
        setDom(true);
=======
        //setDom(true);
>>>>>>> 7bd4c45d3d211a69574bac562d4459fc2161dce3
        //setNazivDomacinstva(
        //localStorage.getItem("NAZIVDOMACINSTVA").toUpperCase()
        //);
      }
      setMess(true);
      setProfileAvatar(true);
    }
  });
  console.log(username);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const fetchMessage = async () => {
    let token = localStorage.getItem("Token");
    const tip = ExtractData(token, "role");

    if (tip === "P") {
      const ID = ExtractData(token, "serialnumber");
      const response = await fetch(
        "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const da = await response.json();
      let pom = 0;
      const transformedData = da.map(function (d) {
        if (d.shown == false && d.tip !== "P") pom++;
      });
      console.log("Broj poruke: " + pom);
      setNum(pom);
      localStorage.setItem("messageNumber", pom);
    } else if (tip === "D") {
      console.log("Ulazim u D");
      const ID = ExtractData(token, "serialnumber");
      const response = await fetch(
        "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let pom = 0;
      const data = await response.json();
      const transformedData = data.map(function (d) {
        if (d.shown == false && d.tip !== "D") pom++;
      });
      setNum(pom);
      localStorage.setItem("messageNumber", pom);
    } else if (tip === "K") {
      console.log("Ulazim u K");
      const ID = ExtractData(token, "serialnumber");
      const response = await fetch(
        "https://localhost:5001/Poruke/PreuzmiPoruke/" + ID + "/" + tip,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      let pom = 0;
      const transformedData = data.map(function (d) {
        if (d.shown == false && d.tip !== "K") pom++;
      });
      setNum(pom);
      localStorage.setItem("messageNumber", pom);
    }
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onClickHandler = (type) => {
    let path = type;
    history.push(path);
    setAnchorElNav(null);
  };

  const onClickCart = (type) => {
    let token = localStorage.getItem("Token");
    let korisnik = ExtractData(token, "role");
    if (korisnik != null) {
      let path = type;
      history.push(path);
    } else {
      setOpenWarning(true);
    }
  };
  const onClickProfile = (type) => {
    if (type === "Profile") {
      let tok = localStorage.getItem("Token");
      console.log(tok);
      let flag;
      if (tok == null) {
        flag = null;
      } else {
        flag = ExtractData(tok, "role");
      }
      if (flag === null) {
        let path = "Prijava";
        history.push(path);
      } else if (flag === "P") {
        let path = "ProfilDomacinstvo";
        history.push(path);
      } else if (flag === "K") {
        let path = "ProfilKorisnik";
        history.push(path);
      } else if (flag === "D") {
        let path = "ProfilDostavljac";
        history.push(path);
      }
    }
    if (type === "Logout") {
      const token = localStorage.getItem("Token");
      localStorage.removeItem("Token");
      let tip = ExtractData(token, "role");
      localStorage.setItem("messageNumber", 0);
      if (tip === "K") {
        let idKorisnika = ExtractData(token, "serialnumber");
        // const idKorisnika = JSON.parse(localStorage.getItem("KorisnikID"));
        fetch(
          "https://localhost:5001/Narudzbine/ObrisiNarudzbine/" + idKorisnika,
          {
            method: "DELETE",
            body: JSON.stringify({ title: "Uspesno dodatno" }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        ).then(emptyCart());
      }

      let path = "Naslovna";
      history.push(path);
      window.location.reload(false); //REFRESH PAGE
    }
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const onClickMailBox = () => {
    const token = localStorage.getItem("Token");
    if (token != null) {
      let path = "Inbox";
      history.push(path);
      console.log("Inbox");
    } else {
      setOpenWarning(true);
    }
  };

  const items = () => {
    const token = localStorage.getItem("Token");
    let flag = null;
    if (token != null) {
      flag = ExtractData(token, "role");
    }
    if (flag === "" || flag === null) {
      return HeaderItems;
    }
    if (flag === "K") {
      return HeaderItems;
    } else if (flag === "P") {
      /* let path = "Domacinstvo";
        history.push(path); */
      return HeaderItemsDomacinstvo;
    } else if (flag === "D") {
      return HeaderItemsDostavljac;
    }
  };

  return (
    <AppBar position="static" sx={{ background: "#4E944F" }}>
      <div>
        {openWarning && (
          <WarningModal show={openWarning} onClose={handleCloseWarning} />
        )}
      </div>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              //color: "inherit",
              color: "#4E944F",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width="200" height="80" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {items().map((page) => (
                <MenuItem
                  key={page.route}
                  onClick={() => onClickHandler(page.route)}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width="200" height="80" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {items().map((page) => (
              <React.Fragment key={page.label}>
                <Button
                  key={page.id}
                  onClick={() => onClickHandler(page.route)}
                  className={classes.button}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.label}
                </Button>
              </React.Fragment>
            ))}
          </Box>
          {korisnikIsLoggedIn && crt && (
            <Box sx={{ color: "black", marginRight: "1%" }}>
              <Button
                sx={{ color: "white" }}
                onClick={() => onClickCart("Cart")}
              >
                <CartBox />
              </Button>
            </Box>
          )}

          {isValid && mess && (
            <Box sx={{ color: "black", marginRight: "2%" }}>
              <Button sx={{ color: "white" }} onClick={onClickMailBox}>
                <MailBox number={num} />
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Otvori profil">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profileAvatar == false ? (
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                ) : dom == false ? (
                  <Avatar
                    alt=""
                    //src="/static/images/avatar/2.jpg"
                    {...stringAvatar(word1 + " " + word2)}
                  />
                ) : (
                  <Avatar
                    alt=""
                    //src="/static/images/avatar/2.jpg"
                    {...stringAvatar(word1 + " " + word2)}
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    onClickProfile(setting);
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    //</div>
  );
};

export default ResponsiveAppBar;
