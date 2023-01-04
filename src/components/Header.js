import Link from '@material-ui/core/Link';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        color: '#4a8ce8',
        textDecoration: 'none !important',
    }
}));

export const Header = ({ setLoading }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleOnClickTitle = () => {
        navigate('/')
        setLoading(false);
    }
    return (
        <div className="title" name="title-header">
            <Link
                className={classes.title}
                variant="h6"
                component="button"
                onClick={() => {
                    setLoading(true)
                    handleOnClickTitle()
                }}
            >
                Podcaster
            </Link>
        </div>
    )
}
