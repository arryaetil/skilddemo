# Stellar Studio — 7 Actions

Per action: **Name**, **Description**, **HTTP method**, **URL** (vervang ngrok-URL),
**Parameters schema**, **Request body template**.

Voor alle actions:
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Base URL**: `https://JOUW-NGROK-URL.ngrok-free.dev`

---

## 1. `update_naw`

**Name:** `update_naw`

**Description:**
```
Updates the user's general information (NAW: name, email, location, age) on the live skill profile page.
Call this after the user has confirmed their personal details from the CV.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/naw`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "first_name": { "type": "string", "description": "First name of the user" },
    "last_name": { "type": "string", "description": "Last name of the user" },
    "email": { "type": "string", "description": "Email address" },
    "location": { "type": "string", "description": "City or place of residence" },
    "age": { "type": "number", "description": "Age in years" }
  },
  "required": ["first_name", "last_name"]
}
```

**Request body template:**
```
{
  "first_name": "{{.parameters.first_name}}",
  "last_name": "{{.parameters.last_name}}",
  "email": "{{.parameters.email}}",
  "location": "{{.parameters.location}}",
  "age": {{.parameters.age}}
}
```

---

## 2. `update_werkervaring`

**Name:** `update_werkervaring`

**Description:**
```
Updates the user's work experience list on the live skill profile page.
Always send the COMPLETE list of jobs (not just additions or changes).
Call this after the user has confirmed or corrected their work experience from the CV.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/werkervaring`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "jobs": {
      "type": "array",
      "description": "Complete list of jobs in chronological order, most recent last.",
      "items": {
        "type": "object",
        "properties": {
          "title": { "type": "string", "description": "Job title or role" },
          "company": { "type": "string", "description": "Employer name" },
          "from": { "type": "string", "description": "Start date in 'maand jaar' format, e.g. 'januari 2017'" },
          "to": { "type": "string", "description": "End date in 'maand jaar' format, or 'heden' for current job" }
        },
        "required": ["title"]
      }
    }
  },
  "required": ["jobs"]
}
```

**Request body template:**
```
{
  "jobs": {{.parameters.jobs}}
}
```

---

## 3. `update_kennis`

**Name:** `update_kennis`

**Description:**
```
Updates the user's hard skills / knowledge & abilities list on the live skill profile page.
Use for technical skills, tools, methods, domain knowledge (NOT for soft skills like communication or teamwork — those go to update_softskills).
Always send the COMPLETE list of skills accumulated so far in the conversation.
Each skill defaults to a 3-star rating.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/kennis`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "skills": {
      "type": "array",
      "description": "Complete list of hard skill names accumulated so far.",
      "items": { "type": "string" }
    }
  },
  "required": ["skills"]
}
```

**Request body template:**
```
{
  "skills": {{.parameters.skills}}
}
```

---

## 4. `update_softskills`

**Name:** `update_softskills`

**Description:**
```
Updates the user's soft skills list on the live skill profile page.
Use ONLY for soft skills like 'analytisch', 'creatief', 'verantwoordelijkheid', 'gemotiveerd', 'samenwerken', 'communicatief'.
Do NOT include languages or hard/technical skills.
Always send the COMPLETE list of soft skills.
Each skill defaults to a 3-star rating.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/softskills`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "skills": {
      "type": "array",
      "description": "Complete list of soft skill names.",
      "items": { "type": "string" }
    }
  },
  "required": ["skills"]
}
```

**Request body template:**
```
{
  "skills": {{.parameters.skills}}
}
```

---

## 5. `update_talen`

**Name:** `update_talen`

