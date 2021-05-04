import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {ListItem, ListItemText} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import {endpoint} from "../config";
import Alert from "@material-ui/lab/Alert";

const SettingsPage = () => {

    const [backups, setBackups] = useState([]);
    const [appliedBackup, setAppliedBackup] = useState(false);
    const [createdBackup, setCreatedBackup] = useState(false);

    const showLabel = () => {
        setTimeout(() => {
            setAppliedBackup(false)
        }, 1500)
    }

    const showLabel2 = () => {
        setTimeout(() => {
            setCreatedBackup(false)
        }, 1500)
    }

    useEffect(() => {
        (async() => {
            try{
                const { data: {files} } = await axios.get(`${endpoint}/user/backups`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setBackups(files)
            } catch (e){
                console.log(e.message)
            }
        })();
    }, [])

    const applyBackup = async (backup) => {
        try{
            await axios.post(`${endpoint}/user/backup/apply`, {
                backup
            })
            setAppliedBackup(true);
            showLabel();
        } catch (e){
            console.log(e.message)
        }
    }

    const makeBackup = async () => {
        try{
            await axios.post(`${endpoint}/user/backup/create`)
            setCreatedBackup(true);
            showLabel2();
        } catch (e){
            console.log(e.message)
        }
    }



    return (
        <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start" >
            <Grid item xs={12}>
                <h1>Settings page</h1>
                { appliedBackup && <Alert severity="success">Backup applied!</Alert> }
                <List component="nav" aria-label="main mailbox folders">
                    <ListItem>
                        <ListItemText primary="Available backups" />
                    </ListItem>
                    { backups && backups.map(backup => (
                        <ListItem button onClick={() => applyBackup(backup)}>
                            <ListItemText primary={backup.split('/')[2]} />
                        </ListItem>
                    )) }
                </List>

                <Divider />
                <List component="nav" aria-label="secondary mailbox folders">
                    <ListItem button onClick={() => makeBackup()}>
                        <ListItemText primary="Make backup now" />
                    </ListItem>
                </List>
                { createdBackup && <Alert severity="success">Backup created!</Alert> }
            </Grid>
        </Grid>
    )
}

export default SettingsPage;