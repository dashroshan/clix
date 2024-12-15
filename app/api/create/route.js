import { db, dbGet } from "../../lib/db";

// Creates the DB entry for shortlink
export async function POST(req, res) {
    let { long, code } = await req.json();

    // Check if both long and valid are defined
    // long is a url (contains a ".")
    // code is not "undefined" (path of 404 page)
    if (!long || !long.includes(".") || !code || code === "undefined") return new Response(null, { status: 400 });

    // Check if the code already exists in DB
    const { count } = await dbGet("SELECT COUNT(*) AS count FROM links WHERE code = ?", code);
    if (count > 0) return new Response(null, { status: 409 });

    // Add "https://" to long link if not already there
    if (!/^https?:\/\//i.test(long)) long = "https://" + long;

    // Insert the entry in DB and return success
    db.run("INSERT INTO links (long, code) VALUES (?, ?)", [long, code]);
    return new Response(null, { status: 200 });
}