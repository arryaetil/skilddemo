# Skilld × Stellar — Live demo

Live demo waarin de Stellar chat agent **Job** een skillsprofiel opbouwt
op de pagina terwijl het gesprek loopt. Gebaseerd op echte API call
actions vanuit Stellar Studio.

## Architectuur

```
  Browser (skillsprofiel pagina)
    │
    │  ↑ EventSource SSE stream (/events)
    │  └── leest live updates
    │
  Node.js relay (server.js, localhost:3000)
    │
    │  ↑ POST /api/update
    │
  ngrok tunnel (publieke URL)
    │
    │  ↑ POST vanuit Stellar action "update_profile"
    │
  Stellar Studio (Job agent)
```

## Setup

### 1. Dependencies installeren

```bash
npm install
```

### 2. Server starten

```bash
npm start
```

Output:
```
Skilld demo server draait op http://localhost:3000
```

Open http://localhost:3000 in je browser. Linksboven staat een groen "Live"-indicator zodra de SSE-verbinding actief is.

### 3. ngrok tunnel starten

In een **tweede terminal**:

```bash
ngrok http 3000
```

Output:
```
Forwarding  https://abc-123-456.ngrok-free.app -> http://localhost:3000
```

Kopieer die `https://...ngrok-free.app` URL.

### 4. Stellar action configureren

Open Stellar Studio en maak één action aan: `update_profile`.
Volledige config staat in `STELLAR-ACTIONS.md`.

Belangrijkste:
- **URL**: `https://JOUW-NGROK-URL.ngrok-free.app/api/update`
- **Method**: POST
- **Body**: `{"section": "{{.parameters.section}}", "data": {{.parameters.data}}}`

In elke node die data moet versturen, voeg je de action `update_profile`
toe en geef je instructie wat de section en data moeten zijn (zie
`STELLAR-ACTIONS.md` per node).

### 5. Testen

Open de demo-pagina, start een gesprek met Job, en kijk hoe het profiel
zich vult terwijl je antwoorden geeft.

In de terminal van de server zie je elke binnenkomende call.

## Handmatig testen zonder Stellar

```bash
curl -X POST http://localhost:3000/api/update \
  -H "Content-Type: application/json" \
  -d '{
    "section": "naw",
    "data": {
      "first_name": "Robin",
      "last_name": "Rabeling",
      "email": "robin@example.com",
      "location": "Heerlen",
      "age": 34
    }
  }'
```

## Reset

- Knop rechtsboven op de pagina, **of**
- `curl -X POST http://localhost:3000/api/reset`

## Bestanden

- `server.js` — Express + SSE relay
- `public/index.html` — Skillprofiel pagina met live updates en chat widget
- `STELLAR-ACTIONS.md` — Action config en body per node
- `package.json` — dependencies (express, cors)
