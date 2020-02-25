import { films } from '../data/films.js'
import { people } from '../data/people.js'
import { starships } from '../data/starships.js'

const greetingDiv = document.querySelector('.greeting')

const castList = document.createElement("ul")

let counter = 1 

people.forEach(person => {
    let listItem = document.createElement("li")
    listItem.textContent = person.name
    castList.appendChild(listItem)

    let anchorWrap = document.createElement("a")
    anchorWrap.href = "#"

    let imageItem = document.createElement("img")
    imageItem.src = `https://starwars-visualguide.com/assets/img/characters/${counter}.jpg`
    // add some way to handle user clicks on the image
    imageItem.addEventListener("click", () => {
        console.log("It Worked")
    })
    anchorWrap.appendChild(imageItem)
    greetingDiv.appendChild(imageItem)
    counter++
})

greetingDiv.appendChild(castList)