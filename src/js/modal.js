// Variável global para armazenar informações do filme atual
let filmeAtual = {};

// Elementos do DOM
const tituloInput = document.getElementById("busca-titulo");
const anoInput = document.getElementById("busca-ano");
const divContainer = document.getElementById("modal-container");
const h1Frase = document.getElementById("frase-lista");

// Evento que é disparado quando o DOM é carregado
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("modal-overlay");
  const fundoOverlay = document.getElementById("modal-backgound");

  // Fechar o modal ao clicar no fundo
  fundoOverlay.addEventListener("click", function () {
    overlay.classList.remove("open");
    overlay.classList.add("overlay");
  });
});

// Função para adicionar um novo filme à lista
function addNovoFilmeAtualLista() {
  // Verifica se o filme já está na lista
  if (isFilmeExistenteList(filmeAtual.imdbID)) {
    notie.alert({
      type: "error",
      text: "O filme escolhido já consta na lista!",
    });
  } else {
    // Adiciona o filme à lista e atualiza a interface
    addMovieList(filmeAtual);
    addMovieListInterface(filmeAtual);
    atualizarLocalStorage();
    fecharModal();
    alterarFrase(mudarFrase());

    // Limpa os campos de busca
    tituloInput.value = "";
    anoInput.value = "";
  }
}

// Função para criar o modal com as informações do filme
function createModal(dados) {
  filmeAtual = dados;

  divContainer.innerHTML = `<h2>${dados.Title}</h2>
            <section id="modal-body">
              <img src="${dados.Poster}" />
              <div id="movie-info">
                <p id="movie-plot">${dados.Plot}</p>
                <label for="movie-cast">Elenco:</label>
                <p id="movie-cast">${dados.Actors}</p>
                <label for="movie-genre">Gênero:</label>
                <p id="movie-genre">${dados.Genre}</p>
                <label for="movie-year">Ano:</label>
                <p id="movie-year">${dados.Year}</p>
              </div>
            </section>
            <section id="modal-footer">
              <button onclick='addNovoFilmeAtualLista()' id="add-to-list">Adicionar à Lista</button>
            </section>`;
}

// Função para fechar o modal
function fecharModal() {
  overlay.classList.remove("open");
}

// Função para alterar a frase na interface
function alterarFrase(frase) {
  h1Frase.textContent = frase;
}

// Função para gerar uma nova frase aleatória
function mudarFrase() {
  let frases = [
    "Mais um filme incrível na sua lista! 😁",
    "Continue adicionando seus filmes preferidos! 😊",
    "Sua coleção de filmes está crescendo! 😌",
    "Adicione mais filmes para curtir! 😊",
    "Continue explorando novos filmes! 😄",
    "Excelente escolha! Adicione mais filmes! 😍",
    "Sua lista de filmes está ficando ótima! 😍",
    "Continue montando sua lista de favoritos! 🥰",
    "Mais um para a coleção de filmes favoritos! 😎",
    "Continue descobrindo novos favoritos! 😃",
    "Ótima escolha para sua coleção! 😄",
    "Seus filmes favoritos estão aumentando! 🎥",
    "Adicione mais filmes para curtir momentos incríveis! 🌟",
    "Continue explorando novos filmes e expandindo sua lista! 🚀",
    "Você está construindo uma lista incrível de filmes! 😃",
    "Continue adicionando seus favoritos! 🎬",
    "Sua lista de filmes está ficando sensacional! 😎",
    "Mais um filme para a sua coleção! 🎞️",
    "Continue descobrindo novas histórias! 📽️",
    "Adicione mais filmes para se emocionar! ❤️",
    "Sua lista de favoritos está repleta de boas escolhas! 👌",
    "Continue explorando novos gêneros! 🎭",
    "Ótimo acréscimo à sua coleção de filmes! 🌟",
    "Continue montando sua lista de filmes preferidos! 😊",
    "Mais um sucesso para sua coleção! 🏆",
    "Continue expandindo sua lista de favoritos! 🚀",
    "Excelente escolha para sua coleção de filmes! 😍",
    "Continue adicionando filmes incríveis! 🎥",
    "Sua lista de filmes está cada vez melhor! 🌟",
    "Continue descobrindo novos favoritos! 🎞️",
    "Adicione mais filmes para diversificar sua coleção! 🌈"
  ];

  const maxLengthFrases = frases.length;

  const valorAle = Math.floor(Math.random() * maxLengthFrases);
  return frases[valorAle];
}
