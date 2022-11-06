const mainDiv = document.querySelector('.main')
const form = document.getElementById('search');
const title = document.getElementById('query');
const year = document.getElementById('year');
const submit = document.getElementById('submit');

const poster = document.getElementById('poster');
const titleDisplay = document.querySelector('.title');
const mainRating = document.querySelector('#main-rating');
const genreDiv = document.querySelector('.genre');
const plot = document.querySelector('.plot')
const director = document.querySelector('#director');
const writer = document.querySelector('#writer');
const cast = document.querySelector('#cast');

// collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const movie = await getData(title.value, parseInt(year.value));
    displayPreSetup();
    displaySetup(movie);
});

const getData = async(title, year)=>{
    console.log(title, year);
    let url;
    if(isNaN(year)){
        url = `http://www.omdbapi.com/?t=${title}&apikey=97fabfbf`
    }
    else{
        url = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=97fabfbf`
    }
    let f = await fetch(url)
    return await f.json();
}

const displayPreSetup = ()=>{
    mainDiv.classList.add('postSearch')
}

function displaySetup(movie) {
    console.log(movie);
    poster.src = movie.Poster;
    titleDisplay.firstElementChild.textContent = movie.Title;
    mainRating.textContent = movie.imdbRating;
    displayGenre(movie.Genre);
    plot.textContent = movie.Plot;
    director.textContent = movie.Director;
    writer.textContent = movie.Writer;
    cast.textContent = movie.Actors;
}

function displayGenre(genre) {
    genreDiv.innerHTML = ''
    const genres = genre.split(',');
    genres.forEach((element)=>{
        const span = document.createElement('span')
        span.className = 'genreItem';
        span.textContent = element.trim();
        genreDiv.appendChild(span)
    })
}