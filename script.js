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




fetch(API_URL + "/history")
  .then(res => res.json())
 
  .then(history => {
  if (history.length < 2) {
    document.getElementById("historyChart").insertAdjacentHTML(
      "beforebegin",
      "<p style='color:#777;'>Collecting data… chart will fill over time.</p>"
    );
    return;
  }


    const labels = history.map(p =>
      new Date(p.time).toLocaleTimeString()
    );

    const mapStatus = s =>
      s === "healthy" ? 2 : s === "degraded" ? 1 : 0;

    const ctx = document.getElementById("historyChart").getContext("2d");

    new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Overall",
            data: history.map(p => mapStatus(p.overall)),
            borderColor: "black",
            tension: 0.3,
          },
          {
            label: "Asia",
            data: history.map(p => mapStatus(p.asia)),
            borderColor: "orange",
            tension: 0.3,
          },
          {
            label: "Europe",
            data: history.map(p => mapStatus(p.europe)),
            borderColor: "green",
            tension: 0.3,
          },
          {
            label: "Americas",
            data: history.map(p => mapStatus(p.americas)),
            borderColor: "blue",
            tension: 0.3,
          }
        ]
      },
      options: {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom"
    },
    tooltip: {
      callbacks: {
        label: ctx => {
          const map = ["Unstable", "Degraded", "Healthy"];
          return ctx.dataset.label + ": " + map[ctx.parsed.y];
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: v => ["Unstable","Degraded","Healthy"][v]
      },
      min: 0,
      max: 2
    }
  }
}

    });
  });


