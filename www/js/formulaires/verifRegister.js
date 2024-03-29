function initFlagTest(){
    let flagTest = [];
    for (let i=0 ; i<3 ; i++){
        flagTest[i] = []
        for (let j=0 ; j<6 ; j++){
            flagTest[i][j] = true;
        }
    }
    return flagTest;
}

function verifFlagTest(flagTest){
    let result = true;
    for (let i=0 ; i<3 ; i++){
        flagTest[i] = []
        for (let j=0 ; j<6 ; j++){
            result = result && flagTest[i][j];
        }
    }
    return result;
}

function verifStageFlagTest(flagTest){
    let result = true;
    for (let j=0 ; j<6 ; j++){
        result = result && flagTest[j];
    }
    return result;
}






function verifChampVide(input){

    if (input.value.trim() == "") {
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "Veuillez remplir ce champ.";
        erreur.style.color = 'red';
        return false;
    } 
    else{
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "";
        return true;
    }
}

function verifChampFormatValide(input, regex, errRegex){

    if (regex.test(input.value) == false) { 
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = errRegex;
        erreur.style.color = 'orange';
        return false;
    } 
    else {
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "";
        return true;
    }
}

function verifDateValide(input){

    const j = parseInt(input.value[0] + input.value[1]);
    const m = parseInt(input.value[3] + input.value[4]);
    const a = parseInt(input.value[6] + input.value[7] + input.value[8] + input.value[9]);

    var birthdate = new Date(a,m-1,j)

    var aV = birthdate.getFullYear();
    var mV = birthdate.getMonth() + 1;
    var jV = birthdate.getDate();

    var aujd = new Date();

    if (j != jV || m != mV || a != aV){
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "Veuillez rentrer une date valide.";
        erreur.style.color = 'orange';
        return false;
    }
    else if (birthdate >= aujd){
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "Veuillez rentrer une date valide. (avant aujourd'hui)";
        erreur.style.color = 'orange';
        return false;
    }
    else {
        let erreur = document.getElementById('erreur' + input.id);
        erreur.innerHTML = "";
        return true;
    }
}

const registerForm = document.getElementById('registerForm');

const inputs = []; //liste des inputs
inputs.push(document.getElementById('lastname'));
inputs.push(document.getElementById('firstname'));
inputs.push(document.getElementById('username'));
inputs.push(document.getElementById('useremail'));
inputs.push(document.getElementById('userpwd'));

inputs.push(document.getElementById('birthdate'));



const regex = [
    /^[a-zA-Z0-9]{6,}$/, //regex username
    /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-z]+$/, //regex useremail
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_\-;:!?./*&$]).{12,}$/, //regex userpwd
    /^(\d{2})\/(\d{2})\/(\d{4})$/ //regex birthdate
];

const errRegex = [
    'Utilisez au moins 6 carcrtères: lettres (majuscules ou minuscules) ou chiffres.', //message err regex username
    'Veuillez rentrer une adresse email valide.', //message err regex useremail
    'Utilisez au moins 12 caractères dont un chiffre, une majuscule, une minuscule et un caractère spécial (_-;:!?./*&$).', //message err regex userpwd
    'Veuillez rentrer une date au format jj/mm/aaaa (jour/mois/année).' //message err regex birthdate
];

var flagTest = initFlagTest();

for (let i=0 ; i<6 ; i++){
    inputs[i].addEventListener('change', () => {

        if(i < 5){ // tous sauf birthdate
            flagTest[0][i] = verifChampVide(inputs[i]);
        }

        if(i > 1 && verifStageFlagTest(flagTest[0])){ // tous sauf lastname et firstname et si il a passé la première verif.
            flagTest[1][i] = verifChampFormatValide(inputs[i], regex[i-2], errRegex[i-2]);
        }

        if(i == 5 && verifStageFlagTest(flagTest[1])){ //birthdate si il a passé la deuxième verif. (inutile de checker la première verif car il en est exclus)
            flagTest[2][i] = verifDateValide(inputs[i]);
        }

    });
}


registerForm.addEventListener('submit', function(e){
    for (let i=0 ; i<6 ; i++){

        if(i < 5){ // tous sauf birthdate
            flagTest[0][i] = verifChampVide(inputs[i]);
        }

        if(i > 1 && verifStageFlagTest(flagTest[0])){ // tous sauf lastname et firstname et si il a passé la première verif.
            flagTest[1][i] = verifChampFormatValide(inputs[i], regex[i-2], errRegex[i-2]);
        }

        if(i == 5 && verifStageFlagTest(flagTest[1])){ //birthdate si il a passé la deuxième verif. (inutile de checker la première verif car il en est exclus)
            flagTest[2][i] = verifDateValide(inputs[i]);
        }
    }

    if (!(verifFlagTest(flagTest))){
        e.preventDefault();
    }   
});