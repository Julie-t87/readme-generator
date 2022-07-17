const fs = require('fs');

// write file to /dist/README.md and if it can't an error is thrown

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Readme created! Please see the /dist folder to see the file.'
            });
        });
    });
};

// export function to be used in the main file

module.exports = writeFile;