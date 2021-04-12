import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../components/Title.component';

export default function Chart({ tasks }) {
    const theme = useTheme();

    const groups = tasks && tasks.reduce((groups, task) => {
        const date = task.createdAt.split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    const groupArrays = groups && Object.keys(groups).map((date) => {
        return {
            date,
            tasks: groups[date]
        };
    });

    const getChartData = groupArrays && groupArrays.map((group) => {
        return {
            time: group.date,
            amount: group.tasks.length
        };
    });

    return (
        <React.Fragment>
            <Title>Today</Title>
            <ResponsiveContainer>
                { getChartData && <LineChart
                    data={getChartData}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}
                >
                    <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary}>
                        <Label
                            angle={270}
                            position="left"
                            style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                            Tasks amount per day
                        </Label>
                    </YAxis>
                    <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
                </LineChart> }
            </ResponsiveContainer>
        </React.Fragment>
    );
}