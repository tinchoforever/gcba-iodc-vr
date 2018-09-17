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


window.game = {
	init:function(){
		if (window.metadata.datasets.length ==0){
			window.game.loadData(window.game.renderLobby);	
		}else {
			window.game.renderLobby();
		}
	},
	loadData:function(cb){
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
	  	
		
	    	cb();
		});
	},
	renderLobby : function(){

	  	//Setup Lobby
	  	AFRAME.registerComponent('do-circle-once-loaded', {
		  init: function () {
		  	entityEl.setAttribute('template',{
		  		src:'#circle-menu'
		  	});

		  }
		});
		var lobbyEl = document.getElementById('lobby-circle');
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('do-circle-once-loaded', '');
		entityEl.setAttribute('id', 'lobby-inner');

		lobbyEl.appendChild(entityEl);
	    	
	},
	renderCategory: function(categoryKey){
		
		var currentCategory = categories.filter(function(c){
			return c.key == categoryKey;
		})[0];

		currentCategory.firstGroup = currentCategory.values;
		if (currentCategory.values.length > 24){
			var l = currentCategory.values.length ;
			var middle = Math.round(l/2);
			currentCategory.firstGroup = currentCategory.values.slice(0,middle)
			currentCategory.secondGroup = currentCategory.values.slice(middle +1,l-1);
		}


		env.addGlobal('currentCategory',currentCategory);
	  	nunjucks.currentCategory = currentCategory;


		document.getElementById('lobby-inner').setAttribute('visible',false);
		var categoryEl = document.getElementById('category-circle');
		var entityInnerEl = document.createElement('a-entity');
		
		entityInnerEl.setAttribute('id', 'category-inner');
		entityInnerEl.setAttribute('do-rectangle-once-loaded', '');
		
		categoryEl.appendChild(entityInnerEl);
		//Setup Lobby
	  	AFRAME.registerComponent('do-rectangle-once-loaded', {
		  init: function () {
		  	entityInnerEl.setAttribute('template',{
		  		src:'#rectangle-menu'
		  	});

		  }
		});
	}


};


window.game.init();

//Get Detail.

