import React, {useState} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {endpoint} from "../config";

const AddWorker = ({ addWorker, showLabel, setAddedUser, setAddWorker }) => {

    const reservationId = localStorage.getItem('reservationId');
    const userRole = 'worker';
    const userStatus = 'active';
    const [userName, setUserName] = useState('');
    const [userMiddleName, setUserMiddleName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const registerUser = async () => {

        try{
            await axios.post(`${endpoint}/user/`, {
                reservationId,
                userRole,
                userStatus,
                userName,
                userMiddleName,
                userLastName,
                userEmail,
                userPhone,
                userPassword
            },{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setAddWorker(false);
            setAddedUser(true);
            showLabel();
        } catch (e){
            console.log(e.message)
        }
    }

    return (
        <Dialog open={addWorker} onClose={() => setAddWorker(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new worker</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    For adding new worker prompt all required data
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="userName"
                    label="User name"
                    type="text"
                    fullWidth
                    required
                    onChange={event => setUserName(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="userMiddleName"
                    label="User middle name"
                    type="text"
                    fullWidth
                    required
                    onChange={event => setUserMiddleName(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="userLastName"
                    label="User last name"
                    type="text"
                    fullWidth
                    required
                    onChange={event => setUserLastName(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="userEmail"
                    label="User email"
                    type="email"
                    fullWidth
                    required
                    onChange={event => setUserEmail(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="userPhone"
                    label="User phone"
                    type="text"
                    fullWidth
                    required
                    onChange={event => setUserPhone(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="userPassword"
                    label="User password"
                    type="password"
                    fullWidth
                    required
                    onChange={event => setUserPassword(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setAddWorker(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={registerUser} color="primary">
                    Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddWorker;