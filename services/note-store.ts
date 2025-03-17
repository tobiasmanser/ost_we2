import Datastore from 'nedb-promises';

export class Note {
    title: string;
    description: string;
    importance: number;
    dueDate: Date;
    creationDate: Date;
    completed: boolean;

    constructor(title: string, description: string, importance: number, dueDate: Date, creationDate: Date, completed: boolean) {
        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.creationDate = creationDate;
        this.completed = completed;
    }
}

export class NoteStore {
    private db: Datastore<Note>;

    constructor() {
        this.db = Datastore.create({ filename: 'notes.db', autoload: true });
    }

    async createNote(note: Note): Promise<Note> {
        note.creationDate = new Date();
        return await this.db.insert(note);
    }

    async getNotes(orderBy: string, orderDirection: string, showCompleted: string): Promise<Note[]> {
        const filter = showCompleted === 'true' ? {} : { completed: false };
        return this.db.find(filter).sort({ [orderBy]: orderDirection === 'up' ? 1 : -1 });
    }

    async getNoteById(id: string): Promise<Note | null> {
        return this.db.findOne({ _id: id });
    }

    async updateNote(id: string, note: Partial<Note>): Promise<number> {
        return await this.db.update({ _id: id }, { $set: note });
    }

    async deleteNote(id: string): Promise<number> {
        return await this.db.remove({ _id: id }, {});
    }
}

export const noteService = new NoteStore();