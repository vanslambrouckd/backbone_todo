var app = app || {};

$(function() {
	new app.AppView();
	var templ = _.template($('#item-template').html());
	console.log(templ());
});