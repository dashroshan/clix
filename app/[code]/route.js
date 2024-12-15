import { dbGet } from "../lib/db";

// Re-direct shortlinks
export async function GET(req, res) {
    // Get shortlink code
    const code = req.url.split("/").pop();

    // Get its entry from DB
    const result = await dbGet("SELECT long FROM links WHERE code = ?", code);

    // Re-direct to long link if valid, else to the undefined 404 page
    return new Response(null, {
        status: 302,
        headers: {
            Location: (result) ? result.long : "/undefined"
        }
    });
}