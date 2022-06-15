import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header";
import "./App.css";
import Poslovi from "./Components/Domacinstvo/JobsView";
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
import Domacinstvo from "./Components/Domacinstvo/HouseholdView";
import JednoDomacinstvo from "./Main/Domacinstvo";
import ViewProductsName from "./Main/ViewProductsName";
import ViewProductsStrict from "./Main/ViewProductsStrict";
import ViewJobsLocation from "./Components/Poslovi/ViewJobsLocation";
import Inbox from "./Components/MailBox/Inbox";
import Cart from "./Components/Korpa/Cart";

import Proizvod from "./Components/Proizvod/Proizvod";
import ProfilDostavljac from "./Components/Profil/ProfileDostavljac";
import ProfilDomacinstvo from "./Components/Profil/ProfileDomacinstvo";

import ProfilKorisnik from "./Components/Profil/ProfileKorisnik";

import HouseholdView from "./Components/Domacinstvo/HouseholdView";
import ViewJobsDate from "./Components/Poslovi/ViewJobsDate";
import ViewJobsDateLocation from "./Components/Poslovi/ViewJobsDateLocation";
import Posao from "./Main/Poslovi";
import Narudzbine from "./Components/Narudzbina/Narudzbina";
import IstorijaKupovina from "./Components/Kupovina/IstorijaKupovina";
import { CartProvider } from "react-use-cart";
import UsloviKoriscenja from "./Footer/UsloviKoriscenja";
import Pravila from "./Footer/Pravila";
import O_nama from "./Main/O_nama";

function App() {
  let user = localStorage.getItem("Korisnik");
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
              {(user === null || user === "K") && (
                <Route path="/Naslovna">
                  <Naslovna />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/domacinstva">
                  <Domacinstva />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/Posao">
                  <Posao />
                </Route>
              )}
              {user === null && (
                <Route path="/Prijava">
                  <Prijava />
                </Route>
              )}
              {user === null && (
                <Route path="/Registracija">
                  <Registracija />
                </Route>
              )}
              {user === "P" && (
                <Route path="/dostavljaci">
                  <Dostavljaci />
                </Route>
              )}
              {user !== null && (
                <Route path="/Inbox">
                  <Inbox />
                </Route>
              )}
              {user === "K" && (
                <Route path="/Proizvod">
                  <Proizvod />
                </Route>
              )}
              {user === "K" && (
                <Route path="/Cart">
                  <Cart />
                </Route>
              )}
              {user === "D" && (
                <Route path="/ProfilDostavljac">
                  <ProfilDostavljac />
                </Route>
              )}
              {user === "P" && (
                <Route path="/ProfilDomacinstvo">
                  <ProfilDomacinstvo />
                </Route>
              )}
              {user === "K" && (
                <Route path="/ProfilKorisnik">
                  <ProfilKorisnik />
                </Route>
              )}
              {user === "P" && (
                <Route path="/domacinstvo">
                  <Domacinstvo />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewProducts">
                  <ViewProducts />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewProductsName">
                  <ViewProductsName />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewProductsStrict">
                  <ViewProductsStrict />
                </Route>
              )}
              {user === "P" && (
                <Route path="/HouseHoldView">
                  <HouseHoldView />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewJobsLocation">
                  <ViewJobsLocation />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewJobsDate">
                  <ViewJobsDate />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/ViewJobsDateLocation">
                  <ViewJobsDateLocation />
                </Route>
              )}
              {user === "P" && (
                <Route path="/poslovi">
                  <Poslovi />
                </Route>
              )}
              {(user === null || user === "K") && (
                <Route path="/jednoDomacinstvo">
                  <JednoDomacinstvo />
                </Route>
              )}
              {user === "D" && (
                <Route path="/narudzbine">
                  <Narudzbine />
                </Route>
              )}
              {user === "K" && (
                <Route path="/IstorijaKupovina">
                  <IstorijaKupovina />
                </Route>
              )}
              <Route path="/uslovi-koriscenja">
                <UsloviKoriscenja />
              </Route>
              <Route path="/Pravila">
                <Pravila />
              </Route>
              <Route path="/o-nama">
                <O_nama />
              </Route>
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
