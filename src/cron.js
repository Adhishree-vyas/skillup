import cron from "node-cron";
export function startCron() {
  // Run every minute
  cron.schedule("* * * * *", () => {
    console.log("Cron job running every minute");
  });
}
