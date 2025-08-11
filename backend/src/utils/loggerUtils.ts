// import { createLogger, format, transports } from 'winston';

// const { combine, timestamp, printf, colorize } = format;

// const logFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// const logger = createLogger({
//   level: 'info',
//   format: combine(
//     colorize(),
//     timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     logFormat
//   ),
//   transports: [
//     new transports.Console(),
//     new transports.File({ filename: 'logs/server.log' }),
//   ],
// });

// export default logger;




// src/utils/loggerUtils.ts
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
};

export default logger;