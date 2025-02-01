import { discordData }  from "./lanyard";

export async function spotify(id: String) {
    const data = await discordData(id);
    const spotiData = data.spotify;

    if (spotiData) {
        return {
            song: spotiData?.song || "Spotify Artist",
            author: spotiData?.artist,
            url: `https://open.spotify.com/track/${spotiData.track_id}`,
            album_art_url: spotiData?.album_art_url || "https://cdn.discordapp.com/attachments/848181072835772466/1335348234813702154/image.png?ex=679fd774&is=679e85f4&hm=be3f8f7939ad49df675fee5de20746cbff11361f03a2247329bff11b11f6cfe9&"
        };
    } else {
        return false;
    }
}