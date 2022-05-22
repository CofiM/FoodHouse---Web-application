import Logo from "../../pictures/logo.png";
import classes from "./HigherBar.module.css";
const HigherBar = () => {

    return(
        <div className={classes.higherBar}>
            <div >
                <img src={Logo} alt="Logo" width="200" height="100"/>
            </div>
            <div>
                <label>foodhouse@gmail.com</label>
            </div>
        </div>
    );
};

export default HigherBar;