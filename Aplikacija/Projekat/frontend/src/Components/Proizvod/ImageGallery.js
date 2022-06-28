import { useEffect, useState } from "react";
import classes from "./ImageGallery.module.css";

const ImageGallery = (props) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [imageArray, setImageArray] = useState(null);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("Token");


  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://localhost:5001/FileUpload/" + props.IdSlike,
        {Authorization: `Bearer ${token}`}
      );
      const data = await response.json();
      console.log(data);
      setImageArray(data);
      setShow(true);
      data.map((item) => setSelectedImg(item));
    }
    fetchData();
    console.log(selectedImg);
    console.log(imageArray);
    console.log(show);
    console.log(props.IdSlike);
  }, []);
  if (show == true) {
    return (
      <div className={classes.container}>
        <img
          src={"data:image/png;base64," + selectedImg}
          alt="Selected"
          className={classes.selected}
        />
        <div className={classes.imgContainer}>
          {/* {show &&
            imageArray.map((img, index) => (
              <img
                className={classes.image}
                style={{ border: selectedImg === img ? "4px solid blue" : "" }}
                key={index}
                src={"data:image/png;base64," + img}
                onClick={() => setSelectedImg(img)}
              />
            ))} */}
        </div>
      </div>
    );
  } else {
    <p>loading...</p>;
  }
};

export default ImageGallery;
