import { useState } from "react";
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateProfileDomacinstvo from "./UpdateProfileDomacinstvo";
import DesignProfileDomacinstvo from "./DesignProfileDomacinstvo";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { ExtractData } from "../../helper/extract";
import AuthContext from "../../helper/auth-context";
import { useContext } from "react";

function stringAvatar(name) {
  console.log(name);
  return {
    sx: {
      bgcolor: "#ccc4c5",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const ProfilDomacinstvo = () => {
  const [isShowProfile, setIsShowProfile] = useState(true);
  const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
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
      let token = localStorage.getItem("Token");
      console.log(token);
      const id = ExtractData(token, "serialnumber");
      console.log(id);
      const response = await fetch(
        "https://localhost:5001/Domacinstvo/PreuzmiDomacinstvo/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setData(data);
      setWord1(data.naziv.split(" ")[0][0]);
      setWord2(data.naziv.split(" ")[1][0]);

      const myArray = data.otvorenaVrata.split("T");
      let datum = myArray[0];
      setDate(datum);
      setIsLoaded(true);
    };
    fetchProfile();
  }, []);
  if (!isLoaded) {
    return <div className={classes.Loading}>Loading...</div>;
  }
  return (
    <div className={classes.mainStyle}>
      <div className={classes.profileHeader}>
        <div className={classes.logoHeader}>
          <Avatar
            {...stringAvatar(word1 + " " + word2)}
            sx={{ width: 90, height: 90, fontSize: 40, m: 2 }}
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
            sx={{ color: "#070E59" }}
            onClick={onClickProfileHandler}
          >
            Profil
          </Button>
          <Button
            variant="text"
            sx={{ color: "#070E59" }}
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
        {isShowUpdateProfile && (
          <UpdateProfileDomacinstvo
            Naziv={data.naziv}
            Username={data.username}
            Email={data.email}
            Adresa={data.adresa}
            Telefon={data.telefon}
            Datum={date}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilDomacinstvo;
