import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';

import { Form } from './styled';
import Loading from '../../components/Loading';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

// eslint-disable-next-line react/prop-types
export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);

  const [nome, setNome] = useState('');
  const [sobrenome, setSobreNome] = useState('');
  const [idade, setIdade] = useState('');
  const [email, setEmail] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErros = false;

    if (nome.length < 3 || nome.length > 255) {
      formErros = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      formErros = true;
      toast.error('Sobrenome deve ter entre 3 e 255 caracteres');
    }

    if (!isEmail(email)) {
      toast.error('Email inválido');
      formErros = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade inválida');
      formErros = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido');
      formErros = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida');
      formErros = true;
    }

    if (formErros) return;

    try {
      setIsLoading(true);
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) editado(a) com sucesso');
      } else {
        const { data } = await axios.post(`/alunos/`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        toast.success('Aluno(a) criado(a) com sucesso');
        history.push(`/aluno/${data.id}/edit`);
      }
      setIsLoading(false);
    } catch (error) {
      const status = get(error, 'response.status', 0);
      const data = get(error, 'response.data', {});
      const erros = get(data, 'errors', []);
      if (erros.length > 0) {
        erros.map((err) => toast.error(err));
      } else {
        toast.error('Erro desconhecido.');
      }

      if (status === 401) dispatch(actions.loginFailure());
      setIsLoading(false);
    }

    console.log(formErros);
  };

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios(`/alunos/${id}`);
        const Foto = get(data, 'Foto[0].url', '');
        console.log(Foto);

        setNome(data.nome);
        setSobreNome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
        const status = get(err, 'response.status', 0);
        const erros = get(err, 'response.data.errors', []);
        if (status === 400) erros.map((e) => toast.error(e));
        history.push('/');
      }
    }

    getData();
  }, [id]);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Novo Aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobreNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Peso"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <input
          type="text"
          placeholder="Altura"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.PropTypess = {
  match: PropTypes.shape({}).isRequired,
};
