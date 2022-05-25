import classes from "./Footer.module.css";
import LowerBar from "./Components/LowerBar";
import HigherBar from "./Components/HigherBar";

const Footer = () => {
    return(
        <footer className={classes.footer}>
            <div className={classes.footerLow}>
                <LowerBar />
            </div>
        </footer>
    );
};

export default Footer;