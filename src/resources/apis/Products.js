const { Products } = require('../models');
// CRUD
const API_Products = {
    create: async (data) => {
        return await new Products(data).save();
    },

    readOne: async (loaders, options) => {
        let select = (options) ? options.select : {};
        return await Products.findOne(loaders)
            .select(select)
            .populate({ path: 'categories', populate: { path: 'level1 level2 level3' } }).lean();
    },

    readMany: async (loaders, options) => {
        let skip = (options) ? options.skip : 0;
        let limit = (options) ? options.limit : 0;
        let select = (options) ? options.select : {};
        return await Products.find(loaders)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({ path: 'categories', populate: { path: 'level1 level2 level3' } })
            .lean();
    },

    update: async (id, data) => {
        return await Products.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Products.findByIdAndRemove(id);
    },

};

module.exports = API_Products;
