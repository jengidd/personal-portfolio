function getPokeData(url) {
    let pokemonGrid = document.querySelector('.pokemonGrid')
    fetch(url).then(function (response) {
        let pokeData = response.json().then(function (data) {
            console.log(data)
            pokemonGrid.textContent = data.name
        })
        
    })
}

getPokeData('https://pokeapi.co/api/v2/pokemon/1/')

var card = document.querySelector('.card');
card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped');
});