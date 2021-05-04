import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../components/Title.component';
import { Trans, useTranslation } from "react-i18next";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits({ tasksTotal, timeTotal }) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>{ <Trans i18nKey={"alltasks"}>Tasks total given:</Trans> } </Title>
            <Typography component="p" variant="h4">
                {tasksTotal}
                { <Trans i18nKey={"tasks"}>tasks</Trans> }
            </Typography>
            <Typography component="p" variant="h4">
                for {timeTotal} minutes
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                { <Trans i18nKey={"days"}>in last 30 days</Trans> }
            </Typography>
        </React.Fragment>
    );
}