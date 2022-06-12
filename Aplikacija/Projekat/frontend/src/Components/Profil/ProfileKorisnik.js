import { useState } from "react";
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import UpdateProfileKorisnik from "./UpdateProfileKorisnik";
import DesignProfileKorisnik from "./DesignProfileKorisnik";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

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
      const id = localStorage.getItem("KorisnikID");
      const response = await fetch(
        "https://localhost:5001/Korisnik/PreuzetiKorisnika/" + id,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json;charset=UTF-8",
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
