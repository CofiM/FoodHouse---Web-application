import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { ListItemIcon } from '@mui/material';

export default function AlignItemsList(props) {

  return (
    <List 
      sx={{ width: '100%', backgroundColor: '#E9EFC0', height: 64 }}
      onClick={props.onClick}
    >
      <ListItem sx={{paddingTop: "0px" }}>
        <ListItemAvatar>
          <Avatar alt="" src="" />
        </ListItemAvatar>
        <ListItemText sx={{color:'black'}}
          primary={props.receiver}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {props.shortMessage}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}