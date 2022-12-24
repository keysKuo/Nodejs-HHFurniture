// const { google } = require('googleapis');
// const keys = require('./config/hhfurniture-fef7435f6151.json');
// require('dotenv').config();
// const Excel = require('exceljs')
// const client = new google.auth.JWT(
//     keys.client_email,
//     null,
//     keys.private_key,
//     ['https://www.googleapis.com/auth/spreadsheets']
// )

// client.authorize((err, tokens) => {
//     if(err) {
//         console.log(err);
//         return;
//     }
//     else {
//         console.log('Connected');
//         gsrun(client);
//     }
// })

// async function gsrun(cl) {
//     const gsapi = google.sheets({version: 'v4', auth: cl});

//     const wb = new Excel.Workbook();
//     const data = await wb.xlsx.readFile('addProduct.xlsx')
//         .then(result => {
//             let data = result.getWorksheet('Sheet1').getSheetValues();
//             data.shift();
//             // data.shift();
//             return data.map(r => {
//                 return r.slice(1)
//             });
//         })
//     // console.log(data)
    
//     const updateOptions = {
//         spreadsheetId: '1tKCy3CrwUQP-WXscHNqbv7acOlAGagRFCfzgZc-Wvs0',
//         range: 'Sheet1!A1',
//         valueInputOption: 'USER_ENTERED',
//         resource: { values: data }
//     }

//     let res = await gsapi.spreadsheets.values.update(updateOptions);
//     console.log(res)
// }