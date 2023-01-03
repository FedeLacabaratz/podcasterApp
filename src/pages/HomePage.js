import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { PodcastDetail } from './';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: '#4a8ce8',
        borderBottom: '1px solid lightgrey',
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: '1.5rem',
        height: '1.5rem',
        width: '100%',
        justifyContent: 'flex-end',
        margin: 0
    },
    counter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.1rem',
        width: '2rem',
        pointerEvents: 'none',
        backgroundColor: '#4a8ce8',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '6px',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        width: '15rem',
        margin: '0 1rem',
        padding: '0.5rem',
        border: '1px solid lightgrey',
    },
}));

export const HomePage = ({ setLoading, podcasts, searchResults, setSearchResults, setError }) => {
    const classes = useStyles();

    const handleOnInputChange = (e) => {
        const inputValue = e?.target?.value.toLowerCase()
        if (!!inputValue && !!inputValue.length) {
            const result = !!podcasts.length ? podcasts.filter(p => p?.name.toLowerCase().indexOf(inputValue) > -1) : []
            setSearchResults(result)
        } else {
            setLoading(true);
            setTimeout(() => { // Esto lo hice para simular una query vacía que vuelve a hacer un getAll y carga nuevamente los 100 resultados originales.
                setSearchResults(podcasts)
                setLoading(false);
            }, 1000);
        }
    }

    return (
        <>
            <div className={`${classes.root} titleSearchBar`} name="title-searchBar">
                <Typography
                    className={classes.title}
                    variant="h6"
                    noWrap
                >
                    Podcaster
                </Typography>
                <div className={classes.search}>
                    <div className={classes.counter}>
                        {podcasts.length}
                    </div>
                    <InputBase
                        placeholder="Filter podcasts…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={handleOnInputChange}
                    />
                </div>
            </div>
            <div className="podcastsList" name="podcasts">
                <PodcastDetail
                    searchResults={searchResults}
                    setLoading={setLoading}
                    setError={setError}
                />
            </div>
        </>
    )
}
