const { API_Category } = require('../apis');

exports.getRelation = (category) => {
    let categories = {
        level1: {
            name: category.parent.parent.name,
            id: category.parent.parent._id,
        },
        level2: {
            name: category.parent.name,
            id: category.parent._id,
        },
        level3: {
            name: category.name,
            id: category._id,
        },
    };
    return categories;
};

exports.getCatTree = async () => {
    ls2 = await API_Category.readMany({ level: 2 });
    ls3 = await API_Category.readMany({ level: 3 });

    return await API_Category.readMany({ level: 1 }).then(async (ls) => {
        for (let i = 0; i < ls.length; i++) {
            ls[i].children = ls2.filter((cate) => {
                if (cate.parent != null) {
                    return cate.parent._id.toString() == ls[i]._id.toString();
                }
            });

            for (let j = 0; j < ls[i].children.length; j++) {
                ls[i].children[j].children = ls3.filter((cate) => {
                    if (cate.parent != null) {
                        return cate.parent._id.toString() == ls[i].children[j]._id.toString();
                    }
                });
            }
        }
        return ls;
    });
};

exports.normalizeData = (products) => {
    return products.map((product) => {
        return {
            pname: product.pname,
            pimg: product.pimg[0],
            slug: product.slug,
            price: product.classify[0].price,
            discount: product.classify[0].discount,
            rate: Math.max(...product.classify.map((c) => c.rate)),
        };
    });
};

exports.rollBackArr = (items) => {
    let result = {
        pid: [],
        sizes: [],
        colors: [],
        prices: [],
        discounts: [],
        quantity: [],
    };
    items.forEach((item) => {
        for (let i = 0; i < item.pid.length; i++) {
            result.pid.push(item.pid[i]);
            result.sizes.push(item.size);
            result.colors.push(item.colors[i]);
            result.prices.push(item.price);
            result.discounts.push(item.discount);
            result.quantity.push(item.quantity[i]);
        }
    });

    return result;
};
