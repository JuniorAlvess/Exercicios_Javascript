function rand(min = 0, max = 3) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function esperaAi(msg, tempo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof msg !== 'string') {
                reject('O valor passado não é uma string');
                return;
            }

            resolve(msg.toUpperCase());
            return;
        }, tempo);
    });
}

async function executa() {
    try {
        const fase1 = await esperaAi('Fase1', rand());
        console.log(fase1);
        const fase2 = await esperaAi('Fase2', rand());
        console.log(fase2);
        const fase3 = await esperaAi('Fase3', rand());
        console.log(fase3);
    } catch (err) {0
        console.log(err);
    }
}

executa();