const { Policy } = require('../models');

const API_Policy = {
    create: async (data) => {
        return await new Policy(data).save();
    },

    readOne: async (loaders) => {
        return await Policy.findOne(loaders).lean();
    },

    readMany: async (loaders, options) => {
        let skip = options.skip || 0;
        let limit = options.limit || 0;
        let select = options.select || {};
        return await Policy.find(loaders)
            .select(select)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean();
    },

    update: async (id, data) => {
        return await Policy.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Policy.findByIdAndRemove(id);
    },
};

module.exports = API_Policy;