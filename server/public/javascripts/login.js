/*controls toggle for the login portal*/
function login() {
	if ($(".loginbox").css("display")=="none") {
		$(".loginbox").first().css("display", "flex");
	} else {
		$(".loginbox").first().css("display", "none");
	}	
}