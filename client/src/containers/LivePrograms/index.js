import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';
import ProgramItem from '../../components/ProgramItem';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 4,
    },
});

const LivePrograms = ({ classes }) => {
    const [currentShows, setCurrentShows] = useState(null);

    useEffect(() => {
        const getCurrentRadioShow = async () => {
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
        };
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
        </div>
    );
};

export default withStyles(styles)(LivePrograms);
