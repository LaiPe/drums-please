let loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let data = new FormData(loginForm);
    console.log(data);
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        const message = document.getElementById("message");
        console.log(xhr);

        if (xhr.readyState == 4 && xhr.status == 200){
            message.innerHTML = xhr.responseText;
            const indicationChatroom = document.getElementById("lien-chatroom");
            indicationChatroom.style.display = 'block';
        }
        else if (xhr.readyState == 4){
            message.innerHTML = "Une erreur est survenue, veuillez réessayer ultérieurement.";
        }
    });
    
    xhr.open("POST", "../htbin/login.py", true);
    xhr.send(data);

    return false;
});
