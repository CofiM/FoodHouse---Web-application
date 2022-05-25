import classes from "./ProfilDostavljac.module.css";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const ProfilDostavljac = () => {
    
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
                    <p>Lazar Najdanovic</p>
                </div>
           </div>
           <div>
               <p>Nesto</p>
           </div>
       </div>
    );

};


export default ProfilDostavljac;