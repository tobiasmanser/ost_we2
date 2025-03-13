export const sessionUserSettings = (req, res, next) => {
    const userSettings = req.session?.userSettings || {orderBy: 'title', orderDirection: -1, theme: 'dark', showCompleted: 'true'};
    const {orderBy, orderDirection, theme, showCompleted} = req.query;

    if (theme) {
        userSettings.theme = theme;
    }
    if (orderBy) {
        userSettings.orderBy = orderBy;
    }
    if (orderDirection) {
        userSettings.orderDirection = orderDirection;
    }
    if (showCompleted) {
        userSettings.showCompleted = showCompleted;
    }

    req.userSettings = req.session.userSettings = userSettings;
    res.locals = req.userSettings; // visible within views
    next();
};
