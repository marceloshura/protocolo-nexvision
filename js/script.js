let currentStep = 0;
const steps = document.querySelectorAll(".step");

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
}

// WhatsApp: somente números
const whatsappInput = document.getElementById("whatsapp");
whatsappInput.addEventListener("input", () => {
  whatsappInput.value = whatsappInput.value.replace(/\D/g, "");
});

function validarWhatsApp() {
  // DDD (2) + telefone (9) = 11 dígitos
  return whatsappInput.value.length === 11;
}

function getMidiasSelecionadas() {
  const checkboxes = document.querySelectorAll('input[name="midia"]:checked');
  return Array.from(checkboxes).map(cb => cb.value);
}

function nextStep() {
  if (currentStep === 0) {
    if (!nome.value.trim()) {
      alert("Preencha o nome.");
      return;
    }
    if (!validarWhatsApp()) {
      alert("WhatsApp inválido. Use DDD+Telefone (apenas números).");
      return;
    }
  }

  if (currentStep === 1) {
    if (!endereco.value.trim()) {
      alert("Preencha o endereço.");
      return;
    }
    if (!complemento.value.trim()) {
      alert("Preencha o complemento.");
      return;
    }
  }

  currentStep++;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  showStep(currentStep);
}

function gerarProtocolo() {
  const ano = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `NX-${ano}-${rand}`;
}

function salvarOS(dados) {
  const lista = JSON.parse(localStorage.getItem("ordensServico")) || [];
  lista.push(dados);
  localStorage.setItem("ordensServico", JSON.stringify(lista));
}

function finalizar() {
  const midias = getMidiasSelecionadas();
  if (midias.length === 0) {
    alert("Selecione ao menos um tipo de mídia.");
    return;
  }

  if (!quantidade.value || !condicoes.value) {
    alert("Preencha quantidade e condições.");
    return;
  }

  const protocolo = gerarProtocolo();

  const os = {
    protocolo,
    nome: nome.value,
    whatsapp: whatsapp.value,
    endereco: endereco.value,
    cep: cep.value,
    complemento: complemento.value,
    midias: midias,              // <-- NOVO
    quantidade: quantidade.value,
    condicoes: condicoes.value,
    status: "Recebido",
    data: new Date().toISOString()
  };

  salvarOS(os);

  resultado.innerText =
    `Protocolo gerado: ${protocolo}\n` +
    `Mídias: ${midias.join(", ")}\n` +
    `Status inicial: Recebido`;

  currentStep++;
  showStep(currentStep);
}

// inicia
showStep(currentStep);
