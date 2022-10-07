// SUCCESS MESSAGE
function showModalSucces(message, redirection) {

    // Get and store DOM elements
    let modal = document.getElementById('modal');
    let text = document.getElementById('modal-text');
    let submit = document.getElementById('modal-redirection')

    // Assign attributes to modal tags
    submit.setAttribute('href', redirection);
    text.innerHTML = message;

    // Display modal
    modal.style.display = 'grid';
}

// POST REQUESTS
function postForm(event) {

    //Prevent form submit
    event.preventDefault();

    // Get attributes value from clicked element
    let form = document.getElementById('add-form')
    let ressource = form.getAttribute('data-ressource')
    let message = form.getAttribute('data-message')
    let redirection = form.getAttribute('data-redirection')
    
    // Assign form data to variable
    let data = new FormData(form)

    try {
        fetch(`https://cpme-rest-api.herokuapp.com/api/${ressource}`, {
            method: 'POST',
            headers: {
                'auth-token': getCookie('token')
            },
            body: data
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                showModalSucces(message, redirection)
            })
    } catch (error) {
        console.log(error.message);
    }
}

// PATCH REQUESTS
function patchForm(event) {
    event.preventDefault();
    let form = document.getElementById('add-form')
    let message = form.getAttribute('data-message')
    let redirection = form.getAttribute('data-redirection')
    let ressource = form.getAttribute('data-ressource')
    let data = new FormData(form)
    try {
        fetch(`https://cpme-rest-api.herokuapp.com/api/${ressource}`, {
            method: 'PATCH',
            headers: {
                'auth-token': getCookie('token')
            },
            body: data
        })
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                showModalSucces(message, redirection)
            })
    } catch (error) {
        console.log(error.message);
    }
}

// DELETE REQUESTS
function deleteRessource(element) {

    // Get attributes value from clicked element
    let ressource = element.getAttribute('data-ressource');
    let message = element.getAttribute('data-message');
    let redirection = element.getAttribute('data-redirection');

    if(confirm('Confirmez-vous la suppression ?')) {
        try {
            fetch(`https://cpme-rest-api.herokuapp.com/api/${ressource}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': getCookie('token')
                }
            })
                .then(response => response.json())
                .then((response) => {
                    showModalSucces(message, redirection)
                })
        } catch (error) {
            console.log(error.message);
        }
    }
}
