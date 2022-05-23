import * as React from 'react';
import InputText from '../UI/InputText';

const DodajPosao = () => {
    const today = new Date();
    const date = today.setDate(today.getDate()); 


    return (
        <React.Fragment >
            <div>
                <InputText label="Naziv" placeholder="Naziv" />
            </div>
            <div>
                <label> Broj radnih mesta: </label>
                <input type="number"></input>
            </div>
            <div>
                <label> Datum početka posla: </label>
                <input type="date" defaultValue={date} min="2022-01-01" max="2022-12-31"></input>
            </div>
            <div>
                <label> Opis: </label>
                <input type="text"></input>
            </div>
            <div>
                <label> Zarada: </label>
                <input type="text"></input>
            </div>
            <div>
                <button>Dodaj</button>
            </div>
        </React.Fragment>
    );
};

export default DodajPosao;
