import * as React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { CartProvider, useCart } from "react-use-cart";


const MailBox = (props) => {

    const {totalUniqueItems} = useCart();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const newNotifications = `Imate ${totalUniqueItems} proizvoda u korpi!`;
    const noNotifications = 'Korpa je prazna!';

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
        <Tooltip title={totalUniqueItems === "0" ? noNotifications : newNotifications}>
            <IconButton>
                <Badge badgeContent={totalUniqueItems} color={totalUniqueItems === "0" ? defaultColor : errorColor}>
                    <ShoppingCartIcon color="action" />
                </Badge>
            </IconButton>
        </Tooltip>
      );
}

export default MailBox;
