// Angular itself is split into separate Angular Modules so we only need to import the ones we really use.
// eg: FormsModule, RouterModule and HttpModule.
(function (app) {
	app.AppModule = ng.core.NgModule({
			imports: [ 
				ng.platformBrowser.BrowserModule,
				ng.forms.FormsModule
			],
			declarations: [ 
				app.AppComponent,
				app.UserFormComponent
			],
			bootstrap: [ app.AppComponent ] 
		})
		.Class({
			constructor: function() {}
		});
})(window.app || (window.app = {}));