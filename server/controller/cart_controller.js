const swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        const { id } = req.query;
        const { session } = req;
        let { cart } = req.session.user;


        let item = cart.find(itemId => itemId.id == id);
        if (item) {
            console.log('oops... you already have that in your cart and you can only add one of each item!!!');
            res.status(200).send(session.user)
        } else {
            let addItem = swag.find(swagItem => swagItem.id == id);
            session.user.cart.push(addItem);
            session.user.total += addItem.price;
            res.status(200).send(session.user);
        }
    },

    delete: (req, res) => {
        const { id } = req.query;
        let { session } = req;
        let { cart, total } = session.user;

        let remove = cart.findIndex(item => item.id == id);

        if (remove === -1) {
            res.status(403).send('nope, you do not have any more of that item to delete')
        } else {



            // console.log(remove);

            // console.log('cart price: ' + cart[remove].price)
            // console.log('total: ' + total)
            // console.log('total - cart[remove].price: ' + ((total * 1) - (cart[remove].price * 1)))




            // -----------------
            // this does not work and I do not know why...
            // 
            // total-= (cart[remove].price * 1);
            // -----------------



            // this works but I am not happy with it!!!
            session.user.total -= (cart[remove].price * 1)
            cart.splice(remove, 1);

            res.status(200).send(session.user);
        }
    },

    checkout: (req, res) => {
        const { session } = req;
        session.user.cart = [];
        session.user.total = 0;
        res.status(200).send(session.user);
    }
}