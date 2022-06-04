import classes from "./DesignProfileKorisnik.module.css";
const DesignProfile = (props) => {
  return (
    <div className={classes.mainDesign}>
      <div className={classes.wrap}>
        <div className={classes.labelLeft}>
          <label>Ime:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Ime}</label>
        </div>

        <div className={classes.labelLeft}>
          <label>Prezime:</label>
        </div>
        <div className={classes.labelRight}>
          <label>{props.Prezime}</label>
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
      </div>
    </div>
  );
};

export default DesignProfile;
