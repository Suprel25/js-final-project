const searchResultsEl = document.querySelector(".search__results");

async function searchResults() {
    const params = new URLSearchParams(window.location.search);
    const searchTerm = params.get("search");
    document.body.classList +=(' loading')
    const search = await fetch(`https://www.omdbapi.com/?apikey=84a3a969&s=${searchTerm}`);
    const searchResult = await search.json();
    const movies = searchResult.Search;
    setTimeout(() => {
       searchResultsEl.innerHTML = movies.slice (0,7 ).map(movie => searchResultsInnerHTML(movie)).join(""); 
       document.body.classList.remove('loading') 
    }, 1000);
   
}

function goBack(){
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve( window.location.href="http://127.0.0.1:5500/index.html")
        }, 1000);
    })
   
}

function searchResultsInnerHTML(movie){
    return `
         <div class="search__results movies-card">
            <div class="movies-card__container">
                 <div class="movie-img__">
                     <img class="search__results--img" src="${movie.Poster}">
                 </div> 
                <p class="title">${movie.Title}</p>
                <p class="year">${movie.Year}</p>
                <p class="type">${movie.Type}</p>
            </div>    
        </div>`
}

searchResults();

