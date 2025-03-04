import { noteService } from '../services/note-store.js';

export class NoteController {
    async getNotes(req, res) {
        const notes = await noteService.getNotes();
        res.render('index', { theme: 'light', notes });
    }

    async getNoteForm(req, res) {
        res.render('NoteEditor', { theme: 'light' });
    }

    async getNote(req, res) {
        const { id } = req.params;
        const note = await noteService.getNoteById(id);
        res.render('NoteEditor', { theme: 'light', note });
    }

    async createNote(req, res) {
        const { title, description, importance, dueDate, completed } = req.body;
        if (importance < 1 || importance > 5) {
            return res.status(400).send('Importance must be between 1 and 5');
        }
        await noteService.createNote({ title, description, importance, dueDate, completed: !!completed });
        res.redirect('/');
    }

    async updateNote(req, res) {
        const { id } = req.params;
        const { title, description, importance, dueDate, completed } = req.body;
        await noteService.updateNote(id, { title, description, importance, dueDate, completed });
        res.redirect('/');
    }

    async deleteNote(req, res) {
        const { id } = req.params;
        await noteService.deleteNote(id);
        res.redirect('/');
    }
}

export const noteController = new NoteController();