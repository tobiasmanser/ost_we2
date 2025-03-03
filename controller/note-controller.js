import { noteService } from '../services/note-store.js';

export class NoteController {
    async getNotes(req, res) {
        const notes = await noteService.getNotes();
        res.render('index', { theme: 'light', notes });
    }

    async createNote(req, res) {
        const { title, description, importance, dueDate, completed } = req.body;
        await noteService.createNote({ title, description, importance, dueDate, completed });
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