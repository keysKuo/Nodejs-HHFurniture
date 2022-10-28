const { News } = require('../models');

const API_News = {
    create: async (data) => {
        return await new News(data).save();
    },

    readOne: async (loaders) => {
        return await News.findOne(loaders).lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await News.find(loaders, options).select(select).sort({ createdAt: -1 }).lean();
        }

        return await News.find(loaders, options).sort({ createdAt: -1 }).lean();
    },

    update: async (id, data) => {
        return await News.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await News.findByIdAndRemove(id);
    },
};

module.exports = API_News;