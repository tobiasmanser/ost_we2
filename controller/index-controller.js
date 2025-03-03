export class IndexController {
    index(req, res) {
        res.redirect(`/note`);
    };
}

export const indexController = new IndexController();
