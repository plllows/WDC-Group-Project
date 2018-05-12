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

	postReq.onreadystatechange = function() {
		if (this.readyState==4 && this.status==200) {
			console.log("post submit success");

			var post = document.createTextNode(JSON.stringify(newPost));
			document.getElementById("container").appendChild(post);
			//addPost(newTitle,newText);
		}
	};

	postReq.open("POST", '/loginWithGoogle', true);
	postReq.setRequestHeader("Content-type", "application/json");
	postReq.send(JSON.stringify(param));
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }