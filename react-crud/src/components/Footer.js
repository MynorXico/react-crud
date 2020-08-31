import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import BottomNavigation from '@material-ui/core/BottomNavigation';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import Tooltip from '@material-ui/core/Tooltip';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

}));


export default function Footer() {
    const classes = useStyles();

    return (
        <BottomNavigation style={{
            position: 'fixed',
            bottom: 0,
            width: "100%"
        }}>
            <BottomNavigationAction label="Agregar" icon={<AddIcon color="primary"/>}>


            </BottomNavigationAction>
            <BottomNavigationAction label="Agregar" icon={<DeleteIcon color="secondary"/>}>


            </BottomNavigationAction>

        </BottomNavigation>
    );
}