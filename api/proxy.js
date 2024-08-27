// api/omdb.js
export default async function handler(req, res) {
	const { query } = req;

	const apiUrl = `https://www.omdbapi.com/?${new URLSearchParams(
		query
	).toString()}`;

	try {
		const response = await fetch(apiUrl, {});

		// Clone the response and manipulate headers if necessary
		res.setHeader("Access-Control-Allow-Origin", "*"); // Handle CORS
		res.setHeader("Cache-Control", "s-maxage=86400"); // Adjust cache if needed

		// Remove unwanted headers
    res.removeHeader('vary');
    res.removeHeader('Vary');

		const data = await response.json();
		return res.status(response.status).json(data);
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
