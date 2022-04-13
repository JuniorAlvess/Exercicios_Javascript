const mongoose = require('mongoose');
const validator = require('validator');
const bcryptJs = require('bcryptjs')

const loginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', loginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        try {
            this.valida();
            if (this.errors.length > 0) return;
            this.user = await LoginModel.findOne({ email: this.body.email });
            
            if (!this.user) {
                this.errors.push('Usuário não existe.');
                return;
            }
            
            if (!bcryptJs.compareSync(this.body.password, this.user.password)) {
                this.errors.push('Senha invalida.');
                this.user = null;
                return;
            }
        } catch (e) { console.log(e) }
    }

    async register() {
        this.valida();
        if (this.errors.length > 0) return;

        await this.userExists();

        const salt = bcryptJs.genSaltSync(); // sequencia de caracteres aleatórios.
        this.body.password = bcryptJs.hashSync(this.body.password, salt); // transforma a senha de texto simples em um hash criptografado.
        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Usuário já existe.');
    }

    valida() {
        this.cleanUp()

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if (this.body.password.length < 3 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres.');
        }
    }

    // garantir que tudo que for passado pelo body seja string
    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        };

        this.body = {
            email: this.body.email,
            password: this.body.password
        };
    }
}

module.exports = Login;