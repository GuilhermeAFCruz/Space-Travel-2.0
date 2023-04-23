const body = document.body
const navButtons = document.querySelectorAll('[data-controls]')
transitionContent()

function transitionContent() {
    let openedTab = localStorage.getItem('openedTab')
    setTimeout (() =>{
        if(openedTab == 'technology') {
            hideContent(body,'section:not([hidden])')
            setTimeout(()=> {
                showContent(body,[`#${openedTab}`])
                changeActive(navigation,'[aria-selected="true"]', navButtons[2].parentNode) 
            },370)
            setBackground(openedTab)
        }
        else if  (openedTab == 'crew' || openedTab == 'technology') {
            hideContent(body,'section:not([hidden])')
            setTimeout(()=> {
                showContent(body,[`#${openedTab}`])
                changeActive(navigation,'[aria-selected="true"]', navButtons[1].parentNode) 
            },370)
            setBackground(openedTab)

        } else {
            return
        }
    }, 200)
}
// Tabs
setTabs()
function setTabs() {
    let visibleSection = document.querySelector('section:not([hidden])')
    const tabList = visibleSection.querySelector('[role="tablist"]')
    const tabs = tabList.querySelectorAll('[role="tab"]')
    
    tabList.addEventListener('keydown', changeTabFocus)
    tabs.forEach( tab => {
        tab.addEventListener('click', changeTabPanel)
    })
}


let tabFocus = 0
function changeTabFocus(e) {
    const leftArrowCode = 37
    const rightArrowCode = 39
    const arrow = e.keyCode

    // change the tab index of current tab to 0
    if (arrow === leftArrowCode || arrow === rightArrowCode) {
        tabs[tabFocus].setAttribute('tabindex', -1)
        
        // move to next tab if right arrow is pressed
        if (arrow === rightArrowCode) {
            tabFocus++ 
            if (tabFocus >= tabs.length) {
                tabFocus = 0
            }  
        }
        
        // move to the left if left key is pressed
        if (arrow === leftArrowCode) {
            tabFocus--
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1
            }  
        }
    }

    tabs[tabFocus].setAttribute('tabindex', 0)
    tabs[tabFocus].focus()
}

function changeTabPanel(e) {
    const targetTab = e.target
    const targetPanel = targetTab.getAttribute('aria-controls')
    const targetImage = targetTab.getAttribute('data-image')
    const tabContainer = targetTab.parentNode
    const mainContainer = tabContainer.parentNode
    const currentPanel = mainContainer.querySelector('[role="tabpanel"]:not([hidden])').getAttribute('id')
    const currentImage = mainContainer.querySelector('picture:not([hidden])').getAttribute('id')

    if (targetPanel == currentPanel || targetImage == currentImage) {
        return
    } else {
        // selects the active tab and hide it
        hideContent(mainContainer, '[role="tabpanel"]:not([hidden])')
        
        // selects and hide the active img
        hideContent(mainContainer, 'picture:not([hidden])')
    
        setTimeout(() => {
            // show the target tab
            showContent(mainContainer, [`#${targetPanel}`])
            
            // show the target image
            showContent(mainContainer, [`#${targetImage}`])

        }, 250)
        
        
        // change the active state on the indicators
        changeActive(tabContainer, '[aria-selected="true"]', targetTab)
        
    }
}

function hideContent(parent, content) {
    let object = parent.querySelector(content)
    object.setAttribute('closing', '')
    object.addEventListener('animationend', () => {
        object.removeAttribute('closing')
        object.setAttribute('hidden', true)
    }, {once:true})
}

function showContent(parent, content) {
    let object = parent.querySelector(content)
    object.removeAttribute('hidden')
    object.setAttribute('visible', '')
    object.addEventListener('animationend', () => {
        object.removeAttribute('visible')
    }, {once:true})
}

function changeActive (currentEl, content, newEl) {
    currentEl.querySelector(content).setAttribute('aria-selected', false)
    newEl.setAttribute('aria-selected', true)
}

// Navigation Content Switches



navButtons.forEach((button,) => {
    button.addEventListener('click', () => {
        const targetContent = button.getAttribute('data-controls') 
        let currentSection = document.querySelector('section:not([hidden])').id
        
        if (targetContent == currentSection) {
            return
        } else {
            //change the active tab on the navigation bar
            changeActive(navigation, '[aria-selected="true"]', button.parentNode)
            hideContent(body, 'section:not([hidden])')
            setTimeout(() => {
                showContent(body, [`#${targetContent}`])
            }, 380)
            //change the background 
            setBackground(targetContent)
            setTimeout(() => {
                setTabs()
            }, 400)
        }
    })
})

function setBackground(content) {
    body.setAttribute('closingBg','')
            body.addEventListener('animationend', () => {
                body.removeAttribute('closingBg')
                body.setAttribute('visibleBg','')
                setTimeout(() => {
                    body.removeAttribute('visibleBg')
                }, 400)
                body.setAttribute('data-tab', content)
            }, {once:true})

        }
