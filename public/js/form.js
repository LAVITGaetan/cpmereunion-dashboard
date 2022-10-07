// Init variables
let formArray = [
    {
        id: 1,
        label: 'Raison sociale de l\' entreprise',
        required: true,
        description: {
            set: false,
            content: ''
        },
        type: 'text',
        order: 1,
        form_id: ''
    }
]

let htmlContent = document.getElementById('js-content');
let counter = 1;

function addQuestion(input) {
    let id = formArray[formArray.length - 1].id + 1;
    let order = counter;
    switch (input) {
        case 'identite':
            label = 'Nom et prénom du dirigeant';
            type = 'identite';
            break;
        case 'raison-sociale':
            label = 'Raison sociale de l\' entreprise';
            type = 'raison-sociale';
            break;
        case 'email':
            label = 'Adresse e-mail';
            type = 'email';
            break;
        case 'telephone':
            label = 'Numéro de téléphone';
            type = 'telephone';
            break;
        case 'date':
            label = 'Choisir une date';
            type = 'date';
            break;
        case 'section':
            label = 'Section de l\' entreprise';
            type = 'section';
            break;
        case 'secteur':
            label = 'Secteur de l\' entreprise';
            type = 'secteur';
            break;
        case 'rgpd':
            label = 'Acceptez vous de communiquer ces informations à la CPME Réunion ?';
            type = 'rgpd';
            break;
        case 'choix':
            label = 'Choisissez une des reponses';
            type = 'radio';
            break;
        case 'salaries':
            label = 'Nombre de salariés de l\' entreprise';
            type = 'salaries';
            break;
        case 'notation':
            label = 'Notez sur une echelle de 1 à 10';
            type = 'notation';
            break;
        default:
            label = 'Votre question';
            type = 'text';
            break;
    }
    addItemToArray(label, type, order, id);
    addItemtoHtml(label, type, order, id);
    // updateQuestionCount();
    counter++;
}

function addItemToArray(label, type, order, id) {
    let item = {
        id: id,
        label: label,
        required: false,
        description: {
            set: false,
            content: ''
        },
        type: type,
        order: order + 1,
        form_id: ''
    }
    formArray.push(item);
}

function addItemtoHtml(label, type, order, id) {
    switch (type) {
        case 'identite':
            generateQuestion(label, type, order, id)
            break;
        case 'raison-sociale':
            generateQuestion(label, type, order, id)
            break;
        case 'email':
            generateQuestion(label, type, order, id)
            break;
        case 'telephone':
            generateQuestion(label, type, order, id)
            break;
        case 'section':
            generateQuestion(label, type, order, id)
            break;
        case 'secteur':
            generateQuestion(label, type, order, id)
            break;
        case 'rgpd':
            generateQuestion(label, type, order, id)
            break;
        case 'choix':
            generateQuestion(label, type, order, id)
            break;
        case 'salaries':
            generateQuestion(label, type, order, id)
            break;
        case 'notation':
            generateQuestion(label, type, order, id)
            break;
        default:
            generateQuestion(label, type, order, id)
            break;
    }
}

// Add question to DOM
function generateQuestion(label, type, order, id) {
    createContainer(id)
    createCounter(order, id)
    createLabel(label, id);
    createDescription(id);
    createInput(type, id);
    createRequired(id);
    createDelete(id);
    createDown(id);
    createUp(id);
}

// Create components

function createContainer(id) {
    // Define order
    let order = document.getElementsByClassName('question-counter').length + 1 || 0;
    // Create element
    let newElement = document.createElement("DIV");
    // Set attributes to element
    newElement.setAttribute("class", "editor-question");
    newElement.setAttribute("style", `order: ${order};`);
    newElement.setAttribute("id", `js-container${id}`);
    // Add element to DOM
    htmlContent.appendChild(newElement);
}

function createCounter(order, id) {
    let newElement = document.createElement("DIV");
    newElement.setAttribute("class", "question-counter");
    newElement.innerHTML = order + 1;
    document.getElementById(`js-container${id}`).appendChild(newElement);
}

function createLabel(label, id) {
    let newLabel = document.createElement("LABEL");
    newLabel.setAttribute("class", "question-label");
    newLabel.setAttribute("contenteditable", "true");
    document.getElementById(`js-container${id}`).appendChild(newLabel);
    newLabel.textContent = label;
}

function createDescription(id) {
    let newDescription = document.createElement("H4");
    newDescription.setAttribute("class", "question-sub");
    newDescription.setAttribute("contenteditable", "true");
    newDescription.setAttribute("onclick", `updateDescription(${id})`)
    document.getElementById(`js-container${id}`).appendChild(newDescription);
    newDescription.textContent = "Cliquez ici pour ajouter une description";
}

