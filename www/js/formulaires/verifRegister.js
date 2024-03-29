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

function verifChampVide(inputs, flagTest){

    // i compris entre 0 et 4 (exclus birthdate car facultatif)

    for (let i=0;i<5;i++){
        if (inputs[i].value.trim() == "") {
            let erreur = document.getElementById('erreur' + inputs[i].id);
            erreur.innerHTML = "Veuillez remplir ce champ.";
            erreur.style.color = 'red';
            //
            flagTest[i] = false;
        } 
        else{
            let erreur = document.getElementById('erreur' + inputs[i].id);
            erreur.innerHTML = "";
        }
    }

    return flagTest;
}

function verifChampFormatValide(inputs, flagTest, regex, errRegex){

    // i compris entre 2 et 5 (exclus lastname et firstname car pas de contraites de format dessus)

    for (let i=2;i<6;i++){
        if (flagTest[i] == true && regex[i-2].test(inputs[i].value) == false && inputs[i].value.trim() != "") {
            console.log("i:",i);
            let erreur = document.getElementById('erreur' + inputs[i].id);
            erreur.innerHTML = errRegex[i-2];
            erreur.style.color = 'orange';
            //
            flagTest[i] = false;
        } 
        else if (flagTest[i] == true){
            let erreur = document.getElementById('erreur' + inputs[i].id);
            erreur.innerHTML = "";
        }
    }  
    return flagTest;
}

function verifDateValide(inputs, flagTest){
    if (inputs[5].value.trim() != "" && flagTest[5]){ //Si le champ birthdate n'est pas vide et a un format valide (jj/mm/aaaa) 

        const j = parseInt(inputs[5].value[0] + inputs[5].value[1]);
        const m = parseInt(inputs[5].value[3] + inputs[5].value[4]);
        const a = parseInt(inputs[5].value[6] + inputs[5].value[7] + inputs[5].value[8] + inputs[5].value[9]);

        var birthdate = new Date(a,m-1,j)

        var aV = birthdate.getFullYear();
        var mV = birthdate.getMonth() + 1;
        var jV = birthdate.getDate();

        var aujd = new Date();

        if (j != jV || m != mV || a != aV){
            let erreur = document.getElementById('erreur' + inputs[5].id);
            erreur.innerHTML = "Veuillez rentrer une date valide.";
            erreur.style.color = 'orange';
            //
            flagTest[5] = false;
        }
        else if (birthdate >= aujd){
            let erreur = document.getElementById('erreur' + inputs[5].id);
            erreur.innerHTML = "Veuillez rentrer une date valide. (avant aujourd'hui)";
            erreur.style.color = 'orange';
            //
            flagTest[5] = false;
        }
        else {
            let erreur = document.getElementById('erreur' + inputs[5].id);
            erreur.innerHTML = "";
        }
    }
    return flagTest;
}

registerForm.addEventListener('submit', function(e) {
    

    let flagTest = [];
    for (let i=0;i<6;i++){
        flagTest[i] = true;
    }

    flagTest = verifChampVide(inputs, flagTest);

    flagTest = verifChampFormatValide(inputs, flagTest, regex, errRegex);
     
    flagTest = verifDateValide(inputs,flagTest)


    for (let i=0;i<6;i++){
        if (flagTest[i] == false){
            e.preventDefault();
        }
    }

});

