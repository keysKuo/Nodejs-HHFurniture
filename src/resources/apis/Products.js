const { Products } = require('../models');
const { google } = require('googleapis');
const keys = require('../../config/hhfurniture-fef7435f6151.json');
const client = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
)

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

    updateByPID: async (pid, data) => {
        return Products.findOneAndUpdate({pid: {$in: pid}}, data);
    },

    updateSheet: async (data) => {
        client.authorize(async (err, tokens) => {
            if(err) {
                console.log(err);
                return;
            }
            else {
                console.log('Connected');
                await gsclear(client);
                await gsrun(client,data);
            }
        })
    }
};

async function gsclear(cl) {
    const gsapi = google.sheets({version: 'v4', auth: cl});
        
    await gsapi.spreadsheets.values.clear({
        spreadsheetId: '1tKCy3CrwUQP-WXscHNqbv7acOlAGagRFCfzgZc-Wvs0',
        range: 'Sheet1!A2:Z1000',
    });
}

async function gsrun(cl, data) {
    const gsapi = google.sheets({version: 'v4', auth: cl});
        
    const updateOptions = {
        spreadsheetId: '1tKCy3CrwUQP-WXscHNqbv7acOlAGagRFCfzgZc-Wvs0',
        range: 'Sheet1!A2',
        valueInputOption: 'USER_ENTERED',
        resource: { values: data }
    }
    
    let res = await gsapi.spreadsheets.values.update(updateOptions);
    console.log(res)
}


module.exports = API_Products;
