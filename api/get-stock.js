// api/get-stock.js
// Returns current stock level from Upstash Redis

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    const response = await fetch(`${url}/get/cap_stock`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    let stock = data.result !== null ? parseInt(data.result) : 5;

    res.status(200).json({ stock });
  } catch (err) {
    console.error('Stock fetch error:', err);
    // Default to 5 if redis fails
    res.status(200).json({ stock: 5 });
  }
};
