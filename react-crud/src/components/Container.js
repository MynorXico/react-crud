import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';

import catalog from "../data/catalog";

import MultimediaCard from "./MultimediaCard";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


export default function SimpleContainer() {
    const classes = useStyles();

    function FormRow(data) {
        return (
            <React.Fragment>
                {data.map(item => {
                    return MultimediaCard(item); // <MultimediaCard item={item} ></MultimediaCard>
                })}
            </React.Fragment>
        );
    }
    var data = catalog

    var rows = [];
    var current_row = [];
    for(var i = 0; i < data.length; i++){
        current_row.push(data[i])
        if(current_row.length == 3 || data.length-i-1 == 0){
            rows.push(current_row);
            current_row = []
        }
    }
    console.log("rows: ", rows)
    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{
                padding: 20,
                marginBottom: "10%"
            }}>
                <Grid container spacing={1}>
                    {
                        rows.map(row => {
                            return  (<Grid container item xs={12} spacing={3}>
                                        {FormRow(row)}
                                    </Grid>)
                        })
                    }
                </Grid>
                <Pagination count={11} defaultPage={6} color="primary" style={{display: "block ruby"}} />
            </div>
        </React.Fragment>
    );
}