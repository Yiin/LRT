import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import LivePrograms from '../../containers/LivePrograms';

const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    container: {
        marginTop: theme.spacing.unit * 8,
    },
});

const IndexScene = ({ classes }) => {
    return (
        <main className={ classes.main }>
            <CssBaseline />
            <div className={ classes.container }>
                <Typography component="h1" variant="h3">
                    LRT Tiesiogiai
                </Typography>
                <LivePrograms />
            </div>
        </main>
    );
};

IndexScene.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndexScene);
