exports.dashboardController = (req, res, next) => {
    res.render('pages/dashboard/dashboard', {tittle: 'My Dashboard'})
}