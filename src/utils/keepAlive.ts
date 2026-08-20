import cron from 'node-cron';
import axios from 'axios';
import config from '../config/index';


//  * Keep-Alive Cron Job
//  * Pings the server's own health endpoint every 2 days
//  * to prevent Render's free-tier from spinning down the instance.
//  *
//  * Cron pattern: 0 0 */2 **
//  *   ┌─── minute  (0)
//  *   │ ┌─── hour   (0  → midnight)
//  *   │ │ ┌─── day   (every 2 days)
//  *   │ │ │  ┌─── month (every month)
//  *   │ │ │  │ ┌─── weekday (any)
//  *   0 0 */2 * *


export const startKeepAliveCron = (): void => {
  const serverUrl = config.server_url;
  const healthUrl = `${serverUrl}/health/rit`;

  // Run at midnight every 2 days
  cron.schedule('0 0 */2 * *', async () => {
    const timestamp = new Date().toISOString();
    console.log(`[KeepAlive] 🔄 Pinging server at ${timestamp} → ${healthUrl}`);

    try {
      const response = await axios.get(healthUrl, { timeout: 10_000 });
      console.log(`[KeepAlive] ✅ Server is alive — status ${response.status}`);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          `[KeepAlive] ❌ Ping failed — ${error.message} (${error.response?.status ?? 'no response'})`,
        );
      } else {
        console.error('[KeepAlive] ❌ Unexpected error during ping:', error);
      }
    }
  });

  console.log(
    `[KeepAlive] ✅ Cron job scheduled — server will be pinged every 2 days (${healthUrl})`,
  );
};
