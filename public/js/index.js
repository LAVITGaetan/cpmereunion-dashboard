//adherent password generator
function generateCode() {
    let field = document.getElementById('identifiant');
    let result = ''
    var characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    field.value = result;
}

//alert
function closeAlert() {
    let alert = document.getElementsByClassName('alert-info')[0];
    alert.style.display = "none";
}
if (document.getElementsByClassName('alert-done')[0]) {
    document.getElementsByClassName('alert-done')[0].addEventListener('click', () => {
        closeAlert();
    })
}

//search filter
function changeFilter(id) {
    document.getElementsByClassName('filter-selected')[0].classList.remove('filter-selected');
    document.getElementsByClassName('filter-item')[id].classList.add('filter-selected');
    searchAdherent();
    searchMandat();
}

//search input
function searchAdherent() {
    let result_count = 0;
    let query = document.getElementById('search').value.toLowerCase();
    let item = document.getElementsByClassName('adherent');
    let length = item.length;
    let filter = document.getElementsByClassName('filter-selected')[0].innerHTML.toLowerCase();
    for (let i = 0; i < length; i++) {
        let entreprise = item[i].getElementsByClassName('js-entreprise')[0].innerHTML.toLowerCase();
        let section = item[i].getElementsByClassName('js-section')[0].innerHTML.toLowerCase();
        if (filter === "tous" || filter === section.replace(/\s/g, '')) {
            if (entreprise.includes(query)) {
                item[i].style.display = 'table-row';
                console.log('item matched');
                result_count++;
            }
            else {
                item[i].style.display = 'none';
                console.log('item hidden by query');
            }
        } else {
            item[i].style.display = 'none';
            console.log('item hidden by section');
        }
    }
    document.getElementById('js-result').innerHTML = result_count
}

//search input
function searchMandat() {
    let result_count = 0;
    let query = document.getElementById('search').value.toLowerCase();
    let item = document.getElementsByClassName('mandat');
    let length = item.length;
    let filter = document.getElementsByClassName('filter-selected')[0].innerHTML.toLowerCase();
    for (let i = 0; i < length; i++) {
        let label = item[i].getElementsByClassName('js-label')[0].innerHTML.toLowerCase();
        let categorie = item[i].getElementsByClassName('js-categorie')[0].innerHTML.toLowerCase();
        if (filter === "tous" || filter === categorie.replace(/\s/g, '')) {
            if (label.includes(query)) {
                item[i].style.display = 'table-row';
                console.log('item matched');
                result_count++;
            }
            else {
                item[i].style.display = 'none';
                console.log('item hidden by query');
            }
        } else {
            item[i].style.display = 'none';
            console.log('item hidden by categorie');
        }
    }
    document.getElementById('js-result').innerHTML = result_count
}

function searchMandataire() {
    let result_count = 0;
    let query = document.getElementById('search').value.toLowerCase();
    let item = document.getElementsByClassName('mandataire');
    let length = item.length;
    for (let i = 0; i < length; i++) {
        let identite = item[i].getElementsByClassName('js-identite')[0].innerHTML.toLowerCase();
        if (identite.includes(query)) {
            item[i].style.display = 'table-row';
            result_count++;
        }
        else {
            item[i].style.display = 'none';
        }

    }
    document.getElementById('js-result').innerHTML = result_count
}

function showNavbar() {
    let content = document.getElementsByClassName('navbar-content')[0]
    content.style.display = 'flex';
}

function closeNavbar() {
    let content = document.getElementsByClassName('navbar-content')[0]
    content.style.display = 'none';
}

function showModalRepresentation(id, titre, ressource, id_mandat, id_mandataire) {
    let modal = document.getElementById('modal-representation');
    let form = document.getElementById('form-representation')
    let input = document.getElementById('titre')
    let text = document.getElementById('identite');
    input.value = titre;
    text.innerHTML = 'Modification du titre'
    let hidden_id = document.getElementById('hidden_id');
    let hidden_id_mandat = document.getElementById('hidden_id_mandat');
    let hidden_id_mandataire = document.getElementById('hidden_id_mandataire');
    hidden_id.value = id;
    hidden_id_mandat.value = id_mandat;
    hidden_id_mandataire.value = id_mandataire;
    if (ressource === 'mandats') {
        form.setAttribute('action', `/representations/edit/${id}/mandats`)
    }
    else {
        form.setAttribute('action', `/representations/edit/${id}/mandataires`)
    }
    modal.style.display = 'block';
}

function showResponses(id) {
    let item = document.getElementById(id)
    if (item.classList.contains('active')) {
        item.classList.remove('active')
    }
    else {
        item.classList.add('active')
    }
}

function copySondageUrl(id) {
    alert(`https://cpmereunion-dashboard.herokuapp.com/public/sondages`)
}