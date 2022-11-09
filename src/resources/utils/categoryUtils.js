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

exports.queryCategories = async (categories) => {
    let result = [];
    for(cate of categories) {
        result.push(await API_Category.readOne({_id: cate}))
    }

    return result;
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