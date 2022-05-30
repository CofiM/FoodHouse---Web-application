import React from "react";
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
import DodajPosao from "./Components/Poslovi/DodajPosao";
import Dostavljaci from "./Main/Dostavljaci";
import Inbox from "./Components/MailBox/Inbox";
import Cart from "./Components/Korpa/Cart";

import Proizvod from "./Components/Proizvod/Proizvod";

import ProfilDostavljac from "./Components/Profil/ProfileDostavljac";
import ProfilDomacinstvo from "./Components/Profil/ProfileDomacinstvo";

import ProfilKorisnik from "./Components/Profil/ProfileKorisnik";
import Domacinstvo from "./Main/Domacinstvo";
import ViewProducts from "./Main/ViewProducts";
import ViewProductsName from "./Main/ViewProductsName";


function App() {

  const onChangeHandler = () => {
    
  }

  return (
    <div className="App">
      <div className="App-header">
        <Header onChange="onChangeHandler"/>
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
              <Proizvod />
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

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;
