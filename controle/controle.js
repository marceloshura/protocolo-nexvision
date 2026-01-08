import { db } from "../js/firebase.js";
import { collection, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const lista = document.getElementById("lista");
const filtroStatus = document.getElementById("filtroStatus");

// Listener para filtro
filtroStatus.addEventListener("change", () => {
  carregarProtocolos(filtroStatus.value);
});

// Atualiza status no Firestore
async function atualizarStatus(id, novoStatus) {
  try {
    const docRef = doc(db, "protocolos", id);
    await updateDoc(docRef, { status: novoStatus });
    carregarProtocolos(); // Atualiza a lista automaticamente
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}

// Carrega protocolos do Firestore
async function carregarProtocolos(filtro = "Todos") {
  try {
    const querySnapshot = await getDocs(collection(db, "protocolos"));
    lista.innerHTML = "";

    querySnapshot.forEach((docSnap) => {
      const dados = docSnap.data();

      // Aplica filtro
      if (filtro !== "Todos" && dados.status !== filtro) return;

      const li = document.createElement("li");

      // Cria dropdown de status e botão WhatsApp
      li.innerHTML = `
        <strong>${dados.protocolo}</strong> - 
        <select id="status-${docSnap.id}">
          <option value="Recebido" ${dados.status === "Recebido" ? "selected" : ""}>Recebido</option>
          <option value="Em Andamento" ${dados.status === "Em Andamento" ? "selected" : ""}>Em Andamento</option>
          <option value="Concluído" ${dados.status === "Concluído" ? "selected" : ""}>Concluído</option>
        </select>
        <button id="whatsapp-${docSnap.id}">Enviar WhatsApp</button>
        <br>
        Nome: ${dados.nome}<br>
        WhatsApp: ${dados.whatsapp}<br>
        Email: ${dados.email}<br>
        Endereço: ${dados.endereco}<br>
        Tipos de fita: ${dados.fitas.join(", ")}<br>
        Quantidade: ${dados.quantidade}<br>
        Condições: ${dados.condicoes}<br>
        Criado em: ${dados.criadoEm?.toDate ? dados.criadoEm.toDate().toLocaleString() : "—"}
      `;

      // Adiciona classes para cores por status
      if (dados.status === "Recebido") li.classList.add("recebido");
      else if (dados.status === "Em Andamento") li.classList.add("em-andamento");
      else if (dados.status === "Concluído") li.classList.add("concluido");

      // Listener para dropdown de status
      const selectStatus = li.querySelector("select");
      selectStatus.addEventListener("change", () => {
        atualizarStatus(docSnap.id, selectStatus.value);
      });

      // Listener para botão WhatsApp
      const btnWhats = li.querySelector("button");
      btnWhats.addEventListener("click", () => {
        const msg = `Olá, ${dados.nome}! Seu protocolo ${dados.protocolo} está atualmente com status: ${selectStatus.value}.`;
        const url = `https://wa.me/11921432425?text=${encodeURIComponent(msg)}`;

        // Abrir em nova aba de forma segura
        const win = window.open(url, "_blank", "noopener,noreferrer");
        if (!win) {
          alert("O popup do WhatsApp foi bloqueado. Libere o popup e tente novamente.");
        }
      });

      lista.appendChild(li);
    });

  } catch (error) {
    console.error("Erro ao carregar protocolos:", error);
    lista.innerHTML = "<li>Erro ao carregar protocolos. Confira o console.</li>";
  }
}

// Carrega protocolos ao iniciar
carregarProtocolos();
