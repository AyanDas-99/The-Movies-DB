const mainDiv = document.querySelector('.main')
const form = document.getElementById('search');
const title = document.getElementById('query');
const year = document.getElementById('year');
const submit = document.getElementById('submit');

const detailsDiv = document.querySelector('.details');
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
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


// Event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  displayPreSetup();
  const movie = await getData(title.value, parseInt(year.value));
  if (notFound(movie)) {
    displayError();
  }
  else {
    displaySetup(movie);
  }
});


// Fetch movie data
const getData = async (title, year) => {
  console.log(title, year);
  let url;
  if (isNaN(year)) {
    url = `http://www.omdbapi.com/?t=${title}&apikey=97fabfbf`
  }
  else {
    url = `http://www.omdbapi.com/?t=${title}&y=${year}&apikey=97fabfbf`
  }
  let f = await fetch(url)
  return await f.json();
}


//Display Setup for search
const displayPreSetup = () => {
  detailsDiv.style.display = 'none'
  mainDiv.classList.add('postSearch')
  const gif = document.createElement('img');
  gif.id = 'loaderGif';
  gif.src = 'media/Spinner-1s-200px.gif'
  gif.style.display = 'block'
  gif.style.margin = '2em auto'
  document.body.appendChild(gif);
}


// Display movie data
function displaySetup(movie) {
  document.body.removeChild(document.getElementById('loaderGif'));
  try{
    document.body.removeChild(document.getElementById('error-msg'));
  }
  catch(e){
     
  }
  detailsDiv.style.display = 'block';
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


// display movie genre
function displayGenre(genre) {
  genreDiv.innerHTML = ''
  const genres = genre.split(',');
  genres.forEach((element) => {
    const span = document.createElement('span')
    span.className = 'genreItem';
    span.textContent = element.trim();
    genreDiv.appendChild(span)
  })
}


// check if movie not found
function notFound(movie) {
  return movie.Response === 'False';
}

// Display not found error
function displayError() {
  const errorDiv = document.createElement('div');
  errorDiv.id = 'error-msg';
  errorDiv.style.width = '100%'
  errorDiv.style.textAlign = 'center'
  errorDiv.style.color = 'grey'
  errorDiv.style.fontSize = 'large';
  errorDiv.style.marginTop = '3em'
  const errorIcon = document.createElement('img');
  errorIcon.src = 'media/computer.png';
  errorDiv.appendChild(errorIcon);
  const errMsg =document.createElement('h4');
  errMsg.textContent = 'Requested movie not found';
  errorDiv.appendChild(errMsg);
  document.body.appendChild(errorDiv);
  document.body.removeChild(document.getElementById('loaderGif'));
}