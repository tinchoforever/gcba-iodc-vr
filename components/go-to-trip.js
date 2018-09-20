/* global AFRAME */

/**
 * Component that listens to an event, fades out an entity, swaps the texture, and fades it
 * back in.
 */


AFRAME.registerComponent('go-to-trip', {
  schema: {
    on: {type: 'string'},
    item: {type: 'string'},
  },

  init: function () {
    var data = this.data;
    var el = this.el;

    el.addEventListener(data.on, function () {
      
     window.game.renderTrip(data.item);
     document.getElementById('image-360').setAttribute('material', 'src','');
     document.getElementById('image-360').setAttribute('material', 'color','black');
      

    });
  },

 
});
