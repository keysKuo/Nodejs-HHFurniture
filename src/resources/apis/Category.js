const { Category } = require('../models');

const API_Category = {
    create: async (data) => {
        return await new Category(data).save();
    },

    readOne: async (loaders) => {
        return await Category.findOne(loaders).populate({ path: 'parent', populate: 'parent' }).lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await Category.find(loaders, options)
                .select(select)
                .sort({ createdAt: -1 })
                .populate({ path: 'parent', populate: 'parent' })
                .lean();
        }

        return await Category.find(loaders, options)
            .sort({ createdAt: -1 })
            .populate('parent')
            .lean();
    },

    update: async (id, data) => {
        return await Category.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Category.findByIdAndRemove(id);
    },
};

module.exports = API_Category;
