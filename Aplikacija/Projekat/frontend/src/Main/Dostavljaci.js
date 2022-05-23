import DostavljaciCard from "../Components/Dostavljac/DostavljacCard";

const Dostavljaci = () => {
    return(
        <div>
            <DostavljaciCard 
            ime="Malke" 
            email="Malke@gmail.com" 
            cena="11000" 
            telefon="01820321"
            /> 
        </div>
    );
};

export default Dostavljaci;