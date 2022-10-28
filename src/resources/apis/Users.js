const { Users } = require('../models');

const API_Users = {
    create: async (data) => {
        return await new Users(data).save();
    },

    readOne: async (loaders) => {
        return await Users.findOne(loaders).lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await Users.find(loaders, options).select(select).sort({ createdAt: -1 }).lean();
        }

        return await Users.find(loaders, options).sort({ createdAt: -1 }).lean();
    },

    update: async (id, data) => {
        return await Users.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Users.findByIdAndRemove(id);
    },
};

module.exports = API_Users;