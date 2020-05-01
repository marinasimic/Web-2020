$(document).ready(function() {
    var token = localStorage.getItem('jwt');
    var currentUser = null;
    $.ajax({
	type : "GET",
	url : 'rest/users/currentUser',
	contentType : 'application/json',
	headers : {
	    'Authorization' : 'Bearer ' + token
	},
	success : function(user) {
	    currentUser = user;
	    localStorage.setItem('user', JSON.stringify(currentUser));
	}
    });
});