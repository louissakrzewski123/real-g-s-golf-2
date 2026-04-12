module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { order } = req.body;

    const itemsList = order.items.map(item =>
      `- ${item.name} x${item.quantity} — $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const emailBody = `
NEW ORDER — Real G's Golf

Order ID: ${order.id}
Date: ${new Date().toLocaleString('en-AU')}

CUSTOMER
Name: ${order.customer.name}
Email: ${order.customer.email}

SHIPPING ADDRESS
${order.shipping.address}
${order.shipping.city}, ${order.shipping.state} ${order.shipping.postcode}
${order.shipping.country}

ITEMS ORDERED
${itemsList}

TOTAL: $${order.total.toFixed(2)} AUD
    `.trim();

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'orders@realggsgolf.com',
        to: process.env.YOUR_EMAIL,
        subject: `New Order #${order.id} — $${order.total.toFixed(2)} AUD`,
        text: emailBody
      })
    });

    if (!response.ok) throw new Error('Email send failed');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Notification error:', err);
    res.status(500).json({ error: err.message });
  }
};
