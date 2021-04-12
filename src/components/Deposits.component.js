import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../components/Title.component';

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits({ tasksTotal, timeTotal }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Tasks total given: </Title>
            <Typography component="p" variant="h4">
                {tasksTotal} tasks
            </Typography>
            <Typography component="p" variant="h4">
                for {timeTotal} minutes
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                 in last 30 days
            </Typography>
            <div>
                <Link color="primary" href="/stats">
                    View more stats...
                </Link>
            </div>
        </React.Fragment>
    );
}