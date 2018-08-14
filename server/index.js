require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSession = require('./middleware/checkForSession');
const sc = require('./controller/swag_controller');
const ac = require('./controller/auth_controller');
const cc = require('./controller/cart_controller');
const search_c = require('./controller/search_controller');

const { SERVER_PORT, SESSION_SECRET } = process.env;
const app = express()



app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
        maxAge: 1000 * 60
    }
}));
app.use(checkForSession);
app.use(express.static(`${__dirname}/build`));



// endpoints

app.get(`/api/swag`, sc.read);
app.post(`/api/login`, ac.login);
app.post(`/api/register`, ac.register);
app.post(`/api/signout`, ac.signout);
app.get(`/api/user`, ac.getUser);

app.post(`/api/cart`, cc.add);
app.post(`/api/cart/checkout`, cc.checkout);
app.delete(`/api/cart`, cc.delete);

app.get(`/api/search`, search_c.search);






// server listening

app.listen(SERVER_PORT, () => {
    console.log(`We can here you on ${SERVER_PORT}`)
})
