import Datastore from 'nedb-promises';

export class Note {
    constructor(title, description, importance, dueDate, completed) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}


export class NoteStore {
    constructor() {
        this.db = new Datastore({ filename: 'notes.db', autoload: true });
    }

    async createNote(note) {
        return await this.db.insert(note);
    }

    async getNotes() {
        return this.db.find({});
    }

    async getNoteById(id) {
        return this.db.findOne({ _id: id });
    }

    async updateNote(id, note) {
        return await this.db.update({ _id: id }, { $set: note });
    }

    async deleteNote(id) {
        return await this.db.remove({ _id: id },{});
    }
}

export const noteService = new NoteStore();