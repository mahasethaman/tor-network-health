const toggleBtn = document.getElementById("themeToggle");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
  document.body.classList.add("dark");
  toggleBtn.textContent = "☀️ Light mode";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  toggleBtn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
});



const API_URL = "https://shy-shadow-367f-tor-health-api.amanprogrammer123.workers.dev";


/* -------- MAIN STATUS -------- */
fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    document.getElementById("status").textContent = data.status.toUpperCase();
    document.getElementById("status").className = data.status;
    document.getElementById("message").textContent = data.message;
    document.getElementById("updated").textContent =
      "Last updated: " + new Date(data.updated).toLocaleString();

    const trendMap = {
      improving: "📈 Improving",
      worsening: "📉 Worsening",
      stable: "➖ Stable"
    };

    document.getElementById("trend").textContent =
      "Trend: " + (trendMap[data.trend] || "➖ Stable");

    const regionsUl = document.getElementById("regions");
    regionsUl.innerHTML = "";

    for (const region in data.regions) {
      const li = document.createElement("li");
      li.textContent = `${region.toUpperCase()} : ${data.regions[region]}`;
      li.className = data.regions[region];
      regionsUl.appendChild(li);
    }
  });

/* -------- HISTORY CHART -------- */
fetch(API_URL + "/history")
  .then(res => res.json())
  .then(history => {
    if (history.length < 2) return;

    const labels = history.map(p =>
      new Date(p.time).toLocaleTimeString()
    );

    const mapStatus = s => s === "healthy" ? 2 : s === "degraded" ? 1 : 0;

    new Chart(document.getElementById("historyChart"), {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Overall",
            data: history.map(p => mapStatus(p.overall)),
            borderColor: "#000",
            backgroundColor: "#000",
            borderWidth: 3,
            pointRadius: 3,
            tension: 0.2
          },
          {
            label: "Europe",
            data: history.map(p => mapStatus(p.europe)),
            borderColor: "orange",
            backgroundColor: "orange",
            borderWidth: 3,
            pointRadius: 3,
            tension: 0.2
          },
          {
            label: "Europe",
            data: history.map(p => mapStatus(p.europe)),
            borderColor: "green",
            backgroundColor: "green",
            borderWidth: 3,
            pointRadius: 3,
            tension: 0.2
          },
          {
            label: "Europe",
            data: history.map(p => mapStatus(p.europe)),
            borderColor: "blue",
            backgroundColor: "blue",
            borderWidth: 3,
            pointRadius: 3,
            tension: 0.2
          }

        ]
      },
      options: {
        scales: {
          y: {
              min: -0.2,
              max: 2.2,
              ticks: {
                callback: v => ["Unstable","Degraded","Healthy"][Math.round(v)]
              }
            },
           x: {
                grid: { color: "#eee" }
              },
              y: {
                grid: { color: "#eee" },
                min: -0.2,
                max: 2.2,
                ticks: {
                  callback: v => ["Unstable","Degraded","Healthy"][Math.round(v)]
                }
              }

        },
        plugins: {
          legend: { position: "bottom" }
        }
      }
    });
  });
