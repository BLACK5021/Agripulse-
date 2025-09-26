const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory marketplace (simple MVP)
const marketplace = [];

// Static frontend
app.use('/', express.static(path.join(__dirname, '..', 'frontend')));

// Health check
app.get('/api/ping', (req, res) => res.json({status: 'ok', service: 'AgriPulse MVP'}));

// Simple rule-based advisory endpoint
app.post('/api/advice', (req, res) => {
  const { crop, location } = req.body || {};
  if (!crop || !location) {
    return res.status(400).json({ error: 'crop and location required' });
  }
  const rules = {
    maize: 'Irrigate weekly. Apply NPK 23:23:0 at planting and top-up with nitrogen after 4 weeks. Watch for fall armyworm.',
    beans: 'Ensure well-drained soil. Use rhizobium inoculant if available. Avoid waterlogging.',
    potatoes: 'Plant in ridges, apply compost, and monitor for blight. Irrigate twice a week during tuber formation.',
    default: 'Rotate crops annually, add organic matter, and avoid waterlogging. Consult extension services for local practices.'
  };
  const key = crop.toLowerCase();
  const advice = rules[key] || rules['default'];
  // Mocked simple weather hint
  const weatherHint = 'Short-term forecast: occasional showers expected in the next 5 days.';
  return res.json({ crop, location, advice, weatherHint });
});

// Marketplace endpoints
app.get('/api/listings', (req, res) => {
  res.json({ listings: marketplace });
});

app.post('/api/listings', (req, res) => {
  const { farmerName, crop, quantity, price, location } = req.body || {};
  if (!farmerName || !crop || !quantity) {
    return res.status(400).json({ error: 'farmerName, crop and quantity required' });
  }
  const id = Date.now().toString(36);
  const listing = { id, farmerName, crop, quantity, price: price||'market', location: location||'unknown', createdAt: new Date() };
  marketplace.unshift(listing);
  res.json({ success: true, listing });
});

// Simple contact/message endpoint (placeholder for SMS integration)
app.post('/api/send-sms', (req, res) => {
  // In production integrate with Africa's Talking or Twilio here.
  const { phone, message } = req.body || {};
  if (!phone || !message) return res.status(400).json({ error: 'phone and message required' });
  console.log('SMS placeholder:', phone, message);
  return res.json({ success: true, info: 'SMS queued (placeholder)' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`AgriPulse backend running on port ${PORT}`));
