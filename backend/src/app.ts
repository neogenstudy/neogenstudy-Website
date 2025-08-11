import express, { Application, Express } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes';
// import studyPlanRouter from './routes/studyPlanRoutes';
import logger from './utils/loggerUtils';
import { setupSwagger } from './config/swaggerConfig';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;

// Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true,
}));

// Swagger UI
setupSwagger(app); // Call setupSwagger with the app instance
// logger.info(`Swagger Docs available at ${process.env.CLIENT_URL || 'http://localhost:3000'}/api-docs`);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/neogenstudy')
  .then(() => logger.info('Connected to MongoDB'))
  .catch((err) => logger.error('MongoDB connection error:', err));

// Routes
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/study-plans', studyPlanRouter);

const startServer = async () => {
  logger.info('Inside app.ts - startServer function');
  try {
    const server = app.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });

    process.on('SIGTERM', async () => {
      logger.info('SIGTERM received. Closing server...');
      server.close(async () => {
        await mongoose.connection.close();
        logger.info('Server and MongoDB connection closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(
      'Error starting server:',
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
};

if (module === require.main) {
  startServer();
}

export default app;