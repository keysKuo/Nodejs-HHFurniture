const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const init = () => {
    app.use(cors());
    app.set('view engine', 'hbs');
    app.engine(
        'hbs',
        handlebars.engine({
            extname: 'hbs',
            defaultView: 'main',
            layoutsDir: path.join(__dirname, '../resources/views/layouts/'),
            partialsDir: path.join(__dirname, '../resources/views/partials/'),
            helpers: {
                equal: function (lval, rval, options) {
                    if (lval == rval) return options.fn(this);
                },

                noChild: function (name, categories, options) {
                    for (const item of categories) {
                        if (item.parent && name == item.parent.name) {
                            return options.inverse(this);
                        }
                    }
                    return options.fn(this);
                },

                formatCurrency: function (price) {
                    if (price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' ₫';
                    return 'Liên hệ';
                },

                includes: function (categories, target, options) {
                    for (const item of categories) {
                        if (item._id == target) return options.fn(this);
                    }
                    return options.inverse(this);
                },
            },
        }),
    );

    app.set('views', path.join(__dirname, '../resources/views'));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser('SUD'));
    app.use(session({ cookie: { maxAge: 30000 } }));
    app.use(flash());
    app.use(bodyParser.urlencoded({ extended: false }));
    return app;
};

module.exports = { init };
