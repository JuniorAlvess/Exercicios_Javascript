import React from 'react';

import { Title } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Login() {
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

      <button type="button">Enviar</button>
    </Container>
  );
}
