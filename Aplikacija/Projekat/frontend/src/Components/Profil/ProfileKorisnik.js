import { useState, useContext } from "react";
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateProfileKorisnik from "./UpdateProfileKorisnik";
import DesignProfileKorisnik from "./DesignProfileKorisnik";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
<<<<<<< HEAD
import { ExtractData } from "../../helper/extract";
=======
import AuthContext from "../../helper/auth-context";
import { ExtractData } from "../../helper/extract.js";
>>>>>>> 24c3a8e5137324fbf782aed1e4d1edcf2fda564a

function stringAvatar(name) {
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
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);


  const onClickProfileHandler = () => {
    setIsShowProfile(true);
    setIsShowUpdateProfile(false);
  };

  const onClickUpdateProfileHandler = () => {
    setIsShowProfile(false);
    setIsShowUpdateProfile(true);
  };

  const onClickIstorijaKupovinaHandler = () => {
    let path = "IstorijaKupovina";
    history.push(path);
  };

  useEffect(() => {
    const fetchProfile = async () => {
<<<<<<< HEAD
      let token = localStorage.getItem("Token");
      console.log(token);
      const id = ExtractData(token, "serialnumber");
=======

      let token = localStorage.getItem("Token");
      const id = ExtractData(token, "serialnumber");
      console.log(id);
>>>>>>> 24c3a8e5137324fbf782aed1e4d1edcf2fda564a
      const response = await fetch(
        "https://localhost:5001/Korisnik/PreuzetiKorisnika/" + id,
        {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setData(data);
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
            {...stringAvatar(data.ime + " " + data.prezime)}
            sx={{ width: 90, height: 90, fontSize: 40, m: 2 }}
          />
        </div>
        <div className={classes.infHeader}>
          <p>{data.ime + " " + data.prezime}</p>
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
          <Button
            variant="text"
            sx={{ color: "#070E59" }}
            onClick={onClickIstorijaKupovinaHandler}
          >
            {" "}
            Istorija kupovina{" "}
          </Button>
        </Stack>
      </div>
      <div className={classes.mainPart}>
        {isShowProfile && (
          <DesignProfileKorisnik
            Ime={data.ime}
            Prezime={data.prezime}
            Username={data.username}
            Email={data.email}
            Adresa={data.adresa}
          />
        )}
        {isShowUpdateProfile && (
          <UpdateProfileKorisnik
            Ime={data.ime}
            Prezime={data.prezime}
            Username={data.username}
            Email={data.email}
            Adresa={data.adresa}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilDomacinstvo;
