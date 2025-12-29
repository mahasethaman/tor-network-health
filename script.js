const API_URL = "https://shy-shadow-367f-tor-health-api.amanprogrammer123.workers.dev/";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const statusDiv = document.getElementById("status");
    const messageP = document.getElementById("message");
    const updatedP = document.getElementById("updated");

    statusDiv.textContent = data.status.toUpperCase();
    statusDiv.className = data.status;

    messageP.textContent = data.message;
    updatedP.textContent = "Last updated: " + new Date(data.updated).toLocaleString();
  })
  .catch(() => {
    const statusDiv = document.getElementById("status");
    statusDiv.textContent = "UNKNOWN";
    statusDiv.className = "unstable";
  });

