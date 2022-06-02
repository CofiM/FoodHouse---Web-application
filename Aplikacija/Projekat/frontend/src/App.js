import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import Poslovi from "./Main/Poslovi";
import Domacinstva from "./Main/Domacinstva";
import Naslovna from "./Main/Naslovna";
import Footer from "./Footer/Footer";
import NotFound from "./Main/NotFound";
import Prijava from "./Components/Profil/Prijava";
import Registracija from "./Components/Profil/Registracija";
import HouseHoldView from "./Components/Domacinstvo/HouseholdView";
import DodajPosao from "./Components/Poslovi/DodajPosao";
import Dostavljaci from "./Main/Dostavljaci";
import ViewProducts from "./Main/ViewProducts";
import Domacinstvo from "./Main/Domacinstvo";
import ViewProductsName from "./Main/ViewProductsName";
import ViewProductsStrict from "./Main/ViewProductsStrict";
import Inbox from "./Components/MailBox/Inbox";
import Cart from "./Components/Korpa/Cart";
import ProbaZaOcenjivanje from "./Main/ProbaZaOcenjivanje";

import { CartProvider } from 'react-use-cart';
import Proizvod from "./Components/Proizvod/Proizvod";
import ProfilDostavljac from "./Components/Profil/ProfileDostavljac";
import ProfilDomacinstvo from "./Components/Profil/ProfileDomacinstvo";
import ProfilKorisnik from "./Components/Profil/ProfileKorisnik";
import { CartProvider, useCart } from "react-use-cart";

function App() {
  // const [cart, setCart] = useState([]);

  // const handleClick = (item) => {
  //   if (cart.indexOf(item) !== -1) return;
  //   setCart([...cart, item]);
  // };

  // const handleChange = (item, d) => {
  //   const ind = cart.indexOf(item);
  //   const arr = cart;
  //   arr[ind].amount += d;

  //   if (arr[ind].amount === 0) arr[ind].amount = 1;
  //   setCart([...arr]);
  // };

  return (
    <CartProvider>
      <div className="App">
        <div className="App-header">
          <Header onChange="onChangeHandler" />
        </div>
        <div className="App-main">
          <main className="Main">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/Naslovna" />
              </Route>
              <Route path="/Naslovna">
                <Naslovna />
              </Route>
              <Route path="/Domaćinstva">
                <Domacinstva />
              </Route>
              <Route path="/Poslovi">
                <Poslovi />
              </Route>
              <Route path="/Poslovi">
                <Poslovi />
              </Route>
              <Route path="/Prijava">
                <Prijava />
              </Route>
              <Route path="/Registracija">
                <Registracija />
              </Route>
              <Route path="/dodajPosao">
                <DodajPosao />
              </Route>
              <Route path="/Dostavljaci">
                <Dostavljaci />
              </Route>
              <Route path="/Inbox">
                <Inbox />
              </Route>
              <Route path="/Proizvod">
                <Proizvod />
              </Route>
              <Route path="/Cart">
                <Cart />
              </Route>
              <Route path="/ProfilDostavljac">
                <ProfilDostavljac />
              </Route>
              <Route path="/ProfilDomacinstvo">
                <ProfilDomacinstvo />
              </Route>
              <Route path="/ProfilKorisnik">
                <ProfilKorisnik />
              </Route>
              <Route path="/Domaćinstvo">
                <Domacinstvo />
              </Route>
              <Route path="/ViewProducts">
                <ViewProducts />
              </Route>
              <Route path="/ViewProductsName">
                <ViewProductsName />
              </Route>
              <Route path="/ProbaZaOcenjivanje">
                <ProbaZaOcenjivanje />
              </Route>
              <Route path="/ViewProductsStrict">
                <ViewProductsStrict />
              </Route>
<<<<<<< HEAD
              <Route path="/HouseHoldView">
                <HouseHoldView />
              </Route>
=======
              <Route path="/HouseholdView">
                <HouseholdView />
              </Route>
              <Route path="/ViewJobsLocation">
                <ViewJobsLocation />
              </Route>
              <Route path="/ViewJobsDate">
                <ViewJobsDate />
              </Route>
              <Route path="/ViewJobsDateLocation">
                <ViewJobsDateLocation />
              </Route>



>>>>>>> 3b088597a622ddd27f0a7df7911fcce9e92c29a8
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </main>
        </div>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
