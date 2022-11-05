const form = document.getElementById('search');
const title = document.getElementById('query');
const year = document.getElementById('year');
const submit = document.getElementById('submit');

form.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const movie = await getData(title.value, parseInt(year.value));
    console.log(movie)
    console.log('hey')
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
