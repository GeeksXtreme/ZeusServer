module.exports = function(app){
	app.require(['IO'], run);
};

function run(IO){
	console.log('This is an example of module creation and loading');
}