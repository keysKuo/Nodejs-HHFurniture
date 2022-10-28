const { Customers } = require('../models');

const API_Customers = {
    create: async (data) => {
        return await new Customers(data).save();
    },

    readOne: async (loaders) => {
        return await Customers.findOne(loaders).lean();
    },

    readMany: async (loaders, options, select) => {
        if (select) {
            return await Customers.find(loaders, options).select(select).sort({ createdAt: -1 }).lean();
        }

        return await Customers.find(loaders, options).sort({ createdAt: -1 }).lean();
    },

    update: async (id, data) => {
        return await Customers.findByIdAndUpdate(id, { $set: data });
    },

    remove: async (id) => {
        return await Customers.findByIdAndRemove(id);
    },
};

module.exports = API_Customers;