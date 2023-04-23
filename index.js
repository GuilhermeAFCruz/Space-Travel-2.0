// Nav Toggle
const navToggle = document.querySelector('[data-nav-toggle]')
const navigation = document.querySelector('[data-navigation]')

navToggle.addEventListener('click', () => {
    let navState = navToggle.getAttribute('aria-expanded')
    if (navState == 'false') {
        navToggle.setAttribute('aria-expanded', 'true')
        navigation.setAttribute('data-visible', 'true')
    } else {
        navToggle.setAttribute('aria-expanded', 'false')
        navigation.setAttribute('data-visible', 'false')
    }
})

// Page change to correct content
const navLinks = document.querySelectorAll('[data-link]')
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        let linkedTab = link .getAttribute('data-link')
        localStorage.setItem('openedTab', linkedTab)
    })
})

const largeButton = document.querySelector('[data-large-button]')

largeButton.addEventListener('click', () => {
    localStorage.setItem('openedTab', 'destination')
})