import React, {useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {endpoint} from "../config";

const AddCategory = ({ addCategory, setAddCategory, categories, setCategories, setCreatedCategory }) => {

    const [taskCategoryName, setTaskCategoryName] = useState('');
    const [taskCategoryDescription, setTaskCategoryDescription] = useState('');

    const showLabel = () => {
        setTimeout(() => {
            setCreatedCategory(false)
        }, 1200)
    }

    const createTaskCategory = async () => {

        try{
            const { data } = await axios.post(`${endpoint}/task/category`,{
                taskCategoryName, taskCategoryDescription
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            setAddCategory(false);
            const list = categories;
            list.push(data);
            setCategories(list);
            setCreatedCategory(true);
            showLabel();
        } catch (e){
            console.log(e.message)
        }

    }

    return (
        <Dialog open={addCategory} onClose={() => setAddCategory(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add new task category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter task name and task description
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskName"
                    label="Task name"
                    type="text"
                    fullWidth
                    onChange={event => setTaskCategoryName(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="taskDescription"
                    label="Task description"
                    type="text"
                    fullWidth
                    onChange={event => setTaskCategoryDescription(event.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setAddCategory(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => createTaskCategory()} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default AddCategory;