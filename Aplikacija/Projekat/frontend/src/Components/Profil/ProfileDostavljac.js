import { useState } from "react";
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateProfile from "./UpdateProfileDostavljac";
import DesignProfile from "./DesignProfileDostavljac";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { ExtractData } from "../../helper/extract";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "#ccc4c5",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ProfilDostavljac = () => {
  const [isShowProfile, setIsShowProfile] = useState(true);
  const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(false);
  const [data, setData] = useState([]);

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
<<<<<<< HEAD
      console.log(token);
      const id = ExtractData(token, "serialnumber");
=======
      const id = ExtractData(token,"serialnumber");
>>>>>>> 24c3a8e5137324fbf782aed1e4d1edcf2fda564a
      const response = await fetch(
        "https://localhost:5001/Dosavljac/PreuzmiDostavljac/" + id,
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
    };
    fetchProfile();
  }, []);

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
        </Stack>
      </div>
      <div className={classes.mainPart}>
        {isShowProfile && (
          <DesignProfile
            Ime={data.ime}
            Prezime={data.prezime}
            Username={data.username}
            Email={data.email}
            Cena={data.cena}
            Telefon={data.telefon}
          />
        )}
        {isShowUpdateProfile && (
          <UpdateProfile
            Ime={data.ime}
            Prezime={data.prezime}
            Username={data.username}
            Email={data.email}
            Cena={data.cena}
            Telefon={data.telefon}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilDostavljac;
