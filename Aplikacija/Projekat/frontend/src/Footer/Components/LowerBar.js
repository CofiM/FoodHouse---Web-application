import classes from "./LowerBar.module.css";

const LowerBar = () => {
    return (
        <div className={classes.lowerBar}>
            <div>
                <label>© 2022 Food House. Sva prava zadržana</label>
            </div>
            <div>
                <label>Uslovi korišćenja | Pravila </label>
            </div>
        </div>
    );
};

export default LowerBar; 