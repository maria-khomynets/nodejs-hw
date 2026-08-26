import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

app.use(logger);

app.use(cors());

app.use(express.json());

app.use(notesRoutes);

// Обробка помилок валідації celebrate
app.use(errors());

// Обробка неіснуючих маршрутів
app.use(notFoundHandler);

// Загальний обробник помилок
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
