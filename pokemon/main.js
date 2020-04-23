

//note line
async function getAPIData(url) {
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

//note line
function loadPage() {
getAPIData('https://pokeapi.co/api/v2/pokemon/?&limit=25').then(async (data) => {
  for (const pokemon of data.results) {
    await getAPIData(pokemon.url).then((pokeData) => {
      populatePokeCard(pokeData)
    })
  }
})
}

let pokemonGrid = document.querySelector('.pokemonGrid')
let startButton = document.querySelector('#startButton')
let newButton = document.querySelector('#newButton')

startButton.addEventListener('click', () => {
  loadPage()
})

newButton.addEventListener('click', () => {
  addPokemon()
})

function populatePokeCard(singlePokemon) {
  let pokeScene = document.createElement('div')
  pokeScene.className = 'scene'
  let pokeCard = document.createElement('div')
  pokeCard.className = 'card'
  pokeCard.addEventListener('click', () =>
    pokeCard.classList.toggle('is-flipped'),
  )
  let pokeFront = populateCardFront(singlePokemon)
  let pokeBack = populateCardBack(singlePokemon)

  pokeCard.appendChild(pokeFront)
  pokeCard.appendChild(pokeBack)
  pokeScene.appendChild(pokeCard)
  pokemonGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  let cardFront = document.createElement('div')
  cardFront.className = 'card__face card__face--front'
  let frontImage = document.createElement('img')
  frontImage.src = `../images/${getImageFileName(pokemon)}.png`

  let frontLabel = document.createElement ('p')
  frontLabel.textContent = `${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(1)}`
  cardFront.appendChild(frontImage)
  cardFront.appendChild(frontLabel)
  return cardFront
}

function getImageFileName(pokemon) {
  if (pokemon.id < 10) {
    return `00${pokemon.id}`
  } else if (pokemon.id > 9 && pokemon.id < 100) {
    return `0${pokemon.id}`
  } else if (pokemon.id > 809) {
    return `pokemon-icon`
  }
}

function populateCardBack(pokemon) {
  let cardBack = document.createElement('div')
  cardBack.className = 'card__face card__face--back'
  
  let heightBack = document.createElement ('h2')
  heightBack.textContent = `Height: ${pokemon.height}`

  let weightBack = document.createElement ('h2')
  weightBack.textContent = `Weight: ${pokemon.weight}`
  
  let typesBack = document.createElement ('h2')
  typesBack.textContent = 'Type:'
  let typesList = document.createElement('ul')
  pokemon.types.forEach(type => {
    let typeName = document.createElement('li')
    typeName.textContent = type.type.name
    typesList.appendChild(typeName)
  })
  
  let abilityBack = document.createElement ('h2')
  abilityBack.textContent = 'Abilities:'
  let abilityList = document.createElement('ul')
  pokemon.abilities.forEach(ability => {
    let abilityName = document.createElement('li')
    abilityName.textContent = ability.ability.name
    abilityList.appendChild(abilityName)
  })

  cardBack.appendChild(heightBack)
  cardBack.appendChild(weightBack)
  cardBack.appendChild(typesBack)
  cardBack.appendChild(typesList)
  cardBack.appendChild(abilityBack)
  cardBack.appendChild(abilityList)
  return cardBack
}

class Pokemon {
  constructor(height, weight, types, name, abilities) {
    this.height = height;
    this.weight = weight;
    this.types = types;
    this.name = name;
    this.abilities = abilities;
    this.id = 1000
  }
}

function addPokemon() {
  let wolverine = new Pokemon(19, 41,
  [
    {
      type: {
        name: 'Awesome'
      }
    },
    {
      type: {
        name: 'Learner'
      }
    },
    {
      type: {
        name: 'Superior in UT Valley'
      }
    }
  ], 'wolverine',
  [
    {
      ability: {
        name: 'Include'
      }
    },
    {
      ability: {
        name: 'Engage'
      }
    },
    {
      ability: {
        name: 'Achieve'
      }
    }
  ])
  populatePokeCard(wolverine)
}