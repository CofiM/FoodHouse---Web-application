const CheckBox = ({ label, value, onChange }) => {
    return (
      <div>
      <div>
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
      </div>
      </div>
    );
  };
  export default CheckBox;