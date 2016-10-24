(function (app) {
	app.User = User;

	function User(firstname, lastname, email, gender, degree) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.gender = gender;
		this.degree = degree;
	}
})(window.app || (window.app = {}));