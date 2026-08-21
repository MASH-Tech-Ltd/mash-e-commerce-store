import app from './app';
import config from './config/index';
import { connectDatabase } from './database/db';
import { seedAdmin } from './utils/seedSuperAdmin';
import { seedDemoStorefront } from './utils/seedStorefront';
import { logger } from './utils/logger';

import { initSocket } from './socket';

const PORT = config.port || 8000;

connectDatabase()
  .then(async () => {
    // await seedAdmin();
    // await seedDemoStorefront();
    const server = app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
    });
    
    // Initialize Socket.io
    initSocket(server);
  })
  .catch((error: unknown) => {
    logger.error("Database connection failed!!", error);
    process.exit(1);
  });

// Trigger restart
