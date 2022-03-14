const URL = 'https://api.quran.com/api/v4/chapters'
const fetcedhData = []
let surahLink
let chapterInfo
const selectOption = document.querySelector('#selectChapter')
let arabicName = document.querySelector('.arabic-name')
let simpleName = document.querySelector('.simple-name')
let revelationPlace = document.querySelector('.revelation-place')
let revelationPlacePic = document.querySelector('[data-revelation-place-pic]')
let verses = document.querySelector('.verses')
const readSurah = document.querySelector('.read-surah')

// add EventListener on selecting new option
selectOption.addEventListener('change', () => {

    let value = selectOption[selectOption.selectedIndex].value
    printInfo(value)
})

// Fetch chapter list
fetch(URL)
    .then(res => res.json())
    .then(data => {
        Object.values(data).forEach(chapters => {

            for(let i = 0; i <= chapters.length; i++) {

                let opt = document.createElement('option')
                opt.value = i
                let plusValue = i + 1
                opt.innerHTML = `Chapter ${plusValue}: ${chapters[i].name_simple}`
                selectOption.appendChild(opt)
                fetcedhData.push(chapters[i])

                if(selectOption.value == 0) {
                    printInfo(0)
                }
            }
        })
    })
    .catch((err) => {
        console.error('Error:', err)
    })

function printInfo(value) {
    
    let data = fetcedhData[value]
    // console.log(data)

    // Print image
    if(data.revelation_place == 'makkah') {
        revelationPlacePic.src = 'assets/img/makkah.png'
    }else {
        revelationPlacePic.src = 'assets/img/madinah.png'
    }

    // Print details
    arabicName.innerHTML = `${data.name_arabic}`
    simpleName.innerHTML = `${data.name_simple} | ${data.translated_name.name}`
    revelationPlace.innerHTML = `Revelation Place: ${data.revelation_place}`
    verses.innerHTML = `Verses: ${data.verses_count}`

    surahLink = `https://quran.com/${data.id}`
}

readSurah.addEventListener('click', () => {
    window.open(surahLink, '_blank')
})