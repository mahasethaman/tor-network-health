export default {
  async fetch(request) {
    const TOR_API = "https://onionoo.torproject.org/summary";

    try {
      const response = await fetch(TOR_API);
      const data = await response.json();

      const relayCount = data.relays.length;

      let status = "healthy";
      let message = "Tor network is operating normally.";

      if (relayCount < 6000) {
        status = "degraded";
        message = "Reduced number of active relays detected.";
      }

      if (relayCount < 5000) {
        status = "unstable";
        message = "Significant relay drop detected.";
      }

      return new Response(JSON.stringify({
        status,
        message,
        relays: relayCount,
        updated: new Date().toISOString()
      }), {
        headers: { "Content-Type": "application/json" }
      });

    } catch (error) {
      return new Response(JSON.stringify({
        status: "unknown",
        message: "Unable to fetch Tor network status."
      }), { status: 500 });
    }
  }
};

