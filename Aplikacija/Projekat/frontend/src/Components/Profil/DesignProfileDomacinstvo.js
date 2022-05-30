import classes from "./DesignProfileDomacinstvo.module.css";

const DesignProfileDomacinstvo = (props) => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.wrap}>
        <div className={classes.labelLeft}>
          <label>Naziv:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Naziv}</label>
        </div>
        <div className={classes.labelLeft}>
          <label>Username:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Username}</label>
        </div>
        <div className={classes.labelLeft}>
          <label>E-mail:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Email}</label>
        </div>
        <div className={classes.labelLeft}>
          <label>Adresa:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Adresa}</label>
        </div>
        <div className={classes.labelLeft}>
          <label>Broj telefona:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Telefon}</label>
        </div>
        <div className={classes.labelLeft}>
          <label>Datum otvorenih vrata:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Datum}</label>
        </div>
      </div>
    </div>
  );
};

export default DesignProfileDomacinstvo;
