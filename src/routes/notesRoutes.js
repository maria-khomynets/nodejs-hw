import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import { createNoteSchema } from '../validations/studentsValidation.js';

import { noteIdParamSchema } from '../validations/notesValidation.js';

const router = Router();
router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNoteById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', updateNote);
router.post('/notes', celebrate(createNoteSchema), createNote);
router.get('/notes/:noteId', celebrate(noteIdParamSchema), getNoteById);
router.delete('/notes/:noteId', celebrate(noteIdParamSchema), deleteNote);
export default router;
