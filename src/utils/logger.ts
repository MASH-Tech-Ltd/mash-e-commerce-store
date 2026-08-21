import { createLogger, format, transports } from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize } = format;

const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    config.env === 'development' ? colorize() : format.uncolorize(),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});
