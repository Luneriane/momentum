const monTitre = document.getElementById('Heure');
const monIcone = document.getElementById('icone');
const maTemperature = document.getElementById('temperature');
const monLieu = document.getElementById('lieu');
const monNom = document.getElementById('nom');
const monInput = document.getElementById('inputToDo');
const mesToDo = document.getElementById('maToDoList');
const monContenu = document.getElementById('contenu');

let nomStorage = localStorage.getItem('monNom');

let maDate = new Date;
let monHeure = `${maDate.getHours()} : ${maDate.getMinutes()}`;
let currentBG = maDate.getHours();

function correctifMinutes() {
    if (maDate.getMinutes() < 10){
        monHeure = `${maDate.getHours()} : 0${maDate.getMinutes()}`;
    }else {
        monHeure = `${maDate.getHours()} : ${maDate.getMinutes()}`
    }
}

//récupération de l'api météo
fetch(`https://api.apixu.com/v1/current.json?key=25aff8fbdd17436eb17103421192305&q=Paris&lang=fr`)
.then(response => response.json())
.then(data => {
    console.log(data);
    maTemperature.textContent = data.current.temp_c + "°C";
    monLieu.textContent = data.location.name;
    monIcone.setAttribute('src', data.current.condition.icon);
})

// au chargement de la page
window.onload = () => { 
    monNom.value = nomStorage;
    monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;
    correctifMinutes();
    monTitre.innerHTML = monHeure;
} 

// local storage du nom
monNom.addEventListener('change', () => {
    localStorage.setItem('monNom', monNom.value);
    nomStorage = localStorage.getItem('monNom');
    monNom.value = nomStorage;
    console.log(nomStorage);
})
//Fonction temps réel
setInterval(() => {
    maDate = new Date;
    correctifMinutes();

    // Affichage de l'heure
    monTitre.innerHTML = monHeure;

    //Image en fonction de l'heure
    if (currentBG == maDate.getHours()){
        console.log('pas de changement de bg');
    }else {
        monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;
        currentBG = maDate.getHours();
        console.log('changement de bg');
    }
    console.log(maDate.getHours());
    console.log(monContenu);

}, 10000);

// Citation du jour
function fetchQuote() {
    var xhr = new XMLHttpRequest();
    xhr.open("get", "./citations.json", true);
    xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(e.currentTarget.response)
            let citations = JSON.parse(e.currentTarget.response);
            insertQuote(citations);
        }
    };
    xhr.send();
}

function insertQuote(monJson) {

    let myRandom = Math.floor(Math.random()*15);
    const maCitation = document.getElementById('maCitation');
    const monAuteur = document.getElementById('monAuteur');
    
    maCitation.innerText = monJson[myRandom].citation;
    monAuteur.innerText = monJson[myRandom].auteur;
}

fetchQuote();

//TaskList
monInput.addEventListener('change', () => {
    let newTask = document.createElement('li');
    let innerTask = document.createElement('label');
    let btnTask = document.createElement('input');
    let deleteBtn = document.createElement('button');

    mesToDo.appendChild(newTask); //Nouvelle Li
    newTask.appendChild(btnTask); //Ajout du label
    newTask.appendChild(innerTask); //Ajout de la checkbox
    newTask.appendChild(deleteBtn); //Ajout du bouton Supprimer

    deleteBtn.innerHTML = "X"; // Contenu bouton Supprimer
    
    //attribut de la checkbox
    btnTask.setAttribute('type', 'checkbox');
    btnTask.setAttribute('name', 'maValeur');

    //attributs du label
    innerTask.setAttribute('for', 'maValeur');
    innerTask.innerHTML = monInput.value;

    //strike checkbox
    btnTask.addEventListener('click', () => {
        if (!btnTask.checked) {
            innerTask.style.textDecoration = 'none';
        }else{
            innerTask.style.textDecoration = 'line-through';
        }
    })

    //suppression task
    deleteBtn.addEventListener('click', () => {
        mesToDo.removeChild(newTask);
    })   
})