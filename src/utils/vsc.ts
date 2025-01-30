import { discordData } from "./lanyard";

export async function vsc(id: String) {
    let exts = [
        "code",
        "visual studio code"
    ]
    const data = await discordData(id);
    const vscode = data.activities.find((activity: any) => exts.includes(activity.name.toLowerCase())) ?? false;

    if (vscode) {
        return {
            state: vscode?.state || "Nothing...",
            details: vscode?.details || "Wt..?"
        };
    } else {
        return false;
    }
}