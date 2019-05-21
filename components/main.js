 window.currentMove= "";
 window.moves = [];
//setglobal Nunjuncls env
var env = new nunjucks.Environment();

var random = Math.random();
var socket = io("https://iodc-map.herokuapp.com");

      
   
	
//Load info from datasets.
window.metadata = {
	datasets:[],
	categories:[],
};
//Group Datasets
var categories =[];
var colores = [];
colores["0"] = "#34485E";
colores["1"] = "#99C25F";
colores["2"] = "#F563A2";
colores["3"] = "#FCDA59";
colores["4"] = "#17C3E3";
colores["5"] = "#E76056";
colores["6"] = "#F3A22C";
colores["7"] = "#2DBC98";
colores["8"] = "#0289D1";
colores["9"] = "#9D6DB6";

var cacheImg = [];
cacheImg.push("baset/547.png");
cacheImg.push("baset/6084.png");
cacheImg.push("baset/12327.png");
cacheImg.push("baset/13225.png");
cacheImg.push("baset/13294.png");
cacheImg.push("obras/58-a.png");
cacheImg.push("obras/58-d.png");
cacheImg.push("obras/96-a.png");
cacheImg.push("obras/96-d.png"); 
cacheImg.push("obras/5100-a.png");
cacheImg.push("obras/5100-d.png");
cacheImg.push("obras/25095-a.png");
cacheImg.push("obras/25095-d.png");
cacheImg.push("obras/25130-a.png");
cacheImg.push("obras/25130-d.png");
cacheImg.push("obras/25130-d.png");
cacheImg.push("espacios-verdes/01.png");
cacheImg.push("espacios-verdes/02.png");
cacheImg.push("espacios-verdes/03.png");
cacheImg.push("espacios-verdes/04.png");
cacheImg.push("espacios-verdes/05.png");
cacheImg.push("espacios-verdes/06.png");

cacheImg.map(function(m){
	var img=new Image();
	img.src='images/360-detail/' + m;
});
d3.selectAll('a-assets img')._groups[0].forEach(function(e){ 

	var img=new Image();
	img.src=d3.select(e).attr('src');
});

window.game = {
	init:function(){
		if (window.metadata.datasets.length ==0){
			window.game.loadData(window.game.renderLobby);	
		}else {
			window.game.renderLobby();
		}
	},
	loadData:function(cb){
		

		window.metadata.datasets = csv;

			categories = [];
			for (var i = 0; i < 8; i++) {
				categories.push({key:i+""})
			}
	        

		    categories.map(function(d){
		    	d.color = colores[d.key];
		    	console.log(d.color, d.key);
		    	d.rows = 0;
		    	d.title = d.key.toUpperCase();
	    		d.destacados = 0;
		    	
		    });
	   		 env.addGlobal('categories',categories);
	  		 nunjucks.categories = categories;
	  	
		
	    	cb();

	},
	renderLobby : function(){

	  	
		var lobbyEl = document.getElementById('lobby-circle');
		var entityEl = document.createElement('a-entity');
		entityEl.setAttribute('do-circle-once-loaded', '');
		entityEl.setAttribute('id', 'lobby-inner');

		lobbyEl.appendChild(entityEl);
		


	}
	reRenderLobby:function(){
		document.getElementById('category-circle').innerHTML = "";
		if (document.getElementById('trip-detail')){
			document.getElementById('trip-detail').innerHTML = "";	
		}
		if (document.getElementById('detail-circle')){
			document.getElementById('detail-circle').innerHTML = "";	
		}
		document.getElementById('detail-circle').innerHTML = "";
		document.getElementById('lobby-inner').setAttribute('visible',true);
		document.getElementById('circle-floor').setAttribute('material', 'src', '');
	},

};


window.game.init();
AFRAME.registerComponent('do-rectangle-once-loaded', {
		  init: function () {
		  	this.el.setAttribute('template',{
		  		src:'#rectangle-menu'
		  	});

  			setTimeout(function(){
  				d3.selectAll('a-entity.item').dispatch('category-start');
  			},1000);

  		
		  	
		  }
		});
//Get Detail.
//Setup Lobby
	  	AFRAME.registerComponent('do-circle-once-loaded', {
		  init: function () {

		  	this.el.setAttribute('template',{
		  		src:'#circle-menu'
		  	});
		  	document.getElementById('circle-floor').setAttribute('material', 'src', '');
		  	socket.emit('user move', {
				userId: random,
				idCity : 0,  //id de la ciudad si esta en nivel ciudad
				 // nivel 1> lobby central - 
				 // nivel 2> lobby categoria - 
				 // nivel 3> dataset
	            level : 1,
	            pcia: 0
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