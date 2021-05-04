import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    Select,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {endpoint} from "../config";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(0),
        width: "auto",
    },
}));

const AddTask = ({ createTask, tasks, setTasks,setCreateTask }) => {

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskAssignee, setTaskAssignee] = useState('');
    const taskCreatedBy = localStorage.getItem('id');
    const [taskLength, setTaskLength] = useState('');
    const [taskCategory, setTaskCategory] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');

    const [fetchedCategories, setFetchedCategories] = useState([]);
    const [fetchedUsers, setFetchedUsers] = useState([]);

    useEffect(() => {
        (async() => {

            try{
                const { data } = await axios.get(`${endpoint}/task/category`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const items = data && data.map(item => { return {
                    value: item._id,
                    label: item.taskCategoryName
                }})

                setFetchedCategories(items)
            } catch (e){
                console.log(e.message)
            }

        })();

        (async () => {
            const _id = localStorage.getItem('reservationId')
            const userId = localStorage.getItem('id')
            try{
                const {data} = await axios.get(`${endpoint}/user/reservation/${_id}`, {
                    headers: {
                        'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const items = data && data.filter(item => item._id !== userId)
                    .map(item => { return {
                    value: item._id,
                    label: item.userLastName
                }})
                setFetchedUsers(items)
            } catch (e) {
                console.log(e.message)
            }
        })();
    }, [])

    const generateTask = async () => {

        try {
            const {data} = await axios.post(`${endpoint}/task/task`, {
                taskName,
                taskDescription,
                taskAssignee,
                taskCreatedBy,
                taskLength: Number(taskLength),
                taskCategory,
                taskDeadline
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setCreateTask(false);
            tasks.push(data);
            setTasks(tasks);

        } catch (e) {
            console.log(e.response)
        }
    }

    const classes = useStyles();


    return (
        <Dialog open={createTask} onClose={() => setCreateTask(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create task</DialogTitle>
        <DialogContent>
            <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="taskName"
                label="Task name"
                type="text"
                fullWidth
                onChange={event => setTaskName(event.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                id="taskDescription"
                label="Task description"
                type="text"
                fullWidth
                onChange={event => setTaskDescription(event.target.value)}
            />

            <Select
                native
                defaultValue={'Nothing selected yet'}
                onChange={event => setTaskCategory(event.target.value)}
                input={<Input id="demo-dialog-native" />}
            >
                {
                    fetchedCategories.length && fetchedCategories.map(cat => <option value={cat.value}>{cat.label}</option>)
                }
            </Select>

            <Select
                native
                value={"Nothing selected yet"}
                onChange={event => setTaskAssignee(event.target.value)}
                input={<Input id="demo-dialog-native" />}
            >
                {
                    fetchedUsers.length && fetchedUsers.map(cat => <option value={cat.value}>{cat.label}</option>)
                }
            </Select>

            <TextField
                id="datetime-local"
                label="Next appointment"
                type="datetime-local"
                onChange={event => setTaskDeadline(event.target.value)}
                defaultValue="2021-05-5T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                autoFocus
                margin="dense"
                id="taskLength"
                label="Task length"
                type="text"
                fullWidth
                onChange={event => setTaskLength(event.target.value)}
            />

        </DialogContent>
        <DialogActions>
            <Button onClick={() => setCreateTask(false)} color="primary">
                Cancel
            </Button>
            <Button onClick={() => generateTask()} color="primary">
                Create
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default AddTask;