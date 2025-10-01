const form = document.querySelector("form");
const movieList = document.querySelector(".movie-list ul");

// Load movies from localStorage
let movies = JSON.parse(localStorage.getItem("movies")) || [];

// Function to display movies
function renderMovies() {
  movieList.innerHTML = ""; // clear list
  movies.forEach((movie, index) => {
    const li = document.createElement("li");

    const titleSpan = document.createElement("span");
    titleSpan.className = "movie-title";
    titleSpan.textContent = `${movie.name} (${movie.year})`;

    const genreSpan = document.createElement("span");
    genreSpan.className = "genre";
    genreSpan.textContent = movie.genre;

    const btn = document.createElement("button");
    btn.className = "watched-btn";
    btn.textContent = "Watched ✅";

    // Remove movie when clicked
    btn.addEventListener("click", () => {
      movies.splice(index, 1);
      saveMovies();
      renderMovies();
    });

    li.appendChild(titleSpan);
    li.appendChild(genreSpan);
    li.appendChild(btn);

    movieList.appendChild(li);
  });
}

// Save movies to localStorage
function saveMovies() {
  localStorage.setItem("movies", JSON.stringify(movies));
}

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const movieName = form.querySelector("input[placeholder='Movie Name']").value.trim();
  const genre = form.querySelector("input[placeholder='Genre']").value.trim();
  const year = form.querySelector("input[placeholder='Year']").value.trim();

  if (movieName === "" || genre === "" || year === "") {
    alert("Please fill in all fields!");
    return;
  }

  // Add movie to array
  movies.push({ name: movieName, genre: genre, year: year });
  saveMovies();
  renderMovies();

  form.reset();
});

// Initial render
renderMovies();
