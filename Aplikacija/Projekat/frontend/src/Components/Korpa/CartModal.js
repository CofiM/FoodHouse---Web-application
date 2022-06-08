import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import classes from "./CartModal.module.css";
import {useCart} from 'react-use-cart';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(props.show);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    console.log(props.dost);
  const{cartTotal}=useCart();

  let sab1 = {cartTotal}.cartTotal;
  let sab2 = +props.dost;
  let zbir = sab1 + sab2;
  console.log(sab1);
  console.log(sab2);
  console.log(zbir);

  //podaci za kupovinu
  const idKorisnika = localStorage.getItem("KorisnikID");
  const ImeKorisnika = localStorage.getItem("ImeKorisnika");
  const MailKorisnika = localStorage.getItem("MailKorisnika");

  // async function PrihvatiHandler(func)
  // {
  //   const response = await fetch(
  //     "https://localhost:5001/Narudzbine/PreuzetiNarudzbine/" + idKorisnika
  //   );
  //   const data = await response.json();
  //   console.log(data);
  //   data.map((el)=>{
  //     console.log(el);
  //     //  const res = fetch("https://localhost:5001/Kupovina/DodatiKupovinu/"+idKorisnika+"/"+data.DomacinstvoFK+"/"+data.DostavljacFK+"/"+data.ProizvodFK+"/"+data.ImeKorisnika+"/"+"adresa"+"/"+"mail"+"/"+data.brojProizvoda+"/"+data.proveriDostava+"/"+data.imeProizvoda+"/"+"06464568784");
  //    });
    
  // }

  async function PrihvatiHandler(prop){
    var datum = fetch("https://localhost:5001/Narudzbine/PreuzetiNarudzbine/" + idKorisnika)
      .then((response) => response.json())
      .then((data) => {
          return Promise.all(data.map(item => {
            //item.full_name returns the repositorie name
            return fetch("https://localhost:5001/Kupovina/DodatiKupovinu/"+idKorisnika+"/"+item.domacinstvoFK+"/"+item.dostavljacFK+"/"+item.proizvodFK+"/"+"ime"+"/"+"adresa"+"/"+"mail@gmail.com"+"/"+item.brojProizvoda+"/"+item.proveriDostava+"/"+item.imeProizvoda+"/"+"0649434713",{
             method:'POST',
            body:JSON.stringify({title:'Uspesno dodatno'}),
            headers:{
              'Content-Type':'application/json'
            }})
              .then(data => {
                item["filters"] = data
                return item
              })
          }));
        }).then(data => console.log(data))
      }


     console.log(props.dost);
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.show}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Ukupan racun iznosi : {zbir}.00 din
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            racun proizvoda : {cartTotal}.00 din <br></br> + dostava:{props.dost}.00 din
          </Typography>
          <p>
            Da li ste sigurni da zelite da porucite proizvode?
          </p>
          <div className={classes.rowDesign}>
            <Button onClick={()=>PrihvatiHandler(props.onClose)}>Prihvati</Button>
            <Button onClick={props.onClose}>Odbij</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}