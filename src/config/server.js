const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { isNumber } = require('util');
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

                includes: function (list, target, options) {
                    for (const item of list) {
                        if (item == target) return options.fn(this);
                    }
                    return options.inverse(this);
                },
                first: function (list, options) {
                    return list[0];
                },
                uploaded: function (data, options) {
                    let html = ``;
                    for (img of data) {
                        html += `<img width="50%" src="${img}" alt=""> <br/>`;
                    }
                    return html;
                },
                theRest: function (data, options) {
                    let html = ``;
                    for (let i = 1; i < data.pid.length; i++) {
                        html += `
                        <div class="form-row">
                            <div class="form-group col">
                                <input id="pid" name="pid" placeholder="Mã sản phẩm"
                                class="form-control" required type="text" value="${data.pid[i]}">
                            </div>
                            <div class="form-group col">
                                <input id="sizes" name="sizes" placeholder="Size" class="form-control input-md" type="text"
                                value="${data.sizes[i]}">
                            </div>
                            <div class="form-group col">
                                <input id="colors" name="colors" placeholder="Màu sắc" class="form-control input-md" type="text"
                                value="${data.colors[i]}">
                            </div>
                            <div class="form-group col">
                                <input id="prices" name="prices" placeholder="Giá gốc" class="form-control input-md" type="number" min="0"
                                value="${data.prices[i]}">  
                            </div>
                            <div class="form-group col">
                                <input id="discounts" name="discounts" placeholder="Giá khuyến mãi" class="form-control input-md" type="number" min="0"
                                value="${data.discounts[i]}">
                            </div>
                            <div class="form-group col">
                                <input id="quantity" name="quantity" placeholder="Số lượng"
                                class="form-control input-md w-100" required="" type="number" min="0"
                                value="${data.quantity[i]}">
                            </div>
                            <div class="form-group">
                                <div class="btn btn-danger btnDeleteSize"><i class="fa-solid fa-trash"></i></div>
                            </div>
                        </div>
                        `;
                    }
                    return html;
                },
                when: function (operand_1, operator, operand_2, options) {
                    let operators = {
                        //  {{#when <operand1> 'eq' <operand2>}}
                        eq: (l, r) => l == r, //  {{/when}}
                        noteq: (l, r) => l != r,
                        gt: (l, r) => +l > +r, // {{#when var1 'eq' var2}}
                        gteq: (l, r) => +l > +r || l == r, //               eq
                        lt: (l, r) => +l < +r, // {{else when var1 'gt' var2}}
                        lteq: (l, r) => +l < +r || l == r, //               gt
                        or: (l, r) => l || r, // {{else}}
                        and: (l, r) => l && r, //               lt
                        '%': (l, r) => l % r === 0, // {{/when}}
                    };
                    let result = operators[operator](operand_1, operand_2);
                    if (result) return options.fn(this);
                    return options.inverse(this);
                },

                discountPrice: function (price, dis, options) {
                    var percent = dis / 100;
                    return (
                        Math.round(price * (1 - percent))
                            .toString()
                            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1.') + ' ₫'
                    );
                },
                paginate: function (pagination, options) {
                    var type = options.hash.type || 'middle';
                    var ret = '';
                    var pageCount = Number(pagination.pageCount);
                    var page = Number(pagination.page);
                    var limit;
                    if (options.hash.limit) limit = +options.hash.limit;

                    //page pageCount
                    var newContext = {};
                    switch (type) {
                        case 'middle':
                            if (typeof limit === 'number') {
                                var i = 0;
                                var leftCount = Math.ceil(limit / 2) - 1;
                                var rightCount = limit - leftCount - 1;
                                if (page + rightCount > pageCount) leftCount = limit - (pageCount - page) - 1;
                                if (page - leftCount < 1) leftCount = page - 1;
                                var start = page - leftCount;

                                while (i < limit && i < pageCount) {
                                    newContext = { n: start };
                                    if (start === page) newContext.active = true;
                                    ret = ret + options.fn(newContext);
                                    start++;
                                    i++;
                                }
                            } else {
                                for (var i = 1; i <= pageCount; i++) {
                                    newContext = { n: i };
                                    if (i === page) newContext.active = true;
                                    ret = ret + options.fn(newContext);
                                }
                            }
                            break;
                        case 'previous':
                            if (page === 1) {
                                newContext = { disabled: true, n: 1 };
                            } else {
                                newContext = { n: page - 1 };
                            }
                            ret = ret + options.fn(newContext);
                            break;
                        case 'next':
                            newContext = {};
                            if (page === pageCount) {
                                newContext = { disabled: true, n: pageCount };
                            } else {
                                newContext = { n: page + 1 };
                            }
                            ret = ret + options.fn(newContext);
                            break;
                        case 'first':
                            if (page === 1) {
                                newContext = { disabled: true, n: 1 };
                            } else {
                                newContext = { n: 1 };
                            }
                            ret = ret + options.fn(newContext);
                            break;
                        case 'last':
                            if (page === pageCount) {
                                newContext = { disabled: true, n: pageCount };
                            } else {
                                newContext = { n: pageCount };
                            }
                            ret = ret + options.fn(newContext);
                            break;
                    }

                    return ret;
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
