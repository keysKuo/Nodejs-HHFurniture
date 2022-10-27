const fs = require('fs');

const fileapis = {
    createSync: (path, callback) => {
        if(!this.isExist) {
            fs.mkdirSync(path, { recursive: true }, err => {
                return callback(err);
            })
        }
    },

    updateSync: (oldpath, callback) => {
        fs.readFile(oldpath, (err, data) => {
            if(err) {
                return callback(err);
            }

            this.deleteSync(oldpath, callback);
        })   
    },

    deleteSync: (path, callback) => {
        fs.unlink(path, err => {
            return callback(err);
        });
    },

    removeDirectory: (path, callback) => {
        fs.rmdir(path, err => {
            return callback(err);
        })
    },

    isExist: (path) => {
        try {
            if(fs.existsSync(path)) {
                return true;
            }            
        } catch (err) {
            console.log(err);
        }

        return false;
    }
   
}

module.exports = fileapis;