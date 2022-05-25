import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Logo from "../pictures/logo.png";
import { useHistory } from 'react-router-dom';
import classes from "./Header.module.css";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { HeaderItems } from "./HeaderComponentsKorisnik";
import { HeaderItemsDostavljac } from "./HeaderComponentsDostavljac";
import { HeaderItemsDomacinstvo } from "./HeaderComponentsDomacinstvo";
import MailBox from "../Components/MailBox/MailBox";

const settings = ['Profile', 'Logout'];

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const history = useHistory();
    const [korisnikIsLoggedIn, setKorisnikIsLoggedIn] = React.useState(true);
    const [isValid, setIsValid] = React.useState(true);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
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
      let path=type;
      history.push(path);
      setAnchorElNav(null);
    }

    const onClickCart = (type) => {
      let path = type;
      history.push(path);
    }

    const onClickProfile = (type) => {
      if( type === "Profile")
      {
        let path = "Prijava";
        history.push(path);
      }
      
      setAnchorElUser(null);
    }

    const onClickMailBox = () => {
        let path = "Inbox";
        history.push(path);
        console.log("Inbox");
    }

    const items = () => {
      // const flag = localStorage.getItem("Klijent");
      // if(flag === 0){
      //   return HeaderItems;
      // }
      // else if( flag === 1){
      //   return HeaderItemsDomacinstvo;
      // }
      // else if( flag === 2)
      // {
      //   return HeaderItemsDostavljac;
      // }
      return HeaderItems;
    }
    


    return (
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
                <img src={Logo} alt="Logo" width="200" height="80"/>
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {items().map((page) => (
                  <MenuItem 
                  key={page.id} 
                  onClick={() => onClickHandler(page.label)}
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
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <img src={Logo} alt="Logo" width="200" height="80"/>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {items().map((page) => (
                  <React.Fragment>
                    <Button
                    key={page.id}
                    onClick={() => onClickHandler(page.label)}
                    className={classes.button}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      {page.label}
                    </Button>
                  </React.Fragment>
              ))}
            </Box>
            {korisnikIsLoggedIn && <Box sx={{color:"black", marginRight:'1%'}}>
              <Button 
                sx={{color:'white'}}
                onClick= {() => onClickCart("Korpa")}
              >
                  <ShoppingCartOutlinedIcon/>
              </Button>
            </Box>}

            
            {isValid && <Box sx={{color:"black", marginRight:'2%'}}>
                <Button
                  sx={{color:'white'}}
                  onClick={onClickMailBox}
                >
                    <MailBox number="1" />
                </Button>
            </Box>}


            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {onClickProfile(setting)}}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
};


export default ResponsiveAppBar;
