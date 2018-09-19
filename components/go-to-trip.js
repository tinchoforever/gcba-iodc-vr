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
      
      //
      document.getElementById('lobby-inner').setAttribute('visible',false);
      document.getElementById('category-circle').setAttribute('visible',false);
      document.getElementById('category-circle').innerHTML ='';
      var detailInner = document.getElementById('trip-detail');
      
      var entityInnerEl = document.createElement('a-entity');
      
      entityInnerEl.setAttribute('id', 'matrix-inner');
      entityInnerEl.setAttribute('do-trip-once-loaded', '');
      
      detailInner.appendChild(entityInnerEl);


    });
  },

 
});