function createInput(type, id) {
    let container = document.getElementById(`js-container${id}`);
    switch (type) {
        case "date":
            let dateInput = document.createElement("INPUT");
            dateInput.setAttribute("type", "date");
            dateInput.setAttribute("class", "question-input");
            container.appendChild(dateInput);
            break;
        case "radio":
            for (let i = 0; i < 2; i++) {
                let radioContainer = document.createElement("DIV");
                radioContainer.setAttribute("class", "radio-container");
                let radioInput = document.createElement("INPUT");
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("class", "question-radio");
                let radioLabel = document.createElement("LABEL");
                radioLabel.setAttribute("class", "radio-label");
                radioLabel.setAttribute("contenteditable", "true");
                if (i == 0) {
                    radioLabel.innerHTML = 'Oui';
                    radioInput.setAttribute("checked", "true")
                }
                else {
                    radioLabel.innerHTML = 'Non'
                }
                container.appendChild(radioContainer);
                container.getElementsByClassName('radio-container')[i].appendChild(radioInput)
                container.getElementsByClassName('radio-container')[i].appendChild(radioLabel)
            }
            break;

        case "rgpd":
            for (let i = 0; i < 2; i++) {
                let radioContainer = document.createElement("DIV");
                radioContainer.setAttribute("class", "radio-container");
                let radioInput = document.createElement("INPUT");
                radioInput.setAttribute("type", "radio");
                radioInput.setAttribute("class", "question-radio");
                let radioLabel = document.createElement("LABEL");
                radioLabel.setAttribute("class", "radio-label");
                radioLabel.setAttribute("contenteditable", "true");
                if (i == 0) {
                    radioLabel.innerHTML = 'Oui, j\'accepte';
                    radioInput.setAttribute("checked", "true")
                }
                else {
                    radioLabel.innerHTML = 'Non'
                }
                container.appendChild(radioContainer);
                container.getElementsByClassName('radio-container')[i].appendChild(radioInput)
                container.getElementsByClassName('radio-container')[i].appendChild(radioLabel)
            }
            break;
        case "section":
            let sectionArray = ['artisanat', 'commerce', 'industrie', 'services']
            let selectSection = document.createElement("SELECT");
            selectSection.setAttribute("class", "question-select");
            container.appendChild(selectSection);
            for (let i = 0; i < sectionArray.length; i++) {
                let selectOption = document.createElement("OPTION");
                selectOption.setAttribute("class", "select-option");
                selectOption.setAttribute("value", sectionArray[i]);
                selectOption.innerHTML = sectionArray[i];
                container.getElementsByClassName('question-select')[0].appendChild(selectOption);
            }
            break;
        case "secteur":
            let secteurArray = ['les avirons', 'bras-panon', 'entre-deux', 'etang-sale', 'petite-ile', 'plaine des palmistes', 'le port', 'la possession', 'saint-andre', 'saint-benoit', 'saint-benoît', 'saint-denis', 'saint-joseph', 'saint-leu', 'saint-paul', 'saint-pierre', 'saint-philippe', 'sainte-marie', 'saint-rose', 'saint-suzanne', 'salazie', 'le tampon', 'les trois bassins', 'cilaos']
            let selectSecteur = document.createElement("SELECT");
            selectSecteur.setAttribute("class", "question-select");
            container.appendChild(selectSecteur);
            for (let i = 0; i < secteurArray.length; i++) {
                let selectOption = document.createElement("OPTION");
                selectOption.setAttribute("class", "select-option");
                selectOption.setAttribute("value", secteurArray[i]);
                selectOption.innerHTML = secteurArray[i];
                container.getElementsByClassName('question-select')[0].appendChild(selectOption)
            }
            break;
        case "salaries":
            let salariesArray = ['0 à 5', '6 à 10', '11 à 20', '21 à 50', 'plus de 51']
            let selectSalaries = document.createElement("SELECT");
            selectSalaries.setAttribute("class", "question-select");
            container.appendChild(selectSalaries);
            for (let i = 0; i < salariesArray.length; i++) {
                let selectOption = document.createElement("OPTION");
                selectOption.setAttribute("class", "select-option");
                selectOption.setAttribute("value", salariesArray[i]);
                selectOption.innerHTML = salariesArray[i] + ' salariés';
                container.getElementsByClassName('question-select')[0].appendChild(selectOption)
            }
            break;
        default:
            let defaultInput = document.createElement("INPUT");
            defaultInput.setAttribute("type", "text");
            defaultInput.setAttribute("class", "question-input");
            defaultInput.setAttribute("placeholder", "Réponse");
            container.appendChild(defaultInput);
            break;
    }
}

