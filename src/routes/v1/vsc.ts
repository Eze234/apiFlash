import {
    Router,
} from "express";
import Package from "../../../package.json";
const router = Router();
import { vsc } from "../../utils/vsc";

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
    }

    const data: false | { state: string, details: string } = await vsc(req.params.id) || false;

    if (data) {
        res.send(`${data.state} - ${data.details}`);
    } else {
        res.send("Nothing...")
    }
})

export default router