import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("formProtocolo");
const resultado = document.getElementById("resultado");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pega valores do formulário
  const nome = document.getElementById("nome").value.trim();
  const whatsapp = document.getElementById("whatsapp").value.trim();
  const email = document.getElementById("email").value.trim();
  const endereco = document.getElementById("endereco").value.trim();
  const quantidade = document.getElementById("quantidade").value;
  const condicoes = document.getElementById("condicoes").value;

  // Pega fitas selecionadas
  const fitas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value);

  // Checagem mínima
  if (!nome || !whatsapp || !email || !endereco || !quantidade || !condicoes || fitas.length === 0) {
    resultado.innerText = "Preencha todos os campos corretamente.";
    return;
  }

  // Gera protocolo simples
  const protocolo = "NX-" + new Date().getFullYear() + "-" + Math.floor(Math.random() * 9000 + 1000);

  try {
    // Salva no Firestore
    await addDoc(collection(db, "protocolos"), {
      protocolo,
      nome,
      whatsapp,
      email,
      endereco,
      fitas,
      quantidade,
      condicoes,
      status: "Recebido",
      criadoEm: serverTimestamp()
    });

    // Mostra resultado com link de WhatsApp
    resultado.innerHTML = `
      Protocolo gerado: <strong>${protocolo}</strong><br>
      <a href="https://wa.me/${whatsapp}?text=Olá!%20Meu%20protocolo%20é%20${protocolo}" target="_blank">
        Enviar via WhatsApp
      </a>
    `;

    // Limpa formulário
    form.reset();

  } catch (error) {
    console.error("Erro ao salvar protocolo:", error);
    resultado.innerText = "Erro ao gerar protocolo. Confira o console.";
  }
});
