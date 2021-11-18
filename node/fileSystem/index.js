const fs = require('fs').promises // file system
const path = require('path');


async function readdir(rootDir) {
    try {
        rootDir = rootDir || path.resolve(__dirname);
        const files = await fs.readdir(rootDir);
        walk(files, rootDir);
    } catch (err) {
        console.log(err.name + ': ' + err.message);
    }
}

async function walk(files, rootDir) {
    for (let file of files) {
        const fileFullPath = path.resolve(rootDir, file);
        const stats = await fs.stat(fileFullPath); // pegando os dados do arquivo

        if(/\.git/g.test(fileFullPath)) continue;
        if(/node_modules/g.test(fileFullPath)) continue;

        if (stats.isDirectory()) {
            readdir(fileFullPath);
            continue;
        }

        if(!/\.html$/g.test(fileFullPath)) continue;

        console.log(fileFullPath);
    }
}

readdir('/Users/Junior/Projects/Study/Exercicios_Javascript/');