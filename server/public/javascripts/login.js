window.onload = checkForSession;

function checkForSession() {
	console.log("Checking for existing sessions");
	var getReq = new XMLHttpRequest();

	getReq.open("GET", '/checkForSession', true);
	getReq.send();
}

/*controls toggle for the login portal*/
function login() {
	if ($(".loginbox").css("display")=="none") {
		$(".loginbox").first().css("display", "flex");
	} else {
		$(".loginbox").first().css("display", "none");
	}	
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var id_token = googleUser.getAuthResponse().id_token;
   console.log("ID Token: " + id_token);

   GoogleSignIn({idtoken: id_token});
}

function GoogleSignIn(param) {
	console.log("GoogleSignIn called");
	var postReq = new XMLHttpRequest();

	console.log(JSON.stringify(param));

	postReq.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {
			res = JSON.parse(postReq.responseText);
			console.log("receiving response from verify");
			console.log(res);
			GSIRedirect(res);
		}
	}; 

	postReq.open("POST", '/loginWithGoogle', true);
	postReq.setRequestHeader("Content-type", "application/json");
	postReq.send(JSON.stringify(param));
}

function GSIRedirect(username) {
	console.log("redirecting via /GSIlogin");
	var getReq = new XMLHttpRequest();
	getReq.open("GET", '/GSIlogin?username='+username, true);
	console.log("Username in GSIR: "+username);
	getReq.send();
	//postReq.send(JSON.stringify(username));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }