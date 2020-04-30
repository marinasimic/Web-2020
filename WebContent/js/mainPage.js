$(document).ready(function(){
    var token = localStorage.getItem('jwt');
    var currentUser = null;
    $.ajax
    ({
        type: "GET",
        url: 'rest/users/currentUser',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function (user){
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            console.log("LOCAL STORAGE: " + localStorage.getItem('currentUser'));

            var welcomeMessage = document.createTextNode("Welcome " + currentUser.firstName + " " + currentUser.lastName + "!");
            var span = document.createElement('span');
            span.style.fontSize = "20px";
            span.appendChild(welcomeMessage);
            document.getElementById("title").appendChild(span);
         }
    });
});