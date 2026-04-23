// api/decrement-stock.js
// Decrements stock by 1 after successful payment

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    // Get current stock
    const getRes = await fetch(`${url}/get/cap_stock`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const getData = await getRes.json();
    let stock = getData.result !== null ? parseInt(getData.result) : 5;

    if (stock <= 0) {
      return res.status(400).json({ error: 'Out of stock', stock: 0 });
    }

    // Decrement
    const newStock = stock - 1;
    await fetch(`${url}/set/cap_stock/${newStock}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });

    res.status(200).json({ success: true, stock: newStock });
  } catch (err) {
    console.error('Decrement error:', err);
    res.status(500).json({ error: err.message });
  }
};
