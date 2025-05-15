import { Request, Response } from 'express';
import { noteService, Note } from '../services/note-store';

export class NoteController {
    async getNotes(req: Request, res: Response): Promise<void> {
        const notes = await noteService.getNotes(req.session.userSettings.orderBy, req.session.userSettings.orderDirection, req.session.userSettings.showCompleted);
        const formattedNotes = notes.map(note => ({
            ...note,
            dueDate: new Date(note.dueDate).toLocaleDateString('de-DE')
        }));
        res.render('index', { notes: formattedNotes, createButton: true });
    }

    async getNoteForm(req: Request, res: Response): Promise<void> {
        res.render('noteEditor');
    }

    async getNote(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const note = await noteService.getNoteById(id);
        const formattedNote = {
            ...note,
            dueDate: new Date(note.dueDate).toISOString().split('T')[0] // Format to YYYY-MM-DD for note editor
        };
        res.render('noteEditor', { note: formattedNote });
    }

    async createNote(req: Request, res: Response): Promise<void> {
        const { title, description, importance, dueDate, completed } = req.body;
        if (importance < 1 || importance > 5) {
            res.status(400).send('Importance must be between 1 and 5');
            return;
        }
        const newNote = new Note(title, description, importance, new Date(dueDate), new Date(), !!completed);
        await noteService.createNote(newNote);
        res.redirect('/');
    }

    async updateNote(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { title, description, importance, dueDate, completed } = req.body;
        const updatedNote: Partial<Note> = { title, description, importance, dueDate: new Date(dueDate), completed: !!completed };
        await noteService.updateNote(id, updatedNote);
        res.redirect('/');
    }

    async deleteNote(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await noteService.deleteNote(id);
        res.redirect('/');
    }
}

export const noteController = new NoteController();