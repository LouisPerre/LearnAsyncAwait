const popularMovieContainer = document.getElementById('popularMovie')
const apiKey = '?api_key=4763b17c5c213b432358e3afa2b2c531'
const baseUrl = 'https://api.themoviedb.org/3/'
const getImgTBDB = 'https://image.tmdb.org/t/p/w300'
let options = {year: 'numeric', month: 'long', day: 'numeric'}
const baseLanguage = 'en-US'
let popularPage = 1
let loader = true
const moviesInDom = []

function loadPopularMovie(url, page) {
    return new Promise((resolve, reject) => {
        fetch(baseUrl + 'movie/popular' + apiKey + '&language=' + baseLanguage + '&page=' + page)
        .then(response => response.json())
        .then(movies => {
            resolve(movies)
        })
        .catch(err => {
            reject(err)
        })
    })
    
}

function addToDom(moviesList) {
    moviesList.results.forEach(movie => {
        popularMovieContainer.innerHTML += `
                        <div class="card" data-id="${movie.id}" data-genre="${movie.genre_ids}" data-type="TMDB">
                            <img src="${getImgTBDB+movie.poster_path}" alt="Poster alternative text">
                            <div class="info">
                                <h4 class="h4info">${movie.title}</h4>
                                <span>Release date : ${new Date(movie.release_date).toLocaleDateString('en', options)}</span>
                            </div>
                        </div>
                    `
        moviesInDom.push(movie)
    });
}


async function loaderMovieInitial() {
    try {
        const response = await loadPopularMovie(baseUrl, popularPage)
        addToDom(response)
        checkScroll()
    } catch(err) {
        console.error(err)
    }
}

loaderMovieInitial()


function checkScroll() {
    window.onscroll = function(e) {
        if((document.documentElement.scrollTop || document.body.scrollTop) / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight) * 100 >= 50) {
            if (loader) {
                loaderMovie()
            } else {
                return
            }
            
        }
    }
    
}


async function loaderMovie() {
    try {
        loader = false
        popularPage += 1
        const response = await loadPopularMovie(baseUrl, popularPage)
        console.log(response)
        addToDom(response)
        console.log(moviesInDom)
        setTimeout(() => {
            loader = true
            checkScroll()
        }, 1000)
    } catch(err) {
        console.error(err)
    }
}