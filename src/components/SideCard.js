import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        height: '100%',
        width: '100%',
        boxShadow: '0 0 10px',
        backgroundColor: 'inherit',
    },
    cardContent1: {
        height: '7%',
        borderBottom: '1px solid lightgray',
        margin: '0 1rem',
        padding: '1rem 0',
    },
    cardContent2: {
        height: '48%',
        borderBottom: '1px solid lightgray',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: '0 1rem',
        padding: '1rem 0',
    },
    cardMedia: {
        height: '30%',
        width: '89%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1rem 1rem 0 1rem',
        cursor: 'pointer',
        paddingBottom: '1rem',
        borderBottom: '1px solid lightgray',
        '& > img': {
            width: '100%',
        }
    },
    '& .MuiCardMedia-img': {
        objectFit: 'contain',
    },
    title: {
        fontSize: '0.9rem',
        textAlign: 'left',
        cursor: 'pointer',
    },
    subtitle: {
        fontSize: '0.8rem',
        textAlign: 'left',
    },
    text: {
        fontSize: '0.725rem',
        textAlign: 'justify',
    }
});

export const SideCard = ({ podcast, item, setLoading }) => {
    const navigate = useNavigate();

    const handleOnRerouting = (e) => {
        e.preventDefault()
        navigate(`/podcast/${podcast?.id}`)
        setLoading(false)
    }

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                id={`${item?.collectionId}`}
                className={classes.cardMedia}
                component="img"
                alt={`${item?.collectionName}`}
                image={`${item?.artworkUrl600}`}
                title={`${item?.collectionName}`}
                onClick={(e) => {
                    setLoading(true)
                    handleOnRerouting(e)
                }}
            />
            <CardContent
                className={classes.cardContent1}
            >
                <Typography
                    className={classes.title}
                    gutterBottom
                    variant="inherit"
                    component="h5"
                    onClick={(e) => {
                        setLoading(true)
                        handleOnRerouting(e)
                    }}
                    >
                    {`${item?.collectionName}`}
                </Typography>
                <Typography
                    className={classes.text}
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {`by ${item?.artistName}`}
                </Typography>
            </CardContent>
            <CardContent
                className={classes.cardContent2}
            >
                <Typography
                    className={classes.subtitle}
                    gutterBottom
                    variant="inherit"
                    component="h5">
                    {`Description: `}
                </Typography>
                <Typography
                    className={classes.text}
                    variant="body2"
                    color="textSecondary"
                    component="p">
                    {`${podcast?.summary}`}
                </Typography>
            </CardContent>
        </Card>
    )
}
