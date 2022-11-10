import React from 'react';
import { useDispatch } from 'react-redux';

import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();

    dispatch({
      type: 'BOTAO_CLICADO',
    });
  };

  return (
    <Container>
      <Title>
        Login
        <small>Oie</small>
      </Title>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
        distinctio porro quibusdam nam aperiam ducimus modi fuga at quod.
        Adipisci, ipsum. Nostrum veritatis necessitatibus labore atque,
        laudantium culpa commodi voluptate?
      </p>

      <button type="button" onClick={(e) => handleClick(e)}>
        Enviar
      </button>
    </Container>
  );
}
