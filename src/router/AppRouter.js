import { Routes, Route } from 'react-router-dom';
import { HomePage, EpisodeDetail, PodcastDetail } from '../pages';

export const AppRouter = ({ setLoading, podcasts, searchResults, setSearchResults, setError }) => {
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        <HomePage
                            setLoading={setLoading}
                            podcasts={podcasts}
                            searchResults={searchResults}
                            setSearchResults={setSearchResults}
                            setError={setError}
                        />
                    }
                />
                <Route path="/podcast/{podcastId}" element={<PodcastDetail />} />
                <Route path="/podcast/{podcastId}/episode/{episodeId}" element={<EpisodeDetail />} />
            </Routes>
        </>
    )
}
