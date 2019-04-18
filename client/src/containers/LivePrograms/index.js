import React, { useState, useMemo, useEffect } from 'react';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import ReloadIcon from '@material-ui/icons/Autorenew';
import withStyles from '@material-ui/core/styles/withStyles';
import ProgramItem from '../../components/ProgramItem';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 4,
    },
    reloadButton: {
        marginTop: theme.spacing.unit * 4,
    },
});

const LivePrograms = ({ classes }) => {
    const [currentShows, setCurrentShows] = useState(null);
    const [loading, setLoading] = useState(false);

    const getCurrentRadioShow = useMemo(() => async () => {
        setLoading(true);

        try {
            const response = await Axios.get(
                `${process.env.REACT_APP_API_URL}/live`
            );
            if (response.data) {
                const transformedData = response.data.map(show => ({
                    ...show,
                    progress: +show.progress.replace('%', ''),
                    // Progress comes as string '37%'.
                    // Ditch the percentage sign and convert to number.
                }));
                setCurrentShows(transformedData);
            }
        } finally {
            setLoading(false);
        }
    });

    useEffect(() => {
        getCurrentRadioShow();
    }, []);

    if (!currentShows) {
        return (
            <CircularProgress classes={ { root: classes.root } } />
        );
    }

    return (
        <div className={ classes.root }>
            { currentShows.map(show => (
                <ProgramItem {...show} />
            )) }

            <Fab
                onClick={ getCurrentRadioShow }
                color="primary"
                className={ classes.reloadButton }
                disabled={ loading }
            >
                <ReloadIcon className={classes.extendedIcon} />
            </Fab>
        </div>
    );
};

export default withStyles(styles)(LivePrograms);
