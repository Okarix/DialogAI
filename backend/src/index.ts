import express from 'express';
import cors from 'cors';
import { logger } from './middleware/logger';
import chatRoutes from './routes/chatRoutes';

const app = express();

app.use(logger);
app.use(express.json());
app.use(cors());
app.use('/api', chatRoutes);

export default app;
