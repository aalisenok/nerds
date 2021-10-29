const URL_QUOTE = 'https://api.quotable.io/random'
const URL_WORLDTIMEIP = 'http://worldtimeapi.org/api/ip'
const URL_FREEGEOIP = 'https://freegeoip.app/json'

const quote = document.querySelector('.quote__text')
const author = document.querySelector('.quote__author')
const refresh = document.querySelector('.refresh img')
const background = document.querySelector('.background')
const icon = document.querySelector('.widget__icon')
const format = document.querySelector('.widget__format')
const details = document.querySelector('.details')
const btn = document.querySelector('.btn')
const text = document.querySelector('.widget__text')

const getQuote = async () => {
    try {
        const response = await fetch(`${URL_QUOTE}`)
        const quotes = await response.json()
        if (quotes.content === null && quotes.author === null) {
            quote.textContent = 'Unknown quote'
            author.textContent = 'Unknown author'
        } else {
            quote.textContent = quotes.content
            author.textContent = quotes.author
        }
    } catch (e) {
        console.error(e)
    }
    rotate();
}
getQuote()
let angle = 0;

function rotate() {
    refresh.style.transform = 'rotate(' + angle + 'deg)'
    angle += 180
}

refresh.addEventListener('click', getQuote)

const getTime = () => {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let greet = '';

    if (minutes < 10) {
        minutes = "0" + minutes
    }
    if (hours >= 5 && hours <= 11) {
        greet = 'morning'
    } else if (hours >= 12 && hours <= 17) {
        greet = 'afternoon'
    } else greet = 'evening'

    if (hours >= 5 && hours <= 8) {
        background.classList.add('day');
        icon.src = './assets/img/icon-sun.svg';
        icon.setAttribute("alt", "Sun icon");
    } else {
        background.classList.add('night');
        icon.src = './assets/img/icon-moon.svg';
        icon.setAttribute("alt", "Moon icon");
        details.style.color = '#fff';
        details.style.background = 'rgba(0, 0, 0, 0.75)';
    }

    document.querySelector('.widget__title span').textContent = `good ${greet}`
    document.querySelector('.widget__currentTime').textContent = `${hours}:${minutes}`
    setTimeout(getTime, 1000)
}
getTime()
const getTimeZone = async () => {
    try {
        const response = await fetch(`${URL_WORLDTIMEIP}`)
        const region = await response.json()
        document.querySelector('.details__timezone').textContent = region.timezone
        document.querySelector('.details__day-year').textContent = region.day_of_year
        document.querySelector('.details__day-week').textContent = region.day_of_week
        document.querySelector('.details__week-number').textContent = region.week_number
        document.querySelector('.widget__utc').textContent = region.abbreviation
    } catch (e) {
        console.error(e)
    }
}
getTimeZone()
const getIP = async () => {
    try {
        const response = await fetch(`${URL_FREEGEOIP}`)
        const location = await response.json()
        const code = location.country_code
        const city = location.region_name
        document.querySelector('.widget__location').textContent = `in ${city}, ${code}`
    } catch (e) {
        console.error(e)
    }
}
getIP()

function showDetails() {
    document.querySelector('.main').classList.toggle('showDetails');
    details.classList.toggle('showDetails');

    if (text.textContent === "More") {
        text.textContent = "Less"
    } else {
        text.textContent = "More"
    }

    const arrow = document.querySelector('.widget__arrow');
    arrow.classList.toggle('rotate');
}

btn.addEventListener('click', showDetails);