import React from "react";

function InputText(props) {
  return (
    <div>
      <label>{props.label}:</label>
      <input type="text" placeholder={props.placeholder} />
    </div>
  );
}

export default InputText;
