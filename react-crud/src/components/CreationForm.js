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
    updateSheet,
    filename,
    errors
}) {
    const classes = useStyles();
    if (isFetching) {
        return <></>
    }
    return (
        <form className={classes.root} autoComplete="off" style={{ marginBottom: "20%", marginTop: "50px" }}>
            <Typography style={{ width: "80%", textAlign: "left", marginLeft: "10%" }} variant="h5" align="left">{sheet ? 'Edit' : 'New' } Music Sheet</Typography>
            <div >
                <TextField
                    required
                    id="title"
                    label="Title"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.title}
                    error={errors['title']}
                    helperText={errors['title']}
                />
                <TextField
                    name="artist"
                    required
                    id="artist"
                    label="Artist"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.artist}
                    error={errors['artist']}
                    helperText={errors['artist']}
                />
                <TextField
                    required
                    id="signature"
                    label="Signature"
                    style={{ width: "80%" }}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.signature}
                    error={errors['signature']}
                    helperText={errors['signature']}
                />
                <TextField
                    required
                    id="tempo"
                    label="Tempo"
                    style={{ width: "80%" }}
                    type="number"
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.tempo}
                    error={errors['tempo']}
                    helperText={errors['tempo']}

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
                    error={errors['composition_date']}
                    helperText={errors['composition_date']}
                />
                <TextField
                    id="image"
                    label="PDF File"
                    type="text"
                    autoComplete="current-password"
                    style={{ width: "73%" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    defaultValue={!filename ? (sheet && sheet.image):''}
                    disabled={true}
                    value={filename}
                    error={errors['image']}
                    helperText={errors['image']}

                />
                <label htmlFor="upload_photo" >
                    <input
                        style={{ display: 'none' }}
                        id="upload_photo"
                        name="upload_photo"
                        type="file"
                        onChange={(event) => {
                            handleInputChange(event);
                            const formData = new FormData();
                            formData.append(
                                'test',
                                event.target.files[0],
                                event.target.files[0].name
                            )
                        }}
                        error={errors['upload_photo']}
                        helperText={errors['upload_photo']}

                    />
                    <Button color="secondary" variant="contained" component="span">
                        Upload file
                    </Button>

                </label>
                <TextField
                    required
                    id="description"
                    label="Description"
                    style={{ width: "80%" }}
                    multiline={true}
                    rows={5}
                    onChange={handleInputChange}
                    defaultValue={sheet && sheet.description}
                    error={errors['description']}
                    helperText={errors['description']}
                />

            </div>
            <div style={{ textAlign: "left", width: "80%", paddingLeft: "10%" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        if (sheet) {
                            updateSheet();
                            //handleRedirect();
                        } else {
                            createSheet()
                            //handleRedirect();
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