function createRequired(id) {
    let container = document.getElementById(`js-container${id}`);
    let newElement = document.createElement("DIV");
    let newCheckbox = document.createElement("DIV");
    let newClippath = document.createElement("DIV");
    let newText = document.createElement("DIV");
    newElement.setAttribute("class", "question-required");
    newElement.setAttribute("onclick", `setCheckboxStatus(${id})`)
    newCheckbox.setAttribute("class", "required-checkbox");
    newClippath.setAttribute("class", "required-clippath");
    newText.setAttribute("class", "required-label");
    newText.innerHTML = "Obligatoire";
    container.appendChild(newElement);
    container.getElementsByClassName('question-required')[0].appendChild(newCheckbox);
    container.getElementsByClassName('required-checkbox')[0].appendChild(newClippath);
    container.getElementsByClassName('question-required')[0].appendChild(newText);
}

function createDelete(id) {
    // Retrieve created container
    let container = document.getElementById(`js-container${id}`);
    // Create elements
    let newImg = document.createElement('IMG');
    let newdelete = document.createElement('DIV');
    // Set attributes to elements
    newdelete.setAttribute("class", "question-delete");
    newdelete.setAttribute("name", id);
    newdelete.setAttribute("id", `delete${id}`);
    newdelete.setAttribute("onclick", `destroyInput(${id})`);
    newImg.setAttribute("width", "32px");
    newImg.setAttribute("height", "32px");
    newImg.setAttribute("src", "img/chat.png");
    // Add elements to DOM
    container.appendChild(newdelete);
    container.getElementsByClassName('question-delete')[0].appendChild(newImg)
}

function createUp(id) {
    let container = document.getElementById(`js-container${id}`);
    let newUp = document.createElement('DIV');
    let newImg = document.createElement('IMG');
    newUp.setAttribute("class", "question-slide slide-up");
    newUp.setAttribute("id", `up${id}`);
    newUp.setAttribute("name", id);
    newUp.setAttribute("onclick", `slideUp(${id})`);
    container.appendChild(newUp);
    newImg.setAttribute("width", "20px");
    newImg.setAttribute("height", "20px");
    newImg.setAttribute("style", "transform:rotate(180deg)");
    newImg.setAttribute("src", "img/down-chevron.png");
    container.getElementsByClassName('slide-up')[0].appendChild(newImg)
}


function createDown(id) {
    let container = document.getElementById(`js-container${id}`);
    let newDown = document.createElement('DIV');
    let newImg = document.createElement('IMG');
    newDown.setAttribute("class", "question-slide slide-down");
    newDown.setAttribute("id", `up${id}`);
    newDown.setAttribute("name", id);
    newDown.setAttribute("onclick", `slideDown(${id})`);
    container.appendChild(newDown);
    newImg.setAttribute("width", "20px");
    newImg.setAttribute("height", "20px");
    newImg.setAttribute("src", "img/down-chevron.png");
    container.getElementsByClassName('slide-down')[0].appendChild(newImg)
}

// Question counter
function updateQuestionCount() {
    let questions = document.getElementsByClassName('editor-question');
    for (let i = 0; i < questions.length; i++) {
        let counter = questions[i].getElementsByClassName('question-counter')[0];
        counter.innerHTML = i + 1;
    }
}

// Question counter
function updateQuestionOrder() {
    let questions = document.getElementsByClassName('editor-question');
    for (let i = 0; i < questions.length; i++) {
        questions[i].style.order = i + 1;
    }
}

// Delete input
function destroyInput(id) {
    if (window.confirm('Supprimer cette question ?')) {
        // Get item from array
        let item = formArray.find(el => el.id === id)
        // Adjust other question order if required
        formArray.filter(el => el.order > item.order).map(el => el.order -= 1)
        // Delete item from array
        var index = formArray.map(el => {
            return el.id;
        }).indexOf(id);
        formArray.splice(index, 1);
        // Remove item from DOM
        let question = document.getElementById(`js-container${id}`);
        htmlContent.removeChild(question);
        counter--;
        // Update DOM
        updateQuestionCount();
        updateQuestionOrder();
    }
}

