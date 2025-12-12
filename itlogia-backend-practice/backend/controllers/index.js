class IndexController {
    static getIndex(req, res) {
        res.render('index', {
            title: 'INDEX'
        });
    }
}

module.exports = IndexController;