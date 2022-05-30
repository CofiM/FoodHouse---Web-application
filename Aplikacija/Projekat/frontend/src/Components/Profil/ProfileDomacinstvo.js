import { useState } from "react";
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateProfileDomacinstvo from "./UpdateProfileDomacinstvo";
import DesignProfileDomacinstvo from "./DesignProfileDomacinstvo";
import { useEffect } from "react";

const ProfilDomacinstvo = () => {
  const [isShowProfile, setIsShowProfile] = useState(true);
  const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const onClickProfileHandler = () => {
    setIsShowProfile(true);
    setIsShowUpdateProfile(false);
    
  };

  const onClickUpdateProfileHandler = () => {
    setIsShowProfile(false);
    setIsShowUpdateProfile(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const id = localStorage.getItem("DomacinstvoID");
      const response = await fetch("https://localhost:5001/Domacinstvo/PreuzmiDomacinstvo/"+id,{
        method: 'GET',
        headers: {
          'Content-type': 'application/json;charset=UTF-8'
        }
      });
      const data = await response.json();
      setData(data);

      const myArray = data.otvorenaVrata.split("T");
      let datum = myArray[0];
      setDate(datum);
    }
    fetchProfile();
  }, []) 

  return (
    <div className={classes.mainStyle}>
      <div className={classes.profileHeader}>
        <div className={classes.logoHeader}>
          <AccountCircleRoundedIcon
            fontSize="large"
            sx={{ height: "100px", width: "100px" }}
          />
        </div>
        <div className={classes.infHeader}>
          <p>{data.naziv}</p>
          <p></p>
        </div>
      </div>
      <div className={classes.medium}>
        <Stack spacing={30} direction="row">
          <Button
            variant="text"
            sx={{ color: "black" }}
            onClick={onClickProfileHandler}
          >
            Profil
          </Button>
          <Button
            variant="text"
            sx={{ color: "black" }}
            onClick={onClickUpdateProfileHandler}
          >
            Izmeni profil
          </Button>
        </Stack>
      </div>
      <div className={classes.mainPart}>
        {isShowProfile && (
          <DesignProfileDomacinstvo
            Naziv={data.naziv}
            Username={data.username}
            Email={data.email}
            Adresa={data.adresa}
            Telefon={data.telefon}
            Datum={date}
          />
        )}
        {isShowUpdateProfile && 
        
          <UpdateProfileDomacinstvo 
            Naziv={data.naziv}
            Username={data.username}
            Email={data.email}
            Adresa={data.adresa}
            Telefon={data.telefon}
            Datum={date}
          />}
      </div>
    </div>
  );
};

export default ProfilDomacinstvo;