// Delete existingInput
function destroyExistingInput(id) {
    if (window.confirm('Supprimer cette question de manière définitive?')) {
        try {
            fetch(`https://cpme-rest-api.herokuapp.com/api/questions/${id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': getCookie('token')
                }
            })
                .then(response => response.json())
                .then((response) => {
                    console.log(response);
                    let item = formArray.find(el => el._id === id)
                    let question_id = item.order;
                    formArray.filter(el => el.order > item.order).map(el => el.order -= 1)
                    var index = formArray.map(el => {
                        return el.id;
                    }).indexOf(id);
                    formArray.splice(index, 1);
                    let question = document.getElementById(`js-container${question_id}`);
                    htmlContent.removeChild(question);
                    counter--;
                    updateQuestionCount();
                    updateQuestionOrder();
                })
        } catch (error) {
            console.log(error.message);
        }
 
    }
}

function slideUp(id) {
    let item = formArray.find(el => el.id === id);
    if (item.order > 1) {
        let previousItem = formArray.find(el => el.order === item.order - 1)
        let newOrder = previousItem.order;
        let domItem = document.getElementById(`js-container${id}`);
        let domPreviousItem = document.getElementById(`js-container${previousItem.id}`);
        domItem.style.order = newOrder;
        domPreviousItem.style.order = item.order;
        domItem.getElementsByClassName('question-counter')[0].innerHTML = newOrder;
        domPreviousItem.getElementsByClassName('question-counter')[0].innerHTML = item.order;
        document.getElementById(`js-container${id}`)

        //Array logic
        previousItem.order = item.order;
        item.order = newOrder;
    }
}

function slideDown(id) {
    let item = formArray.find(el => el.id === id);
    let formArrayOrders = formArray.map(object => {
        return object.id;
    });
    let max = Math.max(...formArrayOrders);
    if (item.order < max) {
        let previousItem = formArray.find(el => el.order === item.order + 1);
        let newOrder = previousItem.order;
        let domItem = document.getElementById(`js-container${id}`);
        let domPreviousItem = document.getElementById(`js-container${previousItem.id}`);
        domItem.style.order = newOrder;
        domPreviousItem.style.order = item.order;
        domItem.getElementsByClassName('question-counter')[0].innerHTML = newOrder;
        domPreviousItem.getElementsByClassName('question-counter')[0].innerHTML = item.order;
        document.getElementById(`js-container${id}`);
        //Array logic
        previousItem.order = item.order;
        item.order = newOrder;
    }
}

// Change description
function updateDescription(id) {
    let container = document.getElementById(`js-container${id}`);
    container.getElementsByClassName('question-sub')[0].innerHTML = '';
    console.log(container.getElementsByClassName('question-sub')[0].innerHTML);
}

// Set required
function setCheckboxStatus(id) {
    let container = document.getElementById(`js-container${id}`);
    let checkbox = container.getElementsByClassName('required-checkbox')[0];
    if (checkbox.classList.contains('required-selected')) {
        checkbox.classList.remove('required-selected')
        formArray.find(el => el.id === id).required = false;
    }
    else {
        checkbox.classList.add('required-selected');
        formArray.find(el => el.id === id).required = true;
    }
}

// Question
document.getElementById('js-question').addEventListener('click', () => {
    addQuestion();
})

// Identite
document.getElementById('js-identite').addEventListener('click', () => {
    addQuestion('identite');
})

// Raison sociale
document.getElementById('js-raison-sociale').addEventListener('click', () => {
    addQuestion('raison-sociale');
})

// E-mail
document.getElementById('js-email').addEventListener('click', () => {
    addQuestion('email');
})

// Téléphone
document.getElementById('js-telephone').addEventListener('click', () => {
    addQuestion('telephone');
})

// Date
document.getElementById('js-date').addEventListener('click', () => {
    addQuestion('date');
})

// Section
document.getElementById('js-section').addEventListener('click', () => {
    addQuestion('section');
})

// Secteur
document.getElementById('js-secteur').addEventListener('click', () => {
    addQuestion('secteur');
})

// Rgpd
document.getElementById('js-rgpd').addEventListener('click', () => {
    addQuestion('rgpd');
})

// Choix
document.getElementById('js-choix').addEventListener('click', () => {
    addQuestion('choix');
})

// Salaries
document.getElementById('js-salaries').addEventListener('click', () => {
    addQuestion('salaries');
})

// Notation
document.getElementById('js-notation').addEventListener('click', () => {
    addQuestion('notation');
})

function fillArray(form_id) {
    let questions = document.getElementsByClassName('editor-question');
    formArray = [];
    for (let i = 0; i < questions.length; i++) {
        let label = questions[i].getAttribute('data-label');
        let required = questions[i].getAttribute('data-required');
        let set = questions[i].getAttribute('data-description');
        let content = questions[i].getAttribute('data-content');
        let type = questions[i].getAttribute('data-type');
        let id = questions[i].getAttribute('data-id');
        formArray.push({
            id: i +1,
            _id: id,
            label: label,
            required: required,
            description: {
                set: set,
                content: content
            },
            type: type,
            order: i + 1,
            form_id: form_id,
            old: 'old'
        })

    }
}        