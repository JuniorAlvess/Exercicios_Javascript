import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import {
  FaUserCircle,
  FaEdit,
  FaWindowClose,
  FaExclamation,
} from 'react-icons/fa';

import { toast } from 'react-toastify';
import { Container } from '../../styles/GlobalStyles';
import { AlunoContainer, ProfilePicture } from './styled';

import axios from '../../services/axios';

import Loading from '../../components/Loading';

export default function Alunos() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await axios.delete(`/alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
      toast.success('Aluno excluído com sucesso');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login.');
      } else {
        toast.error('Erro ao excluir aluno.');
      }

      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      try {
        const response = await axios.get('/alunos');
        setAlunos(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Alunos</h1>

      <AlunoContainer>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <ProfilePicture>
              {aluno.Fotos[0] ? (
                <img src={aluno.Fotos[0].url} alt="User" />
              ) : (
                <FaUserCircle size={36} />
              )}
            </ProfilePicture>

            <span>{aluno.nome}</span>
            <span>{aluno.email}</span>

            <Link to={`/aluno/:${aluno.id}/edit`}>
              <FaEdit size={16} />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/aluno/:${aluno.id}/delete`}>
              <FaWindowClose size={16} />
            </Link>

            <FaExclamation
              size={16}
              display="none"
              cursor="pointer"
              onClick={(e) => handleDelete(e, aluno.id, index)}
            />
          </div>
        ))}
      </AlunoContainer>
    </Container>
  );
}
