class ContactController {
    static getContact(req, res) {
        res.render('contact', {
            title: 'CONTACT'
        });
    }
}

module.exports = ContactController;