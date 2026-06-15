// Skilld demo relay server — 7 specifieke endpoints
// Elke Stellar action heeft zijn eigen URL pad voor leesbare logs en strakke schema's per node.

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

// SSE-clients
const clients = new Set();

app.get('/events', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'X-Accel-Buffering': 'no',
  });
  res.flushHeaders();
  res.write(': connected\n\n');

  clients.add(res);
  console.log(`[SSE] Client verbonden (${clients.size} totaal)`);

  const heartbeat = setInterval(() => {
    res.write(': heartbeat\n\n');
  }, 25000);

  req.on('close', () => {
    clearInterval(heartbeat);
    clients.delete(res);
    console.log(`[SSE] Client weg (${clients.size} totaal)`);
  });
});

function broadcast(section, data) {
  const event = { section, data: data || {}, ts: Date.now() };
  console.log(`[POST] ${section}:`, JSON.stringify(data, null, 2));
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  for (const client of clients) client.write(payload);
  return clients.size;
}

// --- 7 specifieke endpoints, één per action ---

app.post('/api/naw', (req, res) => {
  const n = broadcast('naw', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/werkervaring', (req, res) => {
  const n = broadcast('werkervaring', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/kennis', (req, res) => {
  const n = broadcast('kennis', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/softskills', (req, res) => {
  const n = broadcast('softskills', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/talen', (req, res) => {
  const n = broadcast('talen', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/opleidingen', (req, res) => {
  const n = broadcast('opleidingen', req.body);
  res.json({ ok: true, broadcast_to: n });
});

app.post('/api/wensberoepen', (req, res) => {
  const n = broadcast('wensberoepen', req.body);
  res.json({ ok: true, broadcast_to: n });
});

// Backwards-compat: het oude generieke endpoint blijft werken
app.post('/api/update', (req, res) => {
  const { section, data } = req.body || {};
  if (!section) return res.status(400).json({ ok: false, error: 'Missing "section"' });
  const n = broadcast(section, data);
  res.json({ ok: true, broadcast_to: n });
});

// Config (publieke Stellar credentials via env vars)
app.get('/api/config', (req, res) => {
  const agentId = process.env.STELLAR_AGENT_ID;
  const token = process.env.STELLAR_TOKEN;
  if (!agentId || !token) {
    return res.status(500).json({ error: 'STELLAR_AGENT_ID en/of STELLAR_TOKEN niet geconfigureerd' });
  }
  res.json({ agentId, token });
});

// Reset
app.post('/api/reset', (req, res) => {
  const payload = `data: ${JSON.stringify({ section: '__reset__', ts: Date.now() })}\n\n`;
  for (const client of clients) client.write(payload);
  console.log('[POST] Reset getriggerd');
  res.json({ ok: true });
});

// Statische bestanden
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`\n  Skilld demo server draait op http://localhost:${PORT}`);
  console.log(`  Open de demo:    http://localhost:${PORT}/`);
  console.log(`  Endpoints:`);
  console.log(`    POST /api/naw`);
  console.log(`    POST /api/werkervaring`);
  console.log(`    POST /api/kennis`);
  console.log(`    POST /api/softskills`);
  console.log(`    POST /api/talen`);
  console.log(`    POST /api/opleidingen`);
  console.log(`    POST /api/wensberoepen`);
  console.log(`    POST /api/reset\n`);
  console.log(`  Voor publieke URL:  ngrok http ${PORT}\n`);
});
