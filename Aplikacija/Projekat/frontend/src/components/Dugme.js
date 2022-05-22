import React from "react";

function Dugme() {
  function fun() {
    console.log("cao");
  }
  return (
    <div>
      <button onClick={fun}>Klikni</button>
    </div>
  );
}

export default Dugme;
