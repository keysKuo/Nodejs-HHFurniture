const { Products } = require('../models');
// CRUD
const API_Products = {
    create: async (data) => {
        return await new Products(data).save();
    },

    readOne: async (loaders) => {
        return await Products.findOne(loaders).populate('categories').lean();
    },

    readMany: async (loaders, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        let select = options.select || {};
        return await Products.find(loaders)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({ path: 'categories', populate: { path: 'parent'} })
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
