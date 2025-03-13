import Datastore from 'nedb-promises';

export class Note {
    constructor(title, description, importance, dueDate, creationDate, completed) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
        this.completed = completed;
    }
}


export class NoteStore {
    constructor() {
        this.db = new Datastore({ filename: 'notes.db', autoload: true });
    }

    async createNote(note) {
        note.creationDate = new Date();
        return await this.db.insert(note);
    }

    async getNotes(orderBy, orderDirection, showCompleted) {
        const filter = showCompleted === 'true' ? {} : { completed: false };
        return this.db.find(filter).sort({[orderBy]: orderDirection === 'up' ? 1 : -1});
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
