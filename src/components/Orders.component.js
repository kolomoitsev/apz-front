import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../components/Title.component';


const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));


export default function Orders({ tasks }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date created</TableCell>
                        <TableCell>Task name</TableCell>
                        <TableCell>Task description</TableCell>
                        <TableCell>Task status</TableCell>
                        <TableCell align="right">Task deadline</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, index) => (
                        <TableRow key={index}>
                            <TableCell>{new Date(task.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{task.taskName}</TableCell>
                            <TableCell>{task.taskDescription}</TableCell>
                            <TableCell>{task.taskStatus}</TableCell>
                            <TableCell align="right">{new Date(task.taskDeadline).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="/tasks" >
                    See more orders
                </Link>
            </div>
        </React.Fragment>
    );
}