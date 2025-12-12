class AboutController {
    static getAbout(req, res) {
        res.render('about', {
            title: 'ABOUT'
        });
    }
}

module.exports = AboutController;