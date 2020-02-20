import { films } from '../data/films.js'

console.log('Hi There! Welcome to my page!')

//console.log(document.querySelector('.greeting'))

const greetingDiv = document.querySelector('.greeting')

greetingDiv.textContent = 'I just inserted text into a DOM element using my mad JavaScript skills!'

console.log(greetingDiv.textContent)

console.log(films)

greetingDiv.textContent = films[0].opening_crawl