import { timelineEvents } from "..//data/timeline-data.js";
// import { navigateToIndex } from "./timeline-core.js";

// Usa o evento de input do teclado para procurar o valor no JSON de dados. 
// Eu iria separar as responsabilidades depois de pronto, para facilitar debug e manutenção
function searchTerms() {
  const searchButton = document.querySelector(".search-btn");
  const searchInput = document.querySelector(".search-terms");
  const resultArea = document.querySelector(".result-container");
  const closeDialog = document.querySelector(".btn-close");

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  searchInput.addEventListener("input", (e) => {
    e.preventDefault();

    const query = searchInput.value.trim();
    resultArea.innerHTML = ""; 

    if (query === "") return; 

    const regex = new RegExp(escapeRegex(query), "i");

    timelineEvents.forEach((register) => {
      if (regex.test(register.description)) {
        resultArea.appendChild(insertResult(register.title));
        getIndexOfEntry(timelineEvents, register);
      }
    });
  });

  closeDialog.addEventListener("click", () => { searchInput.value = ""; });
}

// Adiciona o resultado encontrado no drop-down das sugestões de pesquisa
function insertResult(result) {
    const foundEntries = document.createElement("div");
    foundEntries.classList.add("list-group", "py-1");

    // Usando Link não deu certo. Eu iria criar um elemento button
    const entry = document.createElement("a");
    entry.setAttribute("role", "button");

    // Adiciona classes Bootstrap ao elemento drop-down criado
    if(foundEntries.hasChildNodes()) {
        entry.classList.add("list-group-item", "list-group-item-action", "active", "bg-info-subtle", "flex-column", "click-result");
        entry.setAttribute("aria-current", "true");
    } else {
        entry.classList.add("list-group-item", "list-group-item-action", "click-result");
    }


    entry.innerText = `${result}`;
    foundEntries.appendChild(entry);

    
    return foundEntries;
}

// Função que isolaria o indice do registro encontrado com intuito de direcionar para o respectivo card
// Uma outra função iria usar esse valor para fazer o direcionamento. Não tive tempo de fazer.
function getIndexOfEntry(entries, register) {
    return;
}

export { searchTerms }
