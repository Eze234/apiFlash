import express from "express";
import { config } from "dotenv";
import Package from "../package.json";
config();

const server = express();

server.listen(process.env.port, () => {
    console.log(`[API] => Api listening ${process.env.port} port.`)
})

// # Routes
import spotify from "./routes/v1/spotify";
import vsc from "./routes/v1/vsc";

server.get("/", (req: express.Request, res: express.Response) => {
    res.json({
        author: Package.author,
        version: Package.version,
        api: true
    })
})

server.use("/spotify/v1", spotify);
server.use("/vsc/v1", vsc)