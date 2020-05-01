$(document).ready(function(){
    $('#loginform').submit(function(event){
        event.preventDefault();

        var username=$('#username').val();
        var password=$('#password').val();

        if(username === ""){
            alert("You have to enter your username!")
            return
        }
        if(password === ""){
            alert("You have to enter your password!")
            return
        }

        $.post({
            url: 'rest/users/login',
            data: JSON.stringify({username, password}),
            contentType: 'application/json',
            success: function(data) {
                localStorage.setItem('jwt', JSON.stringify(data.accessToken))
                window.location='guestMainPage.html'
            },
            error: function() {
                alert("Login failed.")
            }
        });

    });
});