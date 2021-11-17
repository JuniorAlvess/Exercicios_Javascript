const fs = require('fs').promises // file system
const path = require('path');


async function readdir(rootDir) {
    rootDir = rootDir || path.resolve(__dirname);
    const files = await fs.readdir(rootDir);
    walk(files);
}

async function walk(files) {
    for(let file of files) {
        const stats = await fs.stat();
            console.log(file);
    }
}

readdir('./');