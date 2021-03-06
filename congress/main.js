import { senators } from '../data/senators.js'
import { removeChildren } from '../scripts/utils.js'

const senatorDiv = document.querySelector('.senators')
const democratButton = document.querySelector('#democratButton')
const republicanButton = document.querySelector('#republicanButton')
const independentButton = document.querySelector('#independentButton')

democratButton.addEventListener('click', event => {
    populateSenatorDiv(getSimplifiedSenators(democrats))
})

republicanButton.addEventListener('click', event => {
    populateSenatorDiv(getSimplifiedSenators(republicans))
})

independentButton.addEventListener('click', event => {
    populateSenatorDiv(getSimplifiedSenators(independents))
})

function  getSimplifiedSenators(senatorArray) {
    return senatorArray.map(senator => {
    let middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}, ${senator.state}`,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
        seniority: parseInt(senator.seniority, 10)
    }
})
}

function populateSenatorDiv(simpleSenators) {
    console.log(simpleSenators)
    removeChildren(senatorDiv)
    simpleSenators.forEach(senator => {
        let senFigure = document.createElement('figure')
        let figImg = document.createElement ('img')
        let figCaption = document.createElement('figcaption')
        
        figImg.src = senator.imgURL
        figCaption.textContent = senator.name

        senFigure.appendChild(figImg)
        senFigure.appendChild(figCaption)
        senatorDiv.appendChild(senFigure)
    })
}

const filterSenators = (prop, value) => {
    return senators.filter(senator => {
        return senator[prop] === value
    })
}

const republicans = filterSenators('party', 'R')
const democrats = filterSenators('party', 'D')
const independents = filterSenators('party', 'ID')

const mostSeniority = getSimplifiedSenators(republicans).reduce(
    (acc, senator) => {
        return acc.seniority > senator.seniority ? acc : senator
    }
)