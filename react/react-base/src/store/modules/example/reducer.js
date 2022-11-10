const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action?.type) {
    case 'BOTAO_CLICADO': {
      const newState = { ...state }; // O estado atual nunca deve ser alterado.
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    default:
      return state;
  }
}
