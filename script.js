const API_URL = "https://shy-shadow-367f-tor-health-api.amanprogrammer123.workers.dev/";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
  const statusDiv = document.getElementById("status");
  const messageP = document.getElementById("message");
  const updatedP = document.getElementById("updated");
  const regionsUl = document.getElementById("regions");

  statusDiv.textContent = data.status.toUpperCase();
  statusDiv.className = data.status;
  messageP.textContent = data.message;
  updatedP.textContent = "Last updated: " + new Date(data.updated).toLocaleString();

  regionsUl.innerHTML = "";
  for (const region in data.regions) {
    const li = document.createElement("li");
    li.textContent = `${region.toUpperCase()}: ${data.regions[region]}`;
    li.className = data.regions[region];
    regionsUl.appendChild(li);
  }

    const trendP = document.getElementById("trend");

    let trendText = "➖ Stable";
    if (data.trend === "improving") trendText = "📈 Improving";
    if (data.trend === "worsening") trendText = "📉 Worsening";

    trendP.textContent = "Trend: " + trendText;

})

  .catch(() => {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "UNKNOWN";
    statusDiv.className = "unstable";
  });

