import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    card: {
      display: 'flex',
      marginTop: theme.spacing.unit * 2,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    details: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cover: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        '& > svg': {
            width: '80px',
            height: 'auto',
            marginLeft: theme.spacing.unit * 2,
            [theme.breakpoints.down('xs')]: {
                width: '160px',
                marginTop: '16px',
            },
        },
    },
});

const ProgramItem = ({ classes, logo, title, time, progress, link }) => (
    <Card className={ classes.card }>
        <a
            href={ 'https://www.lrt.lt' + link }
            target="_blank"
            rel="noopener noreferrer"
        >
            <div
                className={ classes.cover }
                component="a"
                dangerouslySetInnerHTML={{ __html: logo }}
            />
        </a>
        <div className={ classes.details }>
            <CardContent className={ classes.content }>
                <Typography component="h5" variant="h5">
                    { title }
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    { time }
                </Typography>
                <LinearProgress variant="determinate" value={ progress } />
            </CardContent>
        </div>
    </Card>
);

export default withStyles(styles)(ProgramItem);
