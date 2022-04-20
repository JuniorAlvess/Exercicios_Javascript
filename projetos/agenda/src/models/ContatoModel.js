const mongoose = require('mongoose');
const validator = require('validator')

const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    telefone: { type: String, required: false, default: '' },
    criadoEm: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.telefone = null;
}

Contato.prototype.register = async function () {
    try {
        this.valida();
        if (this.errors.length > 0) return;

        this.contato = await ContatoModel.create(this.body);
    } catch (e) { console.log(e) }
};

Contato.prototype.valida = function () {
    this.cleanUp();

    // console.log(this.body)

    if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push("E-mail inválido.");
    if (!this.body.nome) this.errors.push('Nome é um campo obrigatório.');
    if (!this.body.email && !this.body.telefone) {
        this.errors.push('Pelo menos um contato precisa ser enviado: e-mail ou telefone.');
    }
};

Contato.prototype.cleanUp = function () {
    for (let key in this.body) {
        if (typeof this.body[key] !== 'string') {
            this.body[key] = '';
        }
    }

    this.body = {
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
        telefone: this.telefone,
    };
};

module.exports = Contato;