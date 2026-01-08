// Função para gerar um protocolo único (baseado em timestamp)
function gerarProtocolo() {
    const timestamp = Date.now();
    return `NXV-${timestamp}`;
}

// Captura elementos
const form = document.getElementById('formProtocolo');
const confirmacao = document.getElementById('confirmacao');
const protocoloSpan = document.getElementById('protocoloGerado');
const dadosConfirmacao = document.getElementById('dadosConfirmacao');
const btnWhatsApp = document.getElementById('btnWhatsApp');

form.addEventListener('submit', function(e) {
    e.preventDefault(); // previne envio tradicional

    // Validação do WhatsApp: só números, mínimo 10, máximo 13
    const whatsapp = document.getElementById('whatsapp').value.trim();
    if (!/^\d{10,13}$/.test(whatsapp)) {
        alert('Por favor, insira um WhatsApp válido (somente números, DDD + telefone).');
        return;
    }

    // Captura dados do formulário
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const endereco = document.getElementById('endereco').value.trim();
    const complemento = document.getElementById('complemento').value.trim();
    const quantidade = document.getElementById('quantidade').value.trim();
    const condicoes = document.getElementById('condicoes').value;

    const fitasNode = document.querySelectorAll('input[name="fitas"]:checked');
    const fitas = Array.from(fitasNode).map(f => f.value).join(', ') || 'Não informado';

    // Gera protocolo
    const protocolo = gerarProtocolo();

    // Preenche tela de confirmação
    protocoloSpan.textContent = protocolo;
    dadosConfirmacao.innerHTML = `
        <li><strong>Nome:</strong> ${nome}</li>
        <li><strong>WhatsApp:</strong> ${whatsapp}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Endereço:</strong> ${endereco}</li>
        <li><strong>Complemento:</strong> ${complemento}</li>
        <li><strong>Tipos de fita:</strong> ${fitas}</li>
        <li><strong>Quantidade:</strong> ${quantidade}</li>
        <li><strong>Condições:</strong> ${condicoes}</li>
    `;

    // Esconde formulário, mostra confirmação
    form.style.display = 'none';
    confirmacao.style.display = 'block';

    // Configura botão WhatsApp
    btnWhatsApp.onclick = function() {
        const mensagem = encodeURIComponent(
            `Olá, estou enviando meu protocolo: ${protocolo}\n` +
            `Nome: ${nome}\n` +
            `WhatsApp: ${whatsapp}\n` +
            `Email: ${email}\n` +
            `Endereço: ${endereco}\n` +
            `Complemento: ${complemento}\n` +
            `Tipos de fita: ${fitas}\n` +
            `Quantidade: ${quantidade}\n` +
            `Condições: ${condicoes}`
        );
        const numeroWhats = '11921432425'; // Alterar para seu número
        const url = `https://wa.me/${numeroWhats}?text=${mensagem}`;
        window.open(url, '_blank');
    };
});
