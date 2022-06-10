import classes from "./LowerBar.module.css";
import { useHistory } from "react-router-dom";
const LowerBar = () => {

    let history = useHistory();
    const pravilaHandler = () => {
        let path="Pravila";
        history.push(path);
    }
    const koriscenjeHandler = () => {
        let path="uslovi-koriscenja";
        history.push(path);
    }

    return (
        <div className={classes.lowerBar}>
            <div>
                <label>© 2022 Food House. Sva prava zadržana</label>
            </div>
            <div className={classes.leftSide}>
                <label onClick={koriscenjeHandler}>Uslovi korišćenja | </label>
                <label onClick={pravilaHandler} className={classes.dugme}>Pravila</label>
            </div>
        </div>
    );
};

export default LowerBar; 