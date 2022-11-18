const { API_Category } = require("../apis");

exports.getRelation = (category) => {

    let categories = {
        level1: {
            name: category.parent.parent.name,
            id: category.parent.parent._id
        },
        level2: {
            name: category.parent.name,
            id: category.parent._id
        },
        level3: {
            name: category.name,
            id: category._id
        }
    }
    return categories;
}



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
}

exports.rollBackArr = (items) => {
    let result = {
        pid: [],
        sizes: [],
        colors: [],
        prices: [],
        discounts: [],
        quantity: []
    };
    items.forEach(item => {
        for(let i = 0; i < item.pid.length; i++) {
            result.pid.push(item.pid[i]);
            result.sizes.push(item.size);
            result.colors.push(item.colors[i]);
            result.prices.push(item.price);
            result.discounts.push(item.discount);
            result.quantity.push(item.quantity[i]);
        }
    })

    return result;
}