**Description:**
```
Updates the user's languages list on the live skill profile page.
Always send the COMPLETE list of languages with their proficiency levels.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/talen`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "talen": {
      "type": "array",
      "description": "Complete list of languages with proficiency levels.",
      "items": {
        "type": "object",
        "properties": {
          "taal": { "type": "string", "description": "Language name in Dutch, e.g. 'Nederlands', 'Engels', 'Duits'" },
          "niveau": { "type": "string", "description": "Proficiency level, e.g. 'Moedertaal', 'Vloeiend', 'Goed', 'Basis'" }
        },
        "required": ["taal"]
      }
    }
  },
  "required": ["talen"]
}
```

**Request body template:**
```
{
  "talen": {{.parameters.talen}}
}
```

---

## 6. `update_opleidingen`

**Name:** `update_opleidingen`

**Description:**
```
Updates the user's education list on the live skill profile page.
Always send the COMPLETE list of educations.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/opleidingen`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "opleidingen": {
      "type": "array",
      "description": "Complete list of educations.",
      "items": {
        "type": "object",
        "properties": {
          "instituut": { "type": "string", "description": "Name of the educational institution" },
          "opleiding": { "type": "string", "description": "Name of the study or program" },
          "niveau": { "type": "string", "description": "Level, e.g. 'Wo/bachelor', 'Wo/master', 'Hbo', 'Mbo'" },
          "from": { "type": "string", "description": "Start date in 'maand jaar' format" },
          "to": { "type": "string", "description": "End date in 'maand jaar' format, or 'heden'" }
        },
        "required": ["instituut", "opleiding"]
      }
    }
  },
  "required": ["opleidingen"]
}
```

**Request body template:**
```
{
  "opleidingen": {{.parameters.opleidingen}}
}
```

---

## 7. `update_wensberoepen`

**Name:** `update_wensberoepen`

**Description:**
```
Updates the user's desired professions (wensberoepen) on the live skill profile page.
Maximum 2 wensberoepen. Send the complete list, even if the user adds them one by one.
```

**URL:** `https://JOUW-NGROK-URL.ngrok-free.dev/api/wensberoepen`

**Parameters schema:**
```json
{
  "type": "object",
  "properties": {
    "wensberoepen": {
      "type": "array",
      "description": "Complete list of desired professions, max 2 items.",
      "items": { "type": "string" },
      "maxItems": 2
    }
  },
  "required": ["wensberoepen"]
}
```

**Request body template:**
```
{
  "wensberoepen": {{.parameters.wensberoepen}}
}
```

---

## Welke action in welke node

| Node | Action |
|---|---|
| 1. Begroeting | — |
| 2. NAW bevestigen | `update_naw` |
| 3. Beroepen tonen/valideren | `update_werkervaring` |
| 4. Twee recentste verifiëren | — (eventueel `update_werkervaring` opnieuw bij correctie) |
| 5. Wensberoepen | `update_wensberoepen` |
| 6. Skills recent beroep 1 | `update_kennis` |
| 7. Skills recent beroep 2 | `update_kennis` (complete lijst) |
| 8. Skills wensberoep | `update_kennis` (complete lijst) |
| 9. Skills uit cv valideren | `update_softskills` (soft skills) en/of `update_kennis` (hard skills) |
| 10. Talen | `update_talen` |
| 11. Hoogst genoten opleiding | `update_opleidingen` |
| 12. Overzicht | — |

---

## Test handmatig zonder Stellar

```bash
# NAW
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/naw \
  -H "Content-Type: application/json" \
  -d '{"first_name":"Robin","last_name":"Rabeling","email":"robin@example.com","location":"Heerlen","age":34}'

# Werkervaring
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/werkervaring \
  -H "Content-Type: application/json" \
  -d '{"jobs":[{"title":"Data scientist","company":"test","from":"januari 2017","to":"januari 2020"},{"title":"Data engineer","company":"test","from":"januari 2020","to":"heden"}]}'

# Kennis
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/kennis \
  -H "Content-Type: application/json" \
  -d '{"skills":["Python","SQL","Machine learning","Data visualisatie"]}'

# Softskills
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/softskills \
  -H "Content-Type: application/json" \
  -d '{"skills":["Analytisch","Creatief","Gemotiveerd","Verantwoordelijkheid"]}'

# Talen
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/talen \
  -H "Content-Type: application/json" \
  -d '{"talen":[{"taal":"Nederlands","niveau":"Moedertaal"},{"taal":"Engels","niveau":"Vloeiend"}]}'

# Opleidingen
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/opleidingen \
  -H "Content-Type: application/json" \
  -d '{"opleidingen":[{"instituut":"Universiteit van Amsterdam","opleiding":"Analytical Chemistry","niveau":"Wo/bachelor","from":"januari 2016","to":"januari 2021"}]}'

# Wensberoepen
curl -X POST https://JOUW-NGROK-URL.ngrok-free.dev/api/wensberoepen \
  -H "Content-Type: application/json" \
  -d '{"wensberoepen":["Drone piloot"]}'
```
