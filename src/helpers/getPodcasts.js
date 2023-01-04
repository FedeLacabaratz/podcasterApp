import X2JS from "x2js"
const x2js = new X2JS();

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

export const getPodcastFeed = async (url) => {
    try {
        const resp = await fetch(`${url}`)
        const data = await resp.text()
        const jsonObj = await x2js.xml2js(data).rss.channel.item;
        return jsonObj
    } catch (error) {
        console.log(error)
    }
}

