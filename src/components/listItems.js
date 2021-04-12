import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PetsIcon from '@material-ui/icons/Pets';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const mainListItems = (
    <div>
        <ListSubheader inset>General</ListSubheader>
        <ListItem button onClick={() => window.location.href='/'}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => window.location.href='/users'}>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
        </ListItem>
        <ListItem button onClick={() => window.location.href='/tasks'}>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button onClick={() => window.location.href='/animals'}>
            <ListItemIcon>
                <PetsIcon />
            </ListItemIcon>
            <ListItemText primary="Animals" />
        </ListItem>
        <ListItem button onClick={() => window.location.href='/settings'}>
            <ListItemIcon>
                <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={() => {
            localStorage.clear();
            window.location.reload();
        }}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItem>

    </div>
);
