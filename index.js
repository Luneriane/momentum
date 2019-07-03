
const monTitre = document.getElementById('Heure');
const monIcone = document.getElementById('icone');
const maTemperature = document.getElementById('temperature');
const monLieu = document.getElementById('lieu');
const monNom = document.getElementById('nom');
const monInput = document.getElementById('inputToDo');
const mesToDo = document.getElementById('maToDoList');
const monContenu = document.getElementById('contenu');

let monStorage = localStorage.getItem('monNom');
let maDate = new Date;
let monHeure = `${maDate.getHours()} : ${maDate.getMinutes()}`;

//Fonction temps réel
setInterval(() => {
    maDate = new Date;
    monHeure = maDate.getHours() + "<span> : </span>" + maDate.getMinutes();

    // Affichage de l'heure
    monTitre.innerHTML = monHeure;

    //Image en fonction de l'heure
    monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;
    console.log(maDate.getHours());
    console.log(monContenu);

}, 10000);


// récupération du nom
window.onload = () => { 
    monNom.value = monStorage;
    monContenu.style.backgroundImage = `url(./images/${maDate.getHours()}.jpg)`;
    monTitre.innerHTML = monHeure;
} 

// local storage
monNom.addEventListener('change', () => {
    localStorage.setItem('monNom', monNom.value);
    monStorage = localStorage.getItem('monNom');
    monNom.value = monStorage;
    console.log(monStorage);
})

//récupération de l'api météo
fetch(`https://api.apixu.com/v1/current.json?key=25aff8fbdd17436eb17103421192305&q=Paris&lang=fr`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        maTemperature.textContent = data.current.temp_c + "°C";
        monLieu.textContent = data.location.name;
        monIcone.setAttribute('src', data.current.condition.icon);
    })

//TaskList
monInput.addEventListener('change', () => {
    let newTask = document.createElement('li');
    let innerTask = document.createElement('label');
    let btnTask = document.createElement('input');
    let deleteBtn = document.createElement('button');

    mesToDo.appendChild(newTask); //Nouvelle Li
    newTask.appendChild(btnTask); //Ajout du label
    newTask.appendChild(innerTask); //Ajout de la checkbox
    newTask.appendChild(deleteBtn); //Ajout du X

    deleteBtn.innerHTML = "X";

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
