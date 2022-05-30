import { useState } from 'react';
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UpdateProfile from "./UpdateProfileDostavljac";
import DesignProfile from "./DesignProfileDostavljac";
import { useEffect } from "react";


const ProfilDostavljac = () => {
    const [isShowProfile, setIsShowProfile] = useState(true);
    const [isShowUpdateProfile, setIsShowUpdateProfile] = useState(false);
    const [data, setData] = useState([]);

    const onClickProfileHandler = () => {
        setIsShowProfile(true);
        setIsShowUpdateProfile(false);
    }

    const onClickUpdateProfileHandler = () => {
        setIsShowProfile(false);
        setIsShowUpdateProfile(true);
    }

    useEffect(() => {
        const fetchProfile = async () => {
          const id = localStorage.getItem("DostavljacID");
          const response = await fetch("https://localhost:5001/Dosavljac/PreuzmiDostavljac/"+id,{
            method: 'GET',
            headers: {
              'Content-type': 'application/json;charset=UTF-8'
            }
          });
          const data = await response.json();
          setData(data);
        }
        fetchProfile();
      }, [])

    return(
       <div className={classes.mainStyle}>
           <div className={classes.profileHeader}>
                <div className={classes.logoHeader}>
                    <AccountCircleRoundedIcon 
                        fontSize="large"
                        sx={{height:"100px", width:"100px"}}
                    />
                </div>
                <div className={classes.infHeader}>
                    <p>{data.ime}</p>
                    <p>{data.prezime}</p>
                    <p>Ovde da stavimo zivotni moto svakog coveka</p>
                </div>
           </div>
           <div className={classes.medium}>
                <Stack spacing={30} direction="row">
                    <Button variant="text" sx={{color:"black"}} onClick={onClickProfileHandler} >Profil</Button>
                    <Button variant="text" sx={{color:"black"}} onClick={onClickUpdateProfileHandler} >Izmeni profil</Button>
                </Stack>
           </div>
           <div className={classes.mainPart}>
                { isShowProfile &&
                    <DesignProfile 
                        Ime={data.ime} 
                        Prezime={data.prezime} 
                        Username={data.username} 
                        Email={data.email} 
                        Cena={data.cena}
                        Telefon={data.telefon}
                    />
                }
                { isShowUpdateProfile && 
                    <UpdateProfile 
                        Ime={data.ime} 
                        Prezime={data.prezime} 
                        Username={data.username} 
                        Email={data.email} 
                        Cena={data.cena}
                        Telefon={data.telefon}
                    />
                }
           </div>
       </div>
    );

};


export default ProfilDostavljac;