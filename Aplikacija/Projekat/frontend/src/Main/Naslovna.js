import React from 'react';

import Pretraga from '../Pretraga/Pretraga';
import classes from "./Pretraga.module.css";

const Naslovna=()=>
{
    return (
        <div className={classes.container}>
            <div className={classes.pretragaDiv}>
            <div><h1>Pronađite svog omiljenog domaćina</h1></div>
           <div> <Pretraga></Pretraga></div> 
           <div  ></div>

            </div>


        </div>
    );
};

export default Naslovna;