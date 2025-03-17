import { Request, Response, NextFunction } from 'express';

export const sessionUserSettings = (req: Request, res: Response, next: NextFunction): void => {
    const userSettings = req.session?.userSettings || { orderBy: 'title', orderDirection: '', theme: 'dark', showCompleted: 'true' };
    const { orderBy, orderDirection, theme, showCompleted } = req.query;

    if (theme) {
        userSettings.theme = theme as string;
    }
    if (orderBy) {
        userSettings.orderBy = orderBy as string;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection as string;
    }
    if (showCompleted) {
        userSettings.showCompleted = showCompleted as string;
    }

    req.session.userSettings = userSettings;
    res.locals = req.session.userSettings; // visible within views
    next();
};