import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header"
import './App.css';
import Poslovi from "./Main/Poslovi";
import Domacinstva from "./Main/Domacinstva";
import Naslovna from "./Main/Naslovna";
import Footer from "./Footer/Footer";
import NotFound from "./Main/NotFound";
import Prijava from "./Components/Profil/Prijava";
import Registracija from "./Components/Profil/Registracija";
import Korpa from "./Components/Korpa/Korpa";
import DodajPosao from "./Components/Poslovi/DodajPosao";
import Dostavljaci from "./Main/Dostavljaci";


function App() { 

  return (
    <div className="App">
      <div className="App-header"> 
        <Header/> 
      </div>
       <div className="App-main">
        <main className="Main" >
          <Switch>
          <Route path='/' exact>
              <Redirect to="/Naslovna" />
            </Route>
            <Route path='/Naslovna'>
              <Naslovna />
            </Route>
            <Route path='/Domaćinstva'>
              <Domacinstva/>
            </Route>
            <Route path='/Poslovi'>
              <Poslovi/>
            </Route>
            <Route path='/Poslovi'>
              <Poslovi/>
            </Route>
            <Route path='/Prijava'>
              <Prijava/>
            </Route>
            <Route path='/Registracija'>
              <Registracija/>
            </Route>
            <Route path='/Korpa'>
              <Korpa/>
            </Route>
            <Route path='/dodajPosao'>
              <DodajPosao/>
            </Route>
            <Route path='/Dostavljaci'>
              <Dostavljaci/>
            </Route>
            <Route path='*'>
              <NotFound/>
            </Route>
          </Switch>
        </main>
      </div>
      <div className="App-footer">
        <Footer/>
      </div>
    </div>
  );
}

export default App;
