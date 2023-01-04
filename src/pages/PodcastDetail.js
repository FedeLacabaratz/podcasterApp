import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Header, PodcastContainer, SideCard } from '../components';
import { getPodcastsWithExpiry, setPodcastsWithExpiry } from '../hooks/useLocalStorage';
import { getPodcastFeed } from '../helpers/getPodcasts';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export const PodcastDetail = ({ podcasts, setLoading, setError }) => {
    const classes = useStyles();
    const podcastDetail = getPodcastsWithExpiry('podcastDetail')
    const podcast = podcasts.find(p => Number(p.id) === podcastDetail?.collectionId)

    useEffect(() => {
        if (!podcastDetail) return;
        getPodcastFeed(podcastDetail?.feedUrl)
            .then(resp => {
                setPodcastsWithExpiry('podcastFeed', resp)
                setError(null);
            })
            .catch(err => setError(err))
    }, [])

    return (
        <>
            <div className={classes.root} name="header">
                <Header setLoading={setLoading} />
            </div>
            <div className="mainContainer" name="mainContainer">
                <div className="leftSideCard" name="leftSideCard">
                    <SideCard
                        podcast={podcast}
                        item={podcastDetail}
                        setLoading={setLoading}
                    />
                </div>
                <div className="rightSideContainer" name="rightSideContainer">
                    <PodcastContainer
                        podcast={podcast}
                        item={podcastDetail}
                    />
                </div>
            </div>
        </>
    )
}
