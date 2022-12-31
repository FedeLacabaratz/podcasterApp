import { Routes, Route } from 'react-router-dom';
import { EpisodeDetail } from '../pages/EpisodeDetail';
import { HomePage } from '../pages/HomePage';
import { PodcastDetail } from '../pages/PodcastDetail';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/{podcastId}" element={<PodcastDetail />} />
                <Route path="/podcast/{podcastId}/episode/{episodeId}" element={<EpisodeDetail />} />
            </Routes>
        </>
    )
}
