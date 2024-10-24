// Elementos do DOM
const btnSerch = document.getElementById("botao-search");
const overlay = document.getElementById("modal-overlay");
const sectionMovieList = document.getElementById("movie-list");

// Array para armazenar os filmes adicionados à lista
let movieList = JSON.parse(localStorage.getItem("movieList")) ?? [];

// Atualiza a frase na página dependendo do estado da lista de filmes
if (movieList.length === 0) {
  h1Frase.textContent = "Comece já sua lista de filmes! 😊";
} else {
  h1Frase.textContent = mudarFrase();
}

// Evento ao clicar no botão de busca
document.addEventListener("DOMContentLoaded", function () {
  btnSerch.addEventListener("click", async function () {
    const tituloInput = document.getElementById("busca-titulo");
    const anoInput = document.getElementById("busca-ano");
    let titulo = formatarTituloParaURL(tituloInput.value);
    let ano = anoInput.value;

    const key = "497d14f8";

    // Verifica se os campos de busca estão preenchidos
    if (tituloInput.value && anoInput.value) {
      if (validarAno(ano)) {
        try {
          const url = `http://www.omdbapi.com/?apikey=${key}&t=${titulo}&y=${ano}`;
          ;
          const resposta = await fetch(url);
          const dados = await resposta.json();
          if (dados.Error) {
            throw new Error("filme não encontrado!");
          }

          createModal(dados);
          overlay.classList.add("open");
        } catch (error) {
          //emitir um alerta com a biblioteca notie
          notie.alert({
            type: "error",
            text: error,
          });
        }
      }
    } else if (tituloInput.value && !anoInput.value) {
      try {
        const url = `http://www.omdbapi.com/?apikey=${key}&t=${titulo}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();
        if (dados.Error) {
          throw new Error("filme não encontrado");
        }
        createModal(dados);
        overlay.classList.add("open");
      } catch (error) {
        notie.alert({
          type: "error",
          text: error,
        });
      }
    } else if (!tituloInput.value && !anoInput.value) {
      notie.alert({
        type: "error",
        text: "Para realizar a busca é necessário ao menos do nome do filme",
      });
    }
  });
});

// Verifica se o filme já está na lista de filmes favoritos
function isFilmeExistenteList(id) {
  function idPertenceFilme(filmeAtual) {
    return filmeAtual.imdbID === id;
  }
  return Boolean(movieList.find(idPertenceFilme));
}

// Remove um filme da lista de filmes favoritos
function removerFilmeDaLista(id) {
  notie.confirm({
    text: "Tem certeza que deseja excluir o filme da lista?",
    submitText: "Sim",
    cancelText: "Não",
    position: "top",
    submitCallback: function remove() {
      movieList = movieList.filter((filme) => filme.imdbID !== id);
      document.getElementById(`movie-card-${id}`).remove();
      atualizarLocalStorage();

      if (movieList.length === 0) {
        const frase = "Comece já sua lista de filmes! 😊";
        alterarFrase(frase);
      } else {
        return;
      }
    },
  });
}

// Adiciona um filme à lista de filmes favoritos
function addMovieList(object) {
  movieList.push(object);
}

// Adiciona um filme à interface da lista de filmes favoritos
function addMovieListInterface(objetoFilme) {
  sectionMovieList.innerHTML += `
  <article id='movie-card-${objetoFilme.imdbID}'>
    <img src="${objetoFilme.Poster}" alt="Poster de ${objetoFilme.Title}" />
    <button id='btn-rm' onclick="{removerFilmeDaLista('${objetoFilme.imdbID}')}" >Remover</button>
  </article> `;
}

// Formata o título do filme para ser usado na URL da busca
function formatarTituloParaURL(titulo) {
  return titulo.replaceAll(" ", "+");
}

// Valida se o ano do filme é um número de 4 dígitos
function validarAno(ano) {
  if (Number(ano) > 999 && Number(ano) < 10000) {
    return true;
  }
  return false;
}

// Atualiza os dados da lista de filmes na localStorage
function atualizarLocalStorage() {
  localStorage.setItem("movieList", JSON.stringify(movieList));
}

// Adiciona os filmes da lista à interface ao carregar a página
for (const movieInfo of movieList) {
  addMovieListInterface(movieInfo);
}
