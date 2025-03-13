import express from 'express';

const router = express.Router();
import {indexController} from '../controller/index-controller.js';

router.get("/", indexController.index);

router.get("/toggle-theme", (req, res) => {
    req.session.userSettings.theme = req.session.userSettings.theme === 'light' ? 'dark' : 'light';
    res.redirect(`/`);
})

export const indexRoutes = router;
