import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    Card,
    CardActions,
    CardContent,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, TextField
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { AddWorker } from '../components/index'

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {endpoint} from '../config'
import { Trans, useTranslation } from "react-i18next";


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

const OutlinedCard = ({ user, users, setUsers }) => {

    const classes = useStyles();
    const [selectedUser, setSelectedUser] = useState(null)
    const [removing, setRemoving] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [userData, setUserData] = useState(null)
    const [userName, setUserName] = useState('');
    const [userMiddleName, setUserMiddleName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');

    const [updatedUser, setUpdatedUser] = useState(false);

    const removeUser = async (userId) => {
        setRemoving(true);
        try{
            await axios.delete(`${endpoint}/user/${userId}`, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
            setRemoving(false);
            setUsers(users.filter(user => user._id !== userId))
            } catch (e) {
                console.log(e.message)
            }
        }

    const userId = localStorage.getItem('id')

    useEffect(() => {
        (async()=>{
            if(selectedUser){
                axios.get(`${endpoint}/user/${selectedUser}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => {
                            setUserName(res.data.userName);
                            setUserMiddleName(res.data.userMiddleName);
                            setUserLastName(res.data.userLastName);
                            setUserEmail(res.data.userEmail);
                            setUserPhone(res.data.userPhone);
                            setUserData(res.data)
                        }
                    )
                    .catch(e => console.log(e.message))
            }
        })()
    }, [selectedUser])

    const applyUserChanges = async () => {

        try{
            await axios.patch(`${endpoint}/user/${selectedUser}`, {
                userName, userMiddleName, userLastName, userEmail, userPhone
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setUpdatedUser(true);
            setShowModal(false);
            showLabel();
        } catch (e){
            console.log(e.message)
        }

    }

    const showLabel = () => {
        setTimeout(() => {
            setUpdatedUser(false)
        }, 1200)
    }


    return (
        <Card className={classes.root} variant="outlined">

            {userData &&  <Dialog open={showModal} onClose={() => setShowModal(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update user info</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        For updating user info prompt all required info
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="User name"
                        type="text"
                        fullWidth
                        defaultValue={userName}
                        onChange={event => setUserName(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="middleName"
                        label="User middle name"
                        type="text"
                        fullWidth
                        defaultValue={userMiddleName}
                        onChange={event => setUserMiddleName(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastName"
                        label="User last name"
                        type="text"
                        fullWidth
                        defaultValue={userLastName}
                        onChange={event => setUserLastName(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="User email"
                        type="email"
                        fullWidth
                        defaultValue={userEmail}
                        onChange={event => setUserEmail(event.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="phone"
                        label="User phone"
                        type="text"
                        fullWidth
                        defaultValue={userPhone}
                        onChange={event => setUserPhone(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => applyUserChanges()} color="primary">
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog> }



            <Backdrop className={classes.backdrop} open={removing}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {user.userRole}
                </Typography>
                <Typography variant="h5" component="h2">
                    {user.userName} {user.userLastName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Email: {user.userEmail}
                </Typography>
                <Typography variant="body2" component="p">
                    Phone: {user.userPhone}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => {
                    setShowModal(true);
                    setSelectedUser(user._id)
                }}>
                    <Trans i18nKey={"editUser"}>Edit user</Trans>
                </Button>
                { userId !== user._id ? <Button variant="contained" color="secondary" onClick={() => removeUser(user._id)}>
                    <Trans i18nKey={"removeUser"}>Remove user</Trans>
                </Button> : <Button variant="contained" disabled onClick={() => removeUser(user._id)}>
                    <Trans i18nKey={"removeUser"}>Remove user</Trans>
                </Button> }



            </CardActions>

            { updatedUser && <Alert severity="success">Updated</Alert> }
        </Card>
    );
}

const UserPage = () => {

    const [users, setUsers] = useState([])
    const [addWorker, setAddWorker] = useState(false)
    const [addedUser, setAddedUser] = useState(false);

    useEffect(() => {
        (async () => {
            const _id = localStorage.getItem('reservationId')
            try{
                const {data} = await axios.get(`${endpoint}/user/reservation/${_id}`, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setUsers(data)
            } catch (e) {
                console.log(e.message)
            }
        })()

    }, [])

    const showLabel = () => {
        setTimeout(() => {
            setAddedUser(false)
        }, 1200)
    }

    return (
        <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start" >
            <Grid item xs={12}>
                <h1><Trans i18nKey={"workers"}>Point workers</Trans> </h1>
                <Button onClick={() => setAddWorker(true)} variant="contained" color="primary" >
                    <Trans i18nKey={"addWorker"}>Add new worker</Trans>
                </Button>
                <AddWorker addWorker={addWorker} showLabel={showLabel} setAddedUser={setAddedUser} setAddWorker={setAddWorker} />
                { addedUser && <Alert severity="success">Updated</Alert> }
            </Grid>
            {
                users && users.map((user, index) => {
                    return <Grid key={index} item xs={4} md={4} lg={4}>
                        <OutlinedCard user={user} users={users} setUsers={setUsers} />
                    </Grid>
                })
            }

    </Grid>
    )
}

export default UserPage;