import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        //var data = [{"id":1,"artist":"Priscella","duration":"7:52 AM","date_added":"8/8/2020","date_modified":"12/10/2019","title":"Star Maker, The (Uomo delle stelle, L')","composition_date":"9/27/2019","created_by":"Priscella Bearcroft","description":"Salmonella enteritis"},
        //{"id":2,"artist":"Cyndie","duration":"2:07 AM","date_added":"3/2/2020","date_modified":"10/31/2019","title":"Further Gesture, A","composition_date":"9/9/2019","created_by":"Cyndie Lecordier","description":"Unsp nondisp fx of surg neck of unsp humer, init for opn fx"},
        //{"id":3,"artist":"Loni","duration":"10:42 AM","date_added":"12/18/2019","date_modified":"4/21/2020","title":"Stormbreaker (Alex Rider: Operation Stormbreaker)","composition_date":"3/7/2020","created_by":"Loni Yegorkin","description":"Periprosth fx around internal prosth l ankle joint, init"}]
        return (
            <React.Fragment>
                {data.map(item => {
                    return MultimediaCard(item); // <MultimediaCard item={item} ></MultimediaCard>
                })}
            </React.Fragment>
        );
    }
    var data = catalog
        /*[{"id":1,"artist":"Priscella","duration":"7:52 AM","date_added":"8/8/2020","date_modified":"12/10/2019","title":"Star Maker, The (Uomo delle stelle, L')","composition_date":"9/27/2019","created_by":"Priscella Bearcroft","description":"Salmonella enteritis"},
        {"id":2,"artist":"Cyndie","duration":"2:07 AM","date_added":"3/2/2020","date_modified":"10/31/2019","title":"Further Gesture, A","composition_date":"9/9/2019","created_by":"Cyndie Lecordier","description":"Unsp nondisp fx of surg neck of unsp humer, init for opn fx"},
        {"id":3,"artist":"Loni","duration":"10:42 AM","date_added":"12/18/2019","date_modified":"4/21/2020","title":"Stormbreaker (Alex Rider: Operation Stormbreaker)","composition_date":"3/7/2020","created_by":"Loni Yegorkin","description":"Periprosth fx around internal prosth l ankle joint, init"},
        {"id":1,"artist":"Priscella","duration":"7:52 AM","date_added":"8/8/2020","date_modified":"12/10/2019","title":"Star Maker, The (Uomo delle stelle, L')","composition_date":"9/27/2019","created_by":"Priscella Bearcroft","description":"Salmonella enteritis"},
        {"id":2,"artist":"Cyndie","duration":"2:07 AM","date_added":"3/2/2020","date_modified":"10/31/2019","title":"Further Gesture, A","composition_date":"9/9/2019","created_by":"Cyndie Lecordier","description":"Unsp nondisp fx of surg neck of unsp humer, init for opn fx"},
        {"id":3,"artist":"Loni","duration":"10:42 AM","date_added":"12/18/2019","date_modified":"4/21/2020","title":"Stormbreaker (Alex Rider: Operation Stormbreaker)","composition_date":"3/7/2020","created_by":"Loni Yegorkin","description":"Periprosth fx around internal prosth l ankle joint, init"},
        {"id":1,"artist":"Priscella","duration":"7:52 AM","date_added":"8/8/2020","date_modified":"12/10/2019","title":"Star Maker, The (Uomo delle stelle, L')","composition_date":"9/27/2019","created_by":"Priscella Bearcroft","description":"Salmonella enteritis"},
        {"id":2,"artist":"Cyndie","duration":"2:07 AM","date_added":"3/2/2020","date_modified":"10/31/2019","title":"Further Gesture, A","composition_date":"9/9/2019","created_by":"Cyndie Lecordier","description":"Unsp nondisp fx of surg neck of unsp humer, init for opn fx"},
        {"id":3,"artist":"Loni","duration":"10:42 AM","date_added":"12/18/2019","date_modified":"4/21/2020","title":"Stormbreaker (Alex Rider: Operation Stormbreaker)","composition_date":"3/7/2020","created_by":"Loni Yegorkin","description":"Periprosth fx around internal prosth l ankle joint, init"}]
    */
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
            </div>
        </React.Fragment>
    );
}