import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router";
import { BrowserRouter as Route } from "react-router-dom";
import { TimePicker, MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function CreationForm({
    handleInputChange,
    createSheet,
    isLoading,
    handleRedirect,
    buttonText,
    isFetching,
    sheet,
    updateSheet
}) {
    const classes = useStyles();
    if (isFetching) {
        return <></>
    }
    console.log(sheet && sheet.duration);
    return (
        <form className={classes.root} autoComplete="off" style={{ marginBottom: "20%", marginTop: "50px" }}>
            <Typography style={{ width: "80%", textAlign: "left", marginLeft: "10%" }} variant="h5" align="left">New Music Sheet</Typography>
            <div >
                <TextField
                    error
                    required
                    id="title"
                    label="Title"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.title}
                />
                <TextField
                    name="artist"
                    required
                    id="artist"
                    label="Artist"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.artist}
                />
                <TextField
                    required
                    id="signature"
                    label="Signature"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.signature}
                />
                <TextField
                    required
                    id="tempo"
                    label="Tempo"
                    style={{ width: "80%" }}
                    type="number"
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.tempo}
                />
                <TextField
                    required
                    id="composition_date"
                    label="Composition date"
                    style={{ width: "80%" }}
                    type="date"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.composition_date}
                />
                <TextField
                    id="image"
                    label="Image URI"
                    type="text"
                    autoComplete="current-password"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.image}
                />
                <TextField
                    required
                    id="description"
                    label="Description"
                    style={{ width: "80%" }}
                    multiline={true}
                    rows={5}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.description}
                />

            </div>
            <div style={{ textAlign: "left", width: "80%", paddingLeft: "10%" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={async () => {
                        if (sheet) {
                            await updateSheet();
                            handleRedirect();
                        } else {
                            await createSheet()
                            handleRedirect();
                        }

                    }}
                >
                    {isLoading ? <CircularProgress color="inherit" size={23} /> :
                        buttonText}
                </Button>
            </div>

        </form>
    );
}