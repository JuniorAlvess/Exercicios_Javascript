function rand(min, max) {
    min *= 1000;
    max *= 1000;
    return Math.floor(Math.random() * (max - min)) + min;
}

function esperaAi(mdg, tempo) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            if (typeof mdg !== 'string') {
                reject('BAD VALUE');
                return;
            }

            resolve(mdg);
            return;
        }, tempo);
    });
}

esperaAi('Conexão  com o BD', rand(1, 3))
    .then((resposta) => {
        // console.log(resposta);
        return esperaAi('Buscando dados da BASE', rand(1, 3));
    })
    .then((resposta) => {
        // console.log(resposta);
        return esperaAi('Tratando dados da BASE', rand(1, 3));
    })
    .then((resposta) => {
        // console.log(resposta);
        return esperaAi('Exibir dados na tela', rand(1, 3));
    })
    .catch((err) => {
        console.log('error' + err);
    });

console.log('Será exibido antes da promise')

// Métodos de Promises

// Promise.all => Entrega apenas uma promise com todos os valores dentro de uma array
const promisesAll = [
    'Primeiro valor',
    esperaAi('Promise 1', 3000),
    esperaAi('Promise 2', 500),
    esperaAi('Promise 3', 1000),
    'Outro valor'
];

Promise.all(promisesAll)
    .then(valor => {
        // console.log(valor);
    })
    .catch(err => {
        console.log(err);
    });

// Promise.race => Retorna a primeira promise resolvida
const promisesRace = [
    esperaAi('Promise 1', rand(1, 5)),
    esperaAi('Promise 2', rand(1, 5)),
    esperaAi('Promise 3', rand(1, 5)),
    esperaAi(1000, rand(1, 5)),
];

Promise.race(promisesRace)
    .then(valor => {
        // console.log(valor);
    })
    .catch(err => {
        console.log(err);
    });


// Promise.resolve
// Promise.reject

function baixarPagina() {
    const emCache = true;

    if (emCache) {
        // return Promise.reject('Página em cache');
        return Promise.resolve('Página em cache');
    } else {
        return esperaAi('Baixei a página', 3000);
    }
}

baixarPagina() 
    .then(dadosPagina => {
        console.log(dadosPagina);
    })
    .catch(err => console.log('ERROR: ' + err));