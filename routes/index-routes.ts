import express, { Request, Response } from 'express';
import { indexController } from '../controller/index-controller';

const router = express.Router();

router.get("/", (req: Request, res: Response) => indexController.index(req, res));

router.get("/toggle-theme", (req: Request, res: Response) => {
    const { return_address } = req.query;
    if (req.session.userSettings) {
        req.session.userSettings.theme = req.session.userSettings.theme === 'light' ? 'dark' : 'light';
    }
    res.redirect(<string>return_address || '/');
});

export const indexRoutes = router;