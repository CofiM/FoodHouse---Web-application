import { useState } from 'react';
import classes from "./ProfileDostavljac.module.css";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import UpdateProfileKorisnik from "./UpdateProfileKorisnik";
import DesignProfileKorisnik from "./DesignProfileKorisnik";
import { useEffect } from "react";


const ProfilDomacinstvo = () => {
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
          const id = localStorage.getItem("KorisnikID");
          const response = await fetch("https://localhost:5001/Korisnik/PreuzetiKorisnika/"+id,{
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
                </div>
           </div>
           <div className={classes.medium}>
                <Stack spacing={30} direction="row">
                    <Button variant="text" sx={{color:"black"}} onClick={onClickProfileHandler} >Profil</Button>
                    <Button variant="text" sx={{color:"black"}} onClick={onClickUpdateProfileHandler} >Izmeni profil</Button>
                    <Button variant="text" sx={{color:"black"}}> Istorija kupovina </Button>
                </Stack>
           </div>
           <div className={classes.mainPart}>
                { isShowProfile &&
                    <DesignProfileKorisnik 
                    Ime={data.ime} 
                    Prezime={data.prezime}
                    Username={data.username} 
                    Email={data.email}
                    Adresa = {data.adresa}
                    />
                }
                { isShowUpdateProfile && 
                    <UpdateProfileKorisnik 
                        Ime={data.ime} 
                        Prezime={data.prezime}
                        Username={data.username} 
                        Email={data.email}
                        Adresa = {data.adresa}
                    /> 
                }
           </div>
       </div>
    );

};


export default ProfilDomacinstvo;