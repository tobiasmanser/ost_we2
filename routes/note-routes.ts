import express, { Request, Response, NextFunction } from 'express';
import { noteController } from '../controller/note-controller';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => noteController.getNotes(req, res).catch(next));
router.get('/create', (req: Request, res: Response, next: NextFunction) => noteController.getNoteForm(req, res).catch(next));
router.post('/create', (req: Request, res: Response, next: NextFunction) => noteController.createNote(req, res).catch(next));
router.get('/:id', (req: Request, res: Response, next: NextFunction) => noteController.getNote(req, res).catch(next));
router.post('/:id', (req: Request, res: Response, next: NextFunction) => noteController.updateNote(req, res).catch(next));
router.delete('/note/:id', (req: Request, res: Response, next: NextFunction) => noteController.deleteNote(req, res).catch(next));

export const noteRoutes = router;