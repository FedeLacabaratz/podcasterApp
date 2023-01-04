import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import { Header, PodcastContainer, SideCard } from '../components';
import { getPodcastFeed } from '../helpers/getPodcasts';
import { getPodcastsWithExpiry, setPodcastsWithExpiry } from '../hooks/useLocalStorage';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export const PodcastDetail = ({ podcasts, setLoading, setError }) => {
    const classes = useStyles();
    const podcastDetail = getPodcastsWithExpiry('podcastDetail')?.[0]
    const podcast = podcasts.find(p => Number(p.id) === podcastDetail?.collectionId)

    useEffect(() => {
        if (!podcastDetail) return;
        getPodcastFeed(podcastDetail?.feedUrl)
            .then(resp => {
                setPodcastsWithExpiry('podcastFeed', resp)
                setError(null);
            })
            .catch(err => setError(err))
            .finally(() => {
                setLoading(false)
            });
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
