# 🧅 Tor Network Health

A lightweight public-good tool that helps users understand whether Tor is slow due to **network conditions**, not their device or connection.

This project uses **only public Tor network metadata** to present real-time network health, regional conditions, trends, and short-term history.

No tracking. No analytics. No dark web access.

---

## 🌍 What this tool does

- Uses **public Tor network metadata (Onionoo API)**
- Analyzes **relay availability across regions**
- Shows **overall Tor network health**
  - Healthy
  - Degraded
  - Unstable
- Displays **regional status**
  - Asia
  - Europe
  - Americas
- Indicates **short-term trends**
  - Improving
  - Stable
  - Worsening
- Visualizes **recent network history** with a simple chart

This helps users answer a common question:

> *“Is Tor slow because of the network, or is it just me?”*

---

## 🚫 What this tool does NOT do

- ❌ Does not browse or index onion (.onion) sites  
- ❌ Does not track users or store IP addresses  
- ❌ Does not use cookies or analytics  
- ❌ Does not recommend exit nodes or routes  
- ❌ Does not attempt to optimize or influence Tor usage  

This tool is **observational only**.

---

## 🔐 Privacy & Ethics

- No cookies  
- No analytics  
- No user data  
- No fingerprinting  

All processing is:
- anonymous  
- server-side  
- based entirely on **public Tor metadata**

The goal is to **reduce user frustration** and improve understanding — not to monitor users or interfere with Tor.

---

## 🧠 How it works (high level)

1. A Cloudflare Worker fetches public Tor metadata from the Onionoo API
2. Relay data is grouped by region
3. Simple thresholds determine health status
4. Anonymous snapshots are stored for short-term history
5. A static frontend displays the results clearly

All infrastructure runs on **free Cloudflare services**.

---

## 🛠 Tech Stack

- **Cloudflare Workers** — backend processing
- **Cloudflare KV** — anonymous short-term history storage
- **Cloudflare Pages** — static frontend hosting
- **Chart.js** — lightweight history visualization
- **Vanilla HTML / CSS / JavaScript** — no frameworks

---

## 📌 Project Status

**Version:** v1  
This project is considered **complete and stable**.

Future changes (if any) will focus on:
- clarity
- accessibility
- documentation  

No feature expansion is planned.

---

## 🤝 Why this exists

Tor users often face slow or unreliable connections without knowing *why*.  
This tool provides **context**, not judgment.

Sometimes the answer is simply:

> *“The network is under strain right now — waiting may help.”*

That alone can save time and frustration.

---

## 📄 License

Shared as a **public-good utility**.  
Feel free to learn from it, adapt it, or improve it responsibly.

---

## 🏁 Final Note

This tool is intentionally:
- calm
- minimal
- honest
- boring in a good way

Because **infrastructure tools should be trusted, not flashy**.
