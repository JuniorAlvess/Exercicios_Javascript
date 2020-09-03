// In this kata you are required to, given a string, replace every letter with its position in the alphabet.

// If anything in the text isn't a letter, ignore it and don't return it.

// "a" = 1, "b" = 2, etc.

// Example
// alphabetPosition("The sunset sets at twelve o' clock.")
// Should return "20 8 5 19 21 14 19 5 20 19 5 20 19 1 20 20 23 5 12 22 5 15 3 12 15 3 11" (as a string)

function alphabetPosition(text) {
    // const array = [...text]

    // const n = []
    // for(let i = 1; i <= 26; i++) {
    //     n.push(i)
    // }

    const letras = 'abcdefghijklmnopqrstuvwxyz'
    const letra = Array.from(letras)
    // console.log(letra)

    const arrayTeste = []
    letra.forEach(function (nome, indice) {
        if (text.indexOf(nome) >= 1) {
            // console.log(indice + 1)
            const teste = indice + 1
            arrayTeste.push(teste)
        }
    })
    

    

    return text.replace(text, arrayTeste)
}

console.log(alphabetPosition("The sunset sets at twelve o' clock"))