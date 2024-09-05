async function searchMovies() {
    const searchInput = document.getElementById("searchInput").value;
    const apiKey = '8f5c0cdc'; // Substitua pelo seu próprio API Key do OMDb
    const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            displayError(data.Error);
        }
    } catch (error) {
        console.error('Erro:', error);
        displayError('Ocorreu um erro ao buscar filmes. Por favor, tente novamente.');
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");

        const poster = movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"; // Placeholder se não houver imagem
        const title = movie.Title;
        const year = movie.Year;
        const imdbID = movie.imdbID;

        movieElement.innerHTML = `
            <img src="${poster}" alt="${title} Poster">
            <div class="movie-info">
                <h3>${title}</h3>
                <p>Ano: ${year}</p>
                <a href="https://www.imdb.com/title/${imdbID}" target="_blank">Ver no IMDb</a>
            </div>
        `;

        movieList.appendChild(movieElement);
    });
}

function displayError(errorMessage) {
    const movieList = document.getElementById("movieList");
    movieList.innerHTML = `<p class="error">${errorMessage}</p>`;
}