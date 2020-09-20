import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



import { useHistory } from "react-router-dom";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },

}));


export default function Footer({ handleAddItem }) {
    const classes = useStyles();
    let history = useHistory();
    return <Typography></Typography>

}