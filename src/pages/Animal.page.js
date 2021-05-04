import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {endpoint} from "../config";

import {
    Backdrop,
    Card, CardActions, CardContent, CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
})));

const OutlinedCard = ({ animal }) => {

    console.log(animal)

    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Animal status: {animal.animalStatus}
                </Typography>
                <Typography variant="h5" component="h2">
                    {animal.animalName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    RFID: {animal.animalRfdi}
                </Typography>
                <Typography variant="body2" component="p">
                    Added to reservation: {new Date(animal.createdAt).toLocaleString()}
                </Typography>
            </CardContent>
        </Card>
    );
}

const AnimalPage = () => {

    const [animals, setAnimals] = useState([])

    useEffect(() => {
        (async () => {
            try{
                const {data} = await axios.get(`${endpoint}/animal/`, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setAnimals(data)
            } catch (e) {
                console.log(e.message)
            }
        })()

    }, [])

    return (
        <Grid
            container
            spacing={2}
            direction="row"
            justify="flex-start"
            alignItems="flex-start" >
            <Grid item xs={12}>
                <h1>Reservation animals</h1>
            </Grid>
            {
                animals && animals.map((animal, index) => {
                    return <Grid key={index} item xs={4} md={4} lg={4}>
                        <OutlinedCard animal={animal} />
                    </Grid>
                })
            }

        </Grid>
    )
}

export default AnimalPage;