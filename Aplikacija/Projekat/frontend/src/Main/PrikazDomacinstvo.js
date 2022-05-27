import React from "react";

const PrikazDomacinstvo=(props)=>
{

    return(
        <div>
            <div> {props.nazivDomacinstva} </div>
            <div> {props.adresa} </div>
            <div> {props.brojTelefona} </div>
            
        </div>
    );

};

export default PrikazDomacinstvo;