const { Category } = require('../models');

const API_Category = {
    create: async (data) => {
        return await new Category(data).save();
    },

    readOne: async (loaders) => {
        return await Category.findOne(loaders)
        .populate({ path: 'parent', populate: 'parent' })
        .lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await Category.find(loaders, options)
                .select(select)
                .sort({ updatedAt: -1 })
                .populate({ path: 'parent', populate: 'parent' })
                .lean();
        }

        return await Category.find(loaders, options)
            .sort({ updatedAt: -1 })
            .populate({ path: 'parent', populate: 'parent' })
            .lean();
    },

    update: async (id, data) => {
        return await Category.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Category.findByIdAndRemove(id);
    },

    removeMany: async (idList) => {
        return await Category.deleteMany({_id: {$in: idList }});
    }
};

module.exports = API_Category;
