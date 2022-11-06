const { News } = require('../models');

const API_News = {
    create: async (data) => {
        return await new News(data).save();
    },

    readOne: async (loaders) => {
        return await News.findOne(loaders).lean();
    },

    readMany: async (loaders, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        let select = options.select || {};
        return await News.find(loaders)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
    },

    update: async (id, data) => {
        return await News.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await News.findByIdAndRemove(id);
    },
};

module.exports = API_News;