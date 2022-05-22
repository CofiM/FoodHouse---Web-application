import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header/Header"
import './App.css';
import Poslovi from "./Main/Poslovi";
import Domacinstva from "./Main/Domacinstva";
import Naslovna from "./Main/Naslovna";
import Footer from "./Footer/Footer";
import NotFound from "./Main/NotFound";

function App() {
  /* const [posloviIsShown, setPosloviIsShown] = useState(false);
  const [naslovnaIsShown, setNaslovnaIsShown] = useState(true);
  const [domacinstvoIsShown, setDomacinstvoIsShown] = useState(false); */

  

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
