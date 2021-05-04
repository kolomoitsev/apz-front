import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import {
    Card, CardActions, CardContent,
    ListItem,
    ListItemText,
} from "@material-ui/core";
import axios from "axios";
import {endpoint} from "../config";
import { AddCategory } from './../components/index'
import Typography from "@material-ui/core/Typography";
import { AddTask } from './../components'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        padding: '15px',
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
}));



const CategoriesList = ({ categories, setCategories }) => {
    const classes = useStyles();


    const [addCategory, setAddCategory] = useState(false);
    const [createdCategory, setCreatedCategory] = useState(false);

    return (
        <div className={classes.root}>
            <h2>Available task categories</h2>
            <List component="nav" aria-label="main mailbox folders">
                { categories && categories.map((category, index) => <ListItem button key={index}>
                        <ListItemText  primary={`${category.taskCategoryName}`}/>
                    </ListItem>
                )}
            </List>
            <Button onClick={() => setAddCategory(true)} variant="contained" color="primary" >
                Add new category
            </Button>

            { addCategory && <AddCategory addCategory={addCategory} setAddCategory={setAddCategory} categories={categories} setCategories={setCategories} setCreatedCategory={setCreatedCategory}/> }

            { createdCategory && <Alert severity="success">Updated</Alert> }
        </div>
    );
}

const OutlinedCard = ({ task, tasks, setTasks }) => {

    const classes = useStyles();
    const [updatedTask, setUpdatedTask] = useState(false);


    const removeTask = async (id) => {
        try{
            await axios.delete(`${endpoint}/task/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setTasks(tasks.filter(t => t._id !== id))
        } catch (e) {
            console.log(e.message)
        }
    }

    const showLabel = () => {
        setTimeout(() => {
            setUpdatedTask(false)
        }, 1200)
    }

    const markAsDone = async (id) => {
        try{
            await axios.patch(`${endpoint}/task/done/${id}`, {
                headers: {
                    'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setUpdatedTask(true);
            showLabel();
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <Card className={classes.root} variant="outlined">

            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {task.taskStatus}
                </Typography>
                <Typography variant="h5" component="h2">
                    {task.taskName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Deadline: {new Date(task.taskDeadline).toLocaleString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => markAsDone(task._id)}>
                    Set done
                </Button>
                 <Button variant="contained" onClick={() => removeTask(task._id)}>
                    Remove task
                </Button>
            </CardActions>

             { updatedTask && <Alert severity="success">done!</Alert> }
        </Card>
    );
}

const TaskPage = () => {

    const [categories, setCategories] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [createTask, setCreateTask] = useState(false);

    // parse available categories
    useEffect(() => {
        (async() => {

            try{
                const { data } = await axios.get(`${endpoint}/task/category`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setCategories(data)
            } catch (e){
                console.log(e.message)
            }

        })();

        (async() => {
            try{

                const _id = localStorage.getItem('id')

                const { data } = await axios.get(`${endpoint}/task/created/${_id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                setTasks(data)
            } catch (e){
                console.log(e.message)
            }
        })();

    }, [])


    return (
        <Grid
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="flex-start" >
            <Grid item xs={12}>
                <h1>Tasks page</h1>
            </Grid>
            <Grid item xs={4}>
                <CategoriesList categories={categories} setCategories={setCategories}/>
            </Grid>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"
                  xs={8}>
                <Grid item xs={12}>
                    <h2>Tasks given by me</h2>
                    <Button variant="contained" color="primary" onClick={() =>setCreateTask(true)}>
                        Create task
                    </Button>
                    {createTask && <AddTask createTask={createTask} tasks={tasks} setTasks={setTasks} setCreateTask={setCreateTask} /> }
                </Grid>

                {
                    tasks && tasks.map((task, index) => {
                        return <Grid key={index} item xs={4} md={4} lg={4}>
                            <OutlinedCard task={task} tasks={tasks} setTasks={setTasks} />
                        </Grid>
                    })
                }
            </Grid>


        </Grid>
    )
};

export default TaskPage;