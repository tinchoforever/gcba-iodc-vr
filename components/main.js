 window.currentMove= "";
 window.moves = [];
 //1era Generacion
 window.moves["eter"] = "/stories/01/04-Eternauta/";
 window.moves["borges"] = "/stories/01/01-Borges";
 window.moves["santelmo"] = "/stories/01/02-SanTelmo";
 window.moves["margot"] = "/stories/01/03-Margot";
//2da Generacion
 window.moves["sonrisa"] = "/stories/02/sonria";
 window.moves["terror"] = "/stories/02/terror";
 window.moves["khipu"] = "/stories/02/khipu";




var targetEl = document.querySelector('#target');
targetEl.addEventListener('click', function() {
  var href = window.moves[window.currentMove];
  if (href){
    window.location.href = href;
  }

});