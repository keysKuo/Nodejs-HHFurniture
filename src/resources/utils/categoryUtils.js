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