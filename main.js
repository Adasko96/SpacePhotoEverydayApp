const year = new Date()
const month = new Date()
const day = new Date()

const api = 'dZf98hZUvQVdjFLhh6I99V3fjmeAhaDkBVLNEyOO'
const url = `https://api.nasa.gov/planetary/apod?api_key=${api}`

const photo = document.querySelector('.photo')
const titleOfPhoto = document.querySelector('.titleOfPhoto')
const explanation = document.querySelector('.explanation')
const dateSpan = document.querySelector('.date')
const previousPhotos = document.querySelectorAll('.previousPhoto')
const previousPhotoNewTab = document.querySelectorAll('.previousPhotoNewTab')
const downloadHD = document.querySelector('.downloadHD')
const downloadNormal = document.querySelector('.downloadNormal')

let request = new XMLHttpRequest()
request.open('GET', url)
request.send()
request.onload = () => {

    // pobieranie API
    const apodData = JSON.parse(request.response)
    const photoUrl = apodData.url
    const apodTitle = apodData.title
    const apodExplanation = apodData.explanation
    const apodDate = apodData.date

    // ustawianie danych z API na stronie
    photo.src = photoUrl
    titleOfPhoto.textContent = apodTitle
    explanation.textContent = apodExplanation
    dateSpan.textContent = apodDate
    downloadHD.href = apodData.hdurl
    downloadHD.download = apodData.hdurl
    downloadNormal.href = apodData.url
    downloadNormal.download = apodData.url
    
    // wyświetlanie poprzednich zdjęć
    let dayBefore = 1
    for (let index = 0; index < previousPhotos.length; index++) {
        const photo = previousPhotos[index]
        let previousUrl = `${url}&date=${year.getFullYear()}-${month.getMonth() + 1}-${(day.getDate()-dayBefore)}`
        let request = new XMLHttpRequest()
        request.open('GET', previousUrl)
        request.send()
        request.onload = () => {
            let apodData = JSON.parse(request.response)
            let previousPhotoUrl = apodData.url
            photo.src = previousPhotoUrl
        }
        dayBefore++
    }
}