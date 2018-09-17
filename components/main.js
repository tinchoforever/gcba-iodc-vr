 window.currentMove= "";
 window.moves = [];
//setglobal Nunjuncls env
var env = new nunjucks.Environment();
  	
	
//Load info from datasets.
window.metadata = {
	datasets:[],
	categories:[],
};
//Group Datasets
var categories =[];
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];

d3.csv('data/meta-data-gcba.csv', function(csv){
	window.metadata.datasets = csv;

	categories = window.metadata.categories = d3.nest()
            .key(function(d) {
              return d.categoria;
            })
            .entries(csv);

    categories.map(function(d){
    	d.percentage = Math.round(d.values.length * 100 /csv.length);
    	d.rows = 0;
    	d.values.map(function(v){
    		d.rows += parseInt(v.tamanio);
    	})
    });
    env.addGlobal('categories',categories);
  	nunjucks.categories = categories;
  	
  	//Setup Lobby
  	AFRAME.registerComponent('do-something-once-loaded', {
	  init: function () {
	  	entityEl.setAttribute('template',{
	  		src:'#circle-menu'
	  	});

	  }
	});
	var lobbyEl = document.getElementById('lobby-circle');
	var entityEl = document.createElement('a-entity');
	entityEl.setAttribute('do-something-once-loaded', '');
	entityEl.setAttribute('id', 'lobby-inner');

	lobbyEl.appendChild(entityEl);
    	
	
    
});

//Get Detail.

