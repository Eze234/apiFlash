import {
    Router,
} from "express";
import Package from "../../../package.json";
import { spotify } from "../../utils/spotify";
import { config } from "dotenv";
config();
const router = Router();

router.route("/").get(function(req, res) {
    res.json({
        ok: true,
        author: Package.author,
        version: Package.version,
    });
})

router.route("/text/:id").get(async function(req, res) {
    if (!req.params.id) {
        res.status(400).json({
            ok: false,
            message: "Por favor agregue una ID de discord y asegurate de estar en el discord de lanyard.\nhttps://discord.gg/9d4nuRD74x"
        });
        return;
    };

    const data: false | { song: string; author: string; url: string; } = await spotify(req.params.id) || false;

    if (data) {
        res.send(`[${data.song}](${data.url}) de ${data.author}`);
    } else {
        res.send(`[Nothing](${process.env.spotify || "https://spotify.com"})`)
    }
})

export default router