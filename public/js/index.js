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
document.getElementsByClassName('alert-done')[0].addEventListener('click', () => {
    closeAlert();
})

//search filter
function changeFilter(id) {
    document.getElementsByClassName('filter-selected')[0].classList.remove('filter-selected');
    document.getElementsByClassName('filter-item')[id].classList.add('filter-selected');
    searchAdherent();
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
                result_count ++;
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