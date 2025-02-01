import axios from "axios";

export async function discordData(id: String) {
    if (!id) throw new Error("Error, pls give a Discord ID");

    const request = await axios.get(`https://api.lanyard.rest/v1/users/${id}`).catch(() => null);
    
    if (!request || !request.data.success) throw new Error("Error in lanyard api");

    return request.data.data;
};