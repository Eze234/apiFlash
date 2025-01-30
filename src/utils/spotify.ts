import { discordData }  from "./lanyard";

export async function spotify(id: String) {
    const data = await discordData(id);
    const spotiData = data.spotify;

    if (spotiData) {
        return {
            song: spotiData?.song || "Spotify Artist",
            author: spotiData?.artist,
            url: `https://open.spotify.com/track/${spotiData.track_id}`
        };
    } else {
        return false;
    }
}