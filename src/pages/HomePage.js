import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../components';
import { setPodcastsWithExpiry } from '../hooks/useLocalStorage';
import { PodcastsList } from './';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    search: {
        display: 'flex',
        flexDirection: 'row',
        height: '2.3rem',
        width: '100%',
        justifyContent: 'flex-end',
        marginBottom: '2rem',
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
            <div className={classes.root} name="header-searchBar">
                <Header
                    setLoading={setLoading}
                />
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
            <PodcastsList
                podcasts={podcasts}
                searchResults={searchResults}
                setLoading={setLoading}
                setError={setError}
            />
        </>
    )
}
