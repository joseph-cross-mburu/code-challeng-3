// we are going to creat a cinema system which will bw able to do the following function
//first it will show the films currently available whereby the user will be able to select from the list
//it will also show the movies poster and description together with the film-time
//the system will also be able to calculate the number of seats left after the user selects

//fisr we are going to creat a function that will enable the user to buy tickets
function purchaseTickect() {
    let ourticket = document.querySelector("#ticket-num");
    let ticketsbought = ourticket.textContent.split(" ")[0];
    if (ticketsbought > 0) {
        //if the user buys a ticket the remaining number of tickets will be culculated and printed on the main page
        ourticket.textContent = ticketsbought - 1 + " remaining tickets";
    }
    else if (ticketsbought = 0) {
        //if the tickets have all been bought up the output will be show that they are all sold out
        document.querySelector("#buy-ticket").innerText = "THEY ARE SOLD OUT";
        

    }
}
//the next function will enable the user to select the desired film
function selectFilm(movie) {
    //first the film poster and title will beshown to help the user in selection
    let filmposter = document.querySelector("img#poster")
    filmposter.src = movie.poster;
    filmposter.alt = movie.title;
    let description = document.querySelector("#showing");
   //the film description will also be shown tgether with the showtime and available tickets
    description.querySelector("#runtime").textContent = movie.runtime+" minutes";
    description.querySelector("#title").textContent = movie.title;
    description.querySelector("#showtime").textContent = movie.showtime;
    description.querySelector("#film-info").textContent = movie.description;
    description.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold + " remaining tickets";
}
//The next function will simply output the list of films available
function getMovielist(movie) {
    let movielist= document.createElement("li")
    movielist.id = "id" + movie.id;
    movielist.textContent = movie.title
    let unoderd = document.querySelector("#films");
    unoderd.appendChild(movielist);
    movielist.classList.add("film");
    movielist.classList.add('item');
    // we are going to add an event listner which when the user selects the desired film it will run the "selectfilm function"
    movielist.addEventListener("click", () => {selectFilm(movie)})
    //this will help to show the film:poster,decription,showtimeand available tickets
}


//the final function is the most crucial one as it involves the get request
function getAvailableFilms() {
    //we are going to use a GET request so as to get the film detais from our pakage.json
    fetch("http://localhost:3000/films")
    .then(Response => Response.json())
    .then(movies => {
        movies.forEach(movie => {getMovielist(movie)})
        let film1 = document.querySelectorAll("#id1");
        film1.dispatchEvent(new Event("click"));
    })
}
//we are finally goin to use an event listner which will perform the"getavailablefilms"function once the dom content has loaded
document.addEventListener("DOMContentLoaded", getAvailableFilms())
    document.querySelector("#buy-ticket").addEventListener("click", purchaseTickect);
// to finish up our system we will add an event listner that will use the"purchsetickect" function once the user clicks the buyticket button and show the number of available tickets
