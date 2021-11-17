const nome = "Junior"
const sobrenome = "Alves"

const falaNome = () => `Meu nome é ${nome} ${sobrenome}`

exports.nome = nome;
exports.sobrenome = sobrenome;
exports.falaNome = falaNome;
// this =>  aponta para o exports.
this.qualquerCoisa = "O que eu quiser exportar";

console.log(module.exports)