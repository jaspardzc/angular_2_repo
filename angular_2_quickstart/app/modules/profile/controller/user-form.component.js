(function (app) {
	app.UserFormComponent = ng.core
		.Component({
			selector: 'user-form',
			templateUrl: 'app/modules/profile/view/user-form.component.html'
		})
		.Class({
			constructor: [function() {
				this.genders = ['male', 'female', 'transgender', 'other'];
				this.degrees = ['Elementary School', 'Middle School', 'High School', 'Bachelor', 
							   'Master', 'Doctor', 'Post-Doc', 'Other'];

				this.currentUser = new app.User("Kevin", 
						"Zeng", 
						"kevinzengdev@gmail.com", 
						this.genders[0],
						this.degrees[4]);

				this.submitted = false;
			}],
			onSubmit: function() {
				this.submitted = true;
			},
			// only for debugging
			diagnostic: function() {
				return JSON.stringify(this.model);
			}
		});
})(window.app || (window.app = {}));