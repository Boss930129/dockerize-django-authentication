'use strict'

/////////////////////////////////////
// DOMContentLoaded event listener //
/////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // Append all HTML content to the base container
    appendContent();

    // Decide which page to show
    if (browserState.currentPage === '') {
        // default page
        showPage();
    } else {
        // match page to browserState
        showPage(`${browserState.currentPage}_nav`)
    }

    // On browser refresh button click, update browser state
    window.onbeforeunload = () => {
        browserState.currentPage
    }

    // On browser back button click
    window.onpopstate = e => {
        showPage(`${e.state.page}_nav`, 'pop');
    }

    // Create navigation buttons event listeners
    document.querySelectorAll('.nav_button').forEach(button => {
        button.onclick = () => {
            navEvent(button.id);
        }
    });

    // Create login form event listener
    document.querySelector('#login_form').onsubmit = e => {
        e.preventDefault();
        loginEvent(e);
    }

    // Create registration form event listener
    document.querySelector('#register_form').onsubmit = e => {
        e.preventDefault();
        registerEvent(e);
    }

    // Create button highlight event listeners
    document.querySelectorAll('.button').forEach(button => {
        button.onmouseenter = e => {
            // hover color button if not active
            const page = browserState.currentPage
            if (e.target.id !== `${page}_nav`) {
                document.querySelector(`#${e.target.id}`).style.background = color.hover;
            }
        }
        button.onmouseleave = e => {
            // reset button to original color if not active
            const page = browserState.currentPage
            if (e.target.id !== `${page}_nav` && e.target.className !== 'button submit') {
                document.querySelector(`#${e.target.id}`).style.background = color.inactive;
            } else if (e.target.className === 'button submit') {
                document.querySelectorAll('.submit').forEach(button => {
                    button.style.background = color.submit;
                })
            }
        }
    })
});
