import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import classes from "./MessageModal.module.css";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(props.show);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
           {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
          <div className={classes.rowDesign}>
            <Button onClick={props.onClose}>Odbij</Button>
            <Button onClick={props.onClose}>Prihvati</Button>
          </div>
      </Box>
      </Modal>
    </div>
  );
}
