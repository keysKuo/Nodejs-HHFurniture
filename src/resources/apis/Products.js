const { Products } = require('../models');

const API_Products = {
    create: async (data) => {
        return await new Products(data).save();
    },

    readOne: async (loaders) => {
        return await Products.findOne(loaders).populate('Category').lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await Products.find(loaders, options)
                .select(select)
                .populate({ path: 'Category', populate: 'parent' })
                .lean();
        }

        return await Products.find(loaders, options).populate({ path: 'Category', populate: 'parent' }).lean();
    },

    update: async (id, data) => {
        return await Products.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Products.findByIdAndRemove(id);
    },
};

module.exports = API_Products;
