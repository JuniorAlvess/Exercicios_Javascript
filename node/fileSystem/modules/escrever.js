const fs = require('fs').promises;

module.exports = (caminho, dados) => {
    // flag: 'w' => Apaga tudo que estiver escrito no arquivo e escreve novamente.
    // flag: 'a' => adiciona no final do arquivo. caso tenha algo escrito, ele vai adicionar no final.
    fs.writeFile(caminho, dados, { flag: 'w' });
}