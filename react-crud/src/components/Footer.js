import React from 'react';
import { makeStyles } from '@material-ui/core/styles';


import BottomNavigation from '@material-ui/core/BottomNavigation';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { Redirect } from 'react-router';

import Tooltip from '@material-ui/core/Tooltip';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { useHistory } from "react-router-dom";

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
    let history = useHistory();
    return (
        <BottomNavigation style={{
            position: 'fixed',
            bottom: 0,
            width: "100%"
        }}
            onChange={(event, newValue) => {
                switch(newValue){
                    case 0:
                        console.log("Redirecting to create");
                        break;
                    case 1:
                        break;
                }
                console.log(event, newValue);
            }}>
            <BottomNavigationAction label="Agregar" icon={<AddIcon color="primary" value="add"/>}>


            </BottomNavigationAction>
            <BottomNavigationAction label="Eliminar" icon={<DeleteIcon color="secondary" value="remove"/>}>


            </BottomNavigationAction>

        </BottomNavigation>
    );
}