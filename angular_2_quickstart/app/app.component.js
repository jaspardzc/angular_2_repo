(function (app) {
	app.AppComponent = 
		ng.core
		// configuration object with properties of this component
		.Component({
			// CSS selector for a HTML element named 'my-app'
			selector: 'my-app',
			template: '<h1>Angular 2 Web App Quickstart</h1>'
		})
		// implementation of this component, methods will be binded to the view
		.Class({
			constructor: function() {}
		});
})(window.app || (window.app = {}));