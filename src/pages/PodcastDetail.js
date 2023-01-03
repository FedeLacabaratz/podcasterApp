import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getPodcastDetail } from '../helpers/getPodcasts';

const useStyles = makeStyles({
    root: {
        height: '20rem',
        width: '14rem',
        marginBottom: '2rem',
    },
    cardContent: {
        height: '30%',
    },
    cardMedia: {
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        '& > img': {
            borderRadius: '10px',
            width: '100%',
        }
    },
    '& .MuiCardMedia-img': {
        objectFit: 'contain',
    },
    title: {
        fontSize: '0.725rem',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '0.8rem',
        textAlign: 'center',
    }
});


export const PodcastDetail = ({ searchResults, setLoading, setError }) => {
    const classes = useStyles();

    const [podcastDetail, setPodcastDetail] = useState(null)

    const handleOnClickCard = (e) => {
        setLoading(true);
        getPodcastDetail(e?.target?.id)
            .then(resp => {
                setPodcastDetail(resp?.results);
                setError(null);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }
    console.log(podcastDetail)
    return (
        <>
            {!!searchResults.length ?
                searchResults.map(i => (
                    <Card
                        key={`${i?.id}-${uuidv4()}`}
                        className={classes.root}
                        onClick={(e) => {
                            setPodcastDetail(null)
                            handleOnClickCard(e)
                        }}
                    >
                        <CardMedia
                            id={`${i?.id}`}
                            className={classes.cardMedia}
                            component="img"
                            alt={`${i?.name}`}
                            image={`${i?.image[2]}`}
                            title={`${i?.name}`}
                        />
                        <CardContent
                            className={classes.cardContent}
                        >
                            <Typography
                                className={classes.title}
                                gutterBottom
                                variant="inherit"
                                component="h5">
                                {`${i?.name.toUpperCase()}`}
                            </Typography>
                            <Typography
                                className={classes.subtitle}
                                variant="body2"
                                color="textSecondary"
                                component="p">
                                {`Author: ${i?.author}`}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
                :
                'No se encontraron resultados'
            }
        </>
    )
}
