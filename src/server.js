import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectMongoDB } from './db/connectMongoDB.js';
import { Note } from './models/note.js';

const app = express();
app.use(logger);

app.use(cors());
app.use(express.json());

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ message: 'Retrieved all notes', data: notes });
});

app.get('/notes/:noteId', async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }
  res
    .status(200)
    .json({ message: `Retrieved note with ID: ${noteId}`, data: note });
});

app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

app.use(notFoundHandler);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
