import { Header } from '../components';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

export const EpisodeDetail = ({ setLoading }) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root} name="header">
                <Header setLoading={setLoading}/>
            </div>
            <div>EpisodeDetail here!!</div>
        </>
    )
}