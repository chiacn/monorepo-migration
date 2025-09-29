// scripts/verify-worker.js
const base = process.env.CF_WORKER_URL;
if (!base) {
  console.error("CF_WORKER_URL is required");
  process.exit(2);
}

const url = base.endsWith("/health")
  ? base
  : `${base.replace(/\/+$/, "")}/health`;

(async () => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!(data && data.ok === true))
      throw new Error("Unexpected Worker response schema");
    console.log("Worker verify OK");
  } catch (err) {
    console.error("Worker verify FAILED:", err.message);
    process.exit(1);
  }
})();
