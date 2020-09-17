import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function CreationForm() {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off" style={{ marginBottom: "20%", marginTop: "50px" }}>
            <Typography style={{ width: "80%", textAlign: "left", marginLeft: "10%" }} variant="h5" align="left">Formulario de creación</Typography>
            <div >
                <TextField
                    required
                    id="artist"
                    label="Artista"
                    style={{ width: "80%" }}

                />
                <TextField
                    required
                    id="duration"
                    label="Duración"
                    type="time"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    style={{ width: "80%" }}

                />
                <TextField
                    required
                    id="title"
                    label="Título"
                    style={{ width: "80%" }}

                />
                <TextField
                    required
                    id="composition-date"
                    label="Fecha de composición"
                    style={{ width: "80%" }}

                />
                <TextField
                    id="image-uri"
                    label="URI de imagen"
                    type="password"
                    autoComplete="current-password"
                    style={{ width: "80%" }}

                />
                <TextField
                    required
                    id="description"
                    label="Descripción"
                    style={{ width: "80%" }}
                    multiline={true}
                    rows={10}
                />

            </div>
            <div style={{ textAlign: "left", width: "80%", paddingLeft: "10%" }}>
                <Button variant="contained" color="primary" >
                    Crear
                </Button>
            </div>

        </form>
    );
}