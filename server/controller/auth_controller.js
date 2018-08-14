const users = require('../models/users');
let id = 1;

module.exports = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        const { session } = req;

        const user = users.find((oneUser) =>  oneUser.username === username && oneUser.password === password )
        if (user) {
            session.user.username = user.username;
            res.status(200).send(session.user)
        } else {
            res.status(500).send('Please Create an Account')
        }
    },

    register: (req, res, next) => {
        const { username, password } = req.body;
        const { session } = req;

        users.push({
            id,
            username,
            password
        })
        id++;
        session.user.username = username;
        res.status(200).send(session.user);
    },

    signout: (req, res, next) => {
        const { session } = req;

        session.destroy();

        res.status(200).send(session);
    },

    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }
}