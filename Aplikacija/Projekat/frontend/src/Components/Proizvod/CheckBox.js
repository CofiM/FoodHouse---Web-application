import classes from "./CheckBox.module.css";


const CheckBox = ({ label, value, onChange }) => {
    return (
      <div className={classes.mainPart}>
      <div>
      <label>
        <input type="checkbox" checked={value} className={classes.largerCheckbox} onChange={onChange} />
        {label}
      </label>
      </div>
      </div>
    );
  };
  export default CheckBox;