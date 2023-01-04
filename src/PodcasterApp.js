import { useState, useEffect } from 'react';
import { AppRouter } from './router/AppRouter';
import { getPodcasts } from './helpers/getPodcasts';
import { setPodcastsWithExpiry, getPodcastsWithExpiry } from './hooks/useLocalStorage';


export const PodcasterApp = () => {

    const [podcasts, setPodcasts] = useState(getPodcastsWithExpiry('podcasts'))
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        if (!!podcasts.length) {
            setSearchResults(podcasts);
            return;
        } 
        setLoading(true);
        getPodcasts()
            .then(resp => {
                const convertedData = resp?.data?.map(i => {
                    const obj = {
                        id: i?.id?.attributes?.['im:id'],
                        name: i?.['im:name']?.label,
                        image: i?.['im:image']?.map(im => (im?.label)),
                        author: i?.['im:artist']?.label,
                        summary: i?.summary?.label,
                    }
                    return obj
                })
                setPodcastsWithExpiry('podcasts', convertedData)
                setPodcasts(convertedData);
                setSearchResults(convertedData);
                setError(null);
            })
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading && (
                <div className="loading">
                    <span className="loader" />
                </div>
            )}
            <AppRouter
                setLoading={setLoading}
                podcasts={podcasts}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
                setError={setError}
            />
        </>
    )
}
