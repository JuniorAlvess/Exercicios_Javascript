import Aluno from '../models/Aluno';

class HomeController {
  async index(req, res) {
    try {
      const novoAluno = await Aluno.create({
        nome: 'Junior',
        sobrenome: 'Alves',
        email: 'junior@test.com',
        idade: 24,
        peso: 78,
        altura: 1.74,
      });

      res.json(novoAluno);
    } catch (err) {
      console.log('This error', err);
    }
  }
}

export default new HomeController();
