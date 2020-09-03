// Função criada em um arquivo externo que mostra uma
// mensagem.

function showPopUp() {
    window.alert('Well done!!!')
}
const botao = document.getElementById('btn')
botao.addEventListener("click", showPopUp)