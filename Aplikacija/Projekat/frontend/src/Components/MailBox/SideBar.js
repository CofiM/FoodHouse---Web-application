import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import OutboxRoundedIcon from '@mui/icons-material/OutboxRounded';

export default function SelectedListItem(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
    localStorage.setItem("sidebar", index);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: '#424242', color: 'black' }}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onDoubleClick={(event) => handleListItemClick(0)}
          onClick={props.onClick()}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <ListItemButton
          selected={selectedIndex === 1}
          onDoubleClick={(event) => handleListItemClick(1)}
          onClick={props.onClick}
        >
        <ListItemIcon>
          <OutboxRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Outbox" />
        </ListItemButton>
      </List>
    </Box>
  );
}
