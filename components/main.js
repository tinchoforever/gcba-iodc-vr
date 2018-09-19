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

		var total = 0; 

		csv.map(function(d){
			d.titulo = toTitleCase(d.titulo);
			d.tamanio = parseInt(d.tamanio);
			if (isNaN(d.tamanio)){
				d.tamanio = 0;
			}

			total += d.tamanio;
		});
		var max = d3.max(csv,function(d){ return d.tamanio});
		var min = d3.min(csv,function(d){ return d.tamanio});
		var chartScale = d3.scaleLinear().domain([min,max]).range([1,100]);

		csv.map(function(d){
			d.barLength = chartScale(d.tamanio);
			d.barPosition = d.barLength/2 + 0.66;
		})


		window.metadata.datasets = csv;

			categories = window.metadata.categories = d3.nest()
	            .key(function(d) {
	              return d.categoria;
	            })
	            .entries(csv);
	        

		    categories.map(function(d){
		    	
		    	d.rows = 0;
		    	d.title = toTitleCase(d.key);
		    	d.values.map(function(v){
		    		d.rows += parseInt(v.tamanio);
		    	});
		    	d.percentage = Math.round(d.rows * 100 /total,2);
		    	d.rowsLabel = Math.round(d.rows/100000) + " millones"
		    });
	   		 env.addGlobal('categories',categories);
	  		 nunjucks.categories = categories;
	  	
		
	    	cb();
		});
	},
	renderLobby : function(){

	  	
		var lobbyEl = document.getElementById('lobby-circle');
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('do-circle-once-loaded', '');
		entityEl.setAttribute('id', 'lobby-inner');

		lobbyEl.appendChild(entityEl);
	    	
	},
	renderDetail:function(datasetKey,element){

		var currentDetail = window.metadata.datasets.filter(function(c){
			return c.id == datasetKey;
		})[0];

		env.addGlobal('currentDetail',currentDetail);
	  	nunjucks.currentDetail = currentDetail;

	  	var detailEl = document.querySelector('a-entity.item.active .detail');
	  	detailEl.innerHTML = '';
		var detailInnerEl = document.createElement('a-entity');
		
		detailInnerEl.setAttribute('id', 'detail-inner');
		detailInnerEl.setAttribute('do-popup-once-loaded', '');
		
		detailEl.append(detailInnerEl);
		//Setup Lobby
	  	

	},
	reRenderLobby:function(){
		document.getElementById('category-circle').innerHTML = "";
		document.getElementById('lobby-inner').setAttribute('visible',true);

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
	  	
	}


};


window.game.init();
AFRAME.registerComponent('do-rectangle-once-loaded', {
		  init: function () {
		  	this.el.setAttribute('template',{
		  		src:'#rectangle-menu'
		  	});

		  }
		});
AFRAME.registerComponent('do-popup-once-loaded', {
		  init: function () {
		  	this.el.setAttribute('template',{
		  		src:'#dataset-detail-menu'
		  	});

		  }
		});
//Get Detail.
//Setup Lobby
	  	AFRAME.registerComponent('do-circle-once-loaded', {
		  init: function () {
		  	this.el.setAttribute('template',{
		  		src:'#circle-menu'
		  	});

		  }
		});
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}