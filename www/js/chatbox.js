
    
$(document).ready(function(){
    // Fonction pour récupérer les messages
    function getMessages(){
        $.ajax({
            url: "./htbin/chatget.py",
            type: "GET",
            dataType: "json",
            success: function(data){
                $("#chat-feed").empty();
                // Mettre à jour la zone de discussion avec les messages reçus
                data.forEach(function(message){
                    $("#chat-feed").append("<div class='message'><header><span class='nom-user'>" + message.user + "</span><time class='date-message'>" + message.date + " @" + message.time +"</time></header><div class='contenu-message'>" + message.msg + "</div>");
                });
            },
            error: function(){
                console.error("Erreur lors de la récupération des messages.");
            }
        });
    }

    // Appeler la fonction getMessages pour afficher les messages au chargement de la page
    getMessages();

    // Écouter l'événement de soumission du formulaire pour envoyer un message
    $("#message-form").submit(function(event){
        event.preventDefault(); // Empêcher le formulaire de se soumettre normalement

        // Récupérer le message depuis le champ de saisie
        var message = $("#message-input").val();

        // Envoyer le message via AJAX
        $.ajax({
            url: "./htbin/chatsend.py",
            type: "POST",
            dataType: "json",
            data: {msg: message},
            success: function(data){
                if(data.num === 0){
                    // Si tout s'est bien passé, récupérer et afficher à nouveau les messages
                    getMessages();
                } else {
                    // Sinon, afficher un message d'erreur
                    $("#chat-feed").append("<p class='err'>Erreur lors de l'envoi du message.</p>");
                }
            },
            error: function(){
                console.error("Erreur lors de l'envoi du message.");
            }
        });

        // Effacer le champ de saisie après l'envoi du message
        $("#message-input").val("");
    });
});
