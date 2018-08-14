const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query;

        let newList = swag.filter(item => item.category = category);

        if (newList) {
            res.status(200).send(newList);
        } else {
            res.status(200).send(swag);
        }
    }
}