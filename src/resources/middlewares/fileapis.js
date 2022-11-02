const fs = require('fs-extra');

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
            if(err)
                return callback(err);
        });
    },

    removeDirectory: (path, callback) => {
        fs.rmdir(path, {recursive: true}, err => {
            if(err)
                return callback(err);
        })
    },

    isExist: (path) => {
        try {
            if(fs.existsSync(path)) {
                return true;
            }            
        } catch (err) {
            console.log(err + "Pss");
        }

        return false;
    },

    renameDir: (oldPath, newPath) => {
        if(oldPath != newPath) {
            if(this.isExist(newPath)) {
                this.removeDirectory(newPath);
            }
            return fs.renameSync(oldPath, newPath)
        }
    }
   
}

module.exports = fileapis;