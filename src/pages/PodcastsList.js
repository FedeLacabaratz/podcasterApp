import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { getPodcastDetail } from '../helpers/getPodcasts';
import { MainCard } from '../components';
import { setPodcastsWithExpiry } from '../hooks/useLocalStorage';

export const PodcastsList = ({ searchResults, setLoading, setError }) => {
    const navigate = useNavigate();

    const handleOnClickCard = (e) => {
        setLoading(true);
        let data
        getPodcastDetail(e?.target?.id)
            .then(resp => {
                data = resp?.results?.[0]
                setPodcastsWithExpiry('podcastDetail', data)
                setError(null);
            })
            .catch(err => setError(err))
            .finally(() => {
                navigate(`/podcast/${e?.target?.id}`)
                setLoading(false)
            });
    }

    return (
        <>
            <div className="podcastsList" name="podcasts">
                {!!searchResults.length ?
                    searchResults.map(i => (
                        <MainCard
                            key={`${i?.id}-${uuidv4()}`}
                            item={i}
                            handleOnClickCard={handleOnClickCard}
                        />
                    ))
                    :
                    'No se encontraron resultados'
                }
            </div>
        </>
    )
}
