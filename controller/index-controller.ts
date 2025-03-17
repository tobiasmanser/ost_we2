import { Request, Response } from 'express';

export class IndexController {
    index(req: Request, res: Response): void {
        res.redirect(`/note`);
    }
}

export const indexController = new IndexController();