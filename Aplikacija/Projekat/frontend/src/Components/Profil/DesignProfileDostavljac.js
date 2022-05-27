import classes from "./DesignProfile.module.css";
const DesignProfile = (props) => {

    return(
        <div className={classes.mainDesign}>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>Ime:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Ime}</label>
                </div>
            </div>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>Prezime:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Prezime}</label>
                </div>
            </div>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>Username:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Username}</label>
                </div>
            </div>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>E-mail:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Email}</label>
                </div>
            </div>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>Cena usluga:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Cena}</label>
                </div>
            </div>
            <div className={classes.divDesign}>
                <div className={classes.labelLeft}>
                    <label>Broj telefona:</label>
                </div>
                <div className={classes.labelRight}>
                    <label>{props.Telefon}</label>
                </div>
            </div>
        </div>
    );


};

export default DesignProfile;