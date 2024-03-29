let registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function(e) {
    let input = []; //liste des inputs
    input.push(document.getElementById('lastname'));
    input.push(document.getElementById('firstname'));
    input.push(document.getElementById('username'));
    input.push(document.getElementById('useremail'));
    input.push(document.getElementById('userpwd'));

    input.push(document.getElementById('birthdate'));

    let flagTest = [];
    for (let i=0;i<6;i++){
        flagTest[i] = true;
    }

    let regex = [
        /^[a-zA-Z0-9]{6,}$/, //regex username
        /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-z]+$/, //regex useremail
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, //regex userpwd
        /^(\d{2})\/(\d{2})\/(\d{4})$/ //regex birthdate
    ];
    let errRegex = [
        'Utilisez au moins 6 carcrtères: lettres (majuscules ou minuscules) ou chiffres.', //message err regex username
        'Veuillez rentrer une adresse email valide.', //message err regex useremail
        'Utilisez au moins 8 caractères dont un chiffre, une majuscule et une minuscule.', //message err regex userpwd
        'Veuillez rentrer une date au format jj/mm/aaaa (jour/mois/année).' //message err regex birthdate
    ];

    for (let i=0;i<5;i++){
        if (input[i].value.trim() == "") {
            let erreur = document.getElementById('erreur' + input[i].id);
            erreur.innerHTML = "Veuillez remplir ce champ.";
            erreur.style.color = 'red';
            e.preventDefault();
            flagTest[i] = false;
        } 
        else{
            let erreur = document.getElementById('erreur' + input[i].id);
            erreur.innerHTML = "";
        }
    }
    for (let i=2;i<6;i++){
        if (flagTest[i] == true && regex[i-2].test(input[i].value) == false && input[i].value.trim() != "") {
            console.log("i:",i);
            let erreur = document.getElementById('erreur' + input[i].id);
            erreur.innerHTML = errRegex[i-2];
            erreur.style.color = 'orange';
            e.preventDefault();
            flagTest[i] = false;
        } 
        else if (flagTest[i] == true){
            let erreur = document.getElementById('erreur' + input[i].id);
            erreur.innerHTML = "";
        }
    }
    if (flagTest[5]){
        let j = parseInt(input[5].value[0] + input[5].value[1]);
        let m = parseInt(input[5].value[3] + input[5].value[4]);
        let a = parseInt(input[5].value[6] + input[5].value[7] + input[5].value[8] + input[5].value[9]);

        var aujd = new Date();
        let aR = aujd.getFullYear();
        let mR = aujd.getMonth() + 1;
        let jR = aujd.getDate();

        if ((a < 1900) || (a > aR) || (a == aR && m > mR) || ((a == aR && m == mR) && j >= jR) ){
            let erreur = document.getElementById('erreur' + input[5].id);
            erreur.innerHTML = "Veuillez rentrer un date valide (après 1900 et avant aujourd'hui).";
            erreur.style.color = 'orange';
            e.preventDefault();
            flagTest[5] = false;
        }
        else if (flagTest[5] == true){
            let erreur = document.getElementById('erreur' + input[5].id);
            erreur.innerHTML = "";
        }
    }
});

