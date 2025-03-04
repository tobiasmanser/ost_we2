import express from 'express';
import { noteController } from '../controller/note-controller.js';

const router = express.Router();

router.get('/', noteController.getNotes.bind(noteController));
router.get('/create', noteController.getNoteForm.bind(noteController));
router.post('/create', noteController.createNote.bind(noteController));
router.get('/:id', noteController.getNote.bind(noteController));
router.post('/:id', noteController.updateNote.bind(noteController));
router.delete('/note/:id', noteController.deleteNote.bind(noteController));

export const noteRoutes = router;