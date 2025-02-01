import {
    Router,
} from "express";
import Package from "../../../package.json";
import { spotify } from "../../utils/spotify";
import { config } from "dotenv";
import {
    createCanvas,
    loadImage
} from "canvas";
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

router.route("/image/:id").get(async function(req, res) {
    if (!req.params.id) {
        res.status(400).json({
            ok: false,
            message: "Por favor agregue una ID de discord y asegurate de estar en el discord de lanyard.\nhttps://discord.gg/9d4nuRD74x"
        });
        return;
    };

    const data: false | { song: string, author: string, url: string, album_art_url: string } = await spotify(req.params.id) || false;

    if (data && data.author) {
        const background = data.album_art_url;
        const width = 800;
        const height = 400;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        const image = await loadImage(background);
        
        ctx.drawImage(image, 0, 0, width, height);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, height - 100, width, 100);

        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Spotify", 630, height - 20);
        ctx.font = "bold 40px Arial";
        ctx.fillText(`${data?.song || "Loca"}`, 20, height - 20);
        ctx.font = "bold 40px Arial";
        ctx.fillText(`${data?.author || "C.R.O"}`, 20, height - 60);
        const buffer = canvas.toBuffer();
        res.set("Content-Type", "image/png");
        res.send(buffer);
    } else {
        const width = 800;
        const height = 400;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext("2d");
        
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, height - 100, width, 100);

        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Spotify", 630, height - 20);
        ctx.font = "bold 60px Arial";
        ctx.fillText("Nothing", 20, height - 20);
        const buffer = canvas.toBuffer();
        res.set("Content-Type", "image/png");
        res.send(buffer);
    }

})

export default router