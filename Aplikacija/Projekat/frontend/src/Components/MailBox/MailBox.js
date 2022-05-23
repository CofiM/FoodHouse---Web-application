import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


const MailBox = (props) => {

    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const newNotifications = `You have ${props.number} new notifications!`;
    const noNotifications = 'No new notifications';

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const errorColor = "error";
    const defaultColor = "primary"
    
    return (
        <Tooltip title={props.number === "0" ? noNotifications : newNotifications}>
            <IconButton>
                <Badge badgeContent={props.number} color={props.number === "0" ? defaultColor : errorColor}>
                    <MailIcon color="action" />
                </Badge>
            </IconButton>
        </Tooltip>
      );
}

export default MailBox;
