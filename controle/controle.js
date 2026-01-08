const listaOSDiv = document.getElementById("listaOS");

function carregarOS() {
  const lista = JSON.parse(localStorage.getItem("ordensServico")) || [];
  listaOSDiv.innerHTML = "";

  if (lista.length === 0) {
    listaOSDiv.innerHTML = "<p>Nenhuma OS encontrada.</p>";
    return;
  }

  lista.forEach((os, index) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";

    div.innerHTML = `
      <strong>Protocolo:</strong> ${os.protocolo}<br>
      <strong>Cliente:</strong> ${os.nome}<br>
      <strong>WhatsApp:</strong> ${os.whatsapp}<br>
      <strong>Mídias:</strong> ${os.midias.join(", ")}<br>
      <strong>Quantidade:</strong> ${os.quantidade}<br>
      <strong>Condições:</strong> ${os.condicoes}<br>
      <strong>Status:</strong>
      <select onchange="atualizarStatus(${index}, this.value)">
        <option ${os.status === "Recebido" ? "selected" : ""}>Recebido</option>
        <option ${os.status === "Em digitalização" ? "selected" : ""}>Em digitalização</option>
        <option ${os.status === "Finalizado" ? "selected" : ""}>Finalizado</option>
      </select>
    `;

    listaOSDiv.appendChild(div);
  });
}

function atualizarStatus(index, novoStatus) {
  const lista = JSON.parse(localStorage.getItem("ordensServico")) || [];
  lista[index].status = novoStatus;
  localStorage.setItem("ordensServico", JSON.stringify(lista));
}

function buscarOS() {
  const termo = document.getElementById("buscaProtocolo").value.trim();
  const lista = JSON.parse(localStorage.getItem("ordensServico")) || [];
  const encontrada = lista.find(os => os.protocolo === termo);

  listaOSDiv.innerHTML = "";

  if (!encontrada) {
    listaOSDiv.innerHTML = "<p>OS não encontrada.</p>";
    return;
  }

  const div = document.createElement("div");
  div.style.border = "1px solid #ccc";
  div.style.padding = "10px";

  div.innerHTML = `
    <strong>Protocolo:</strong> ${encontrada.protocolo}<br>
    <strong>Cliente:</strong> ${encontrada.nome}<br>
    <strong>WhatsApp:</strong> ${encontrada.whatsapp}<br>
    <strong>Mídias:</strong> ${encontrada.midias.join(", ")}<br>
    <strong>Quantidade:</strong> ${encontrada.quantidade}<br>
    <strong>Condições:</strong> ${encontrada.condicoes}<br>
    <strong>Status:</strong> ${encontrada.status}
  `;

  listaOSDiv.appendChild(div);
}

// carrega automaticamente
carregarOS();
