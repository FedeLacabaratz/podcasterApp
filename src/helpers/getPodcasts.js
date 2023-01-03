

export const getPodcasts = async () => {
    try {
        const resp = await fetch(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)
        const data = await resp.json()
        const myResults = {
            updatedDate: data?.feed?.updated?.label,
            data: data?.feed?.entry
        }
        return myResults
    } catch (error) {
        console.log(error)
    }
}

export const getPodcastDetail = async (podcastId) => {
    try {
        const resp = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}`)
        const data = await resp.